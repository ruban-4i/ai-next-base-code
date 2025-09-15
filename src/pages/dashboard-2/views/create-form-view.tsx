'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Clock } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  type CreateFormData,
  createFormSchema,
} from '@/lib/schemas/create-form-schema';
import { createFormSubmission } from '@/server/actions/form-actions';
import { ServicesHeader } from '../components/services-header';
import { serviceCategories } from '../data/services-data';

export function CreateFormView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      date: '',
      startTime: '',
      endTime: '',
      services: '',
      serviceTitle: '',
      taskDescription: '',
    },
  });

  const onSubmit = (data: CreateFormData) => {
    startTransition(async () => {
      try {
        const result = await createFormSubmission(data);

        if (result.success) {
          toast.success(result.message);
          form.reset();
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.error('An unexpected error occurred. Please try again.');
        // Log error for development
      }
    });
  };

  return (
    <>
      {/* Header */}
      <ServicesHeader
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Content Container */}
      <div className="flex-1 overflow-auto bg-[#f5f7fa] px-6 py-6">
        <div className="flex flex-col gap-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-[#3f3f3f] text-[24px] leading-[24px]">
                Create Form
              </h1>
              <p className="font-normal text-[#696969] text-[14px] leading-[24px]">
                Browse and access al available company services and request
                workflow
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="w-full">
            <Form {...form}>
              <form
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[#212121] text-[16px] leading-[20.8px]">
                        Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 rounded-lg border border-[#dadada] bg-white px-3 py-2.5 pr-12 text-[16px]"
                          placeholder="Select date"
                          type="date"
                        />
                        {/* <div className="relative">
                          <CalendarIcon className="-translate-y-1/2 absolute top-1/2 right-3 h-6 w-6 text-[#8a8a8a]" />
                        </div> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time Fields Row */}
                <div className="flex gap-6">
                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-medium text-[#212121] text-[16px] leading-[20.8px]">
                          Start Time <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              className="h-12 rounded-lg border border-[#dadada] bg-white px-3 py-2.5 pr-12 text-[16px]"
                              placeholder="Select start time"
                              type="time"
                            />
                            <Clock className="-translate-y-1/2 absolute top-1/2 right-3 h-6 w-6 text-[#8a8a8a]" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Time */}
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-medium text-[#212121] text-[16px] leading-[20.8px]">
                          End Time <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              className="h-12 rounded-lg border border-[#dadada] bg-white px-3 py-2.5 pr-12 text-[16px]"
                              placeholder="Select end time"
                              type="time"
                            />
                            <Clock className="-translate-y-1/2 absolute top-1/2 right-3 h-6 w-6 text-[#8a8a8a]" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Services Dropdown */}
                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[#212121] text-[16px] leading-[20.8px]">
                        Services <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-lg border border-[#dadada] bg-white px-3 py-2.5 text-[16px]">
                            <SelectValue placeholder="Select a service" />
                            <ChevronDown className="h-6 w-6 text-[#8a8a8a]" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Title */}
                <FormField
                  control={form.control}
                  name="serviceTitle"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[#212121] text-[16px] leading-[20.8px]">
                        Service Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 rounded-lg border border-[#dadada] bg-white px-3 py-2.5 text-[16px]"
                          placeholder="Enter service title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Task Description */}
                <FormField
                  control={form.control}
                  name="taskDescription"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[#212121] text-[16px] leading-[20.8px]">
                        Task Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="h-[136px] resize-none rounded-lg border border-[#dadada] bg-white px-3 py-2.5 text-[16px]"
                          placeholder="Hrms Application"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex w-full">
                  <Button
                    className="h-12 w-full rounded-[12px] bg-[#009693] px-4 py-3 font-medium text-[16px] text-white leading-[20.8px] hover:bg-[#008380] disabled:opacity-50"
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
