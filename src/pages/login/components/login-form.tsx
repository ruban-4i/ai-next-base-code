'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type LoginFormData, loginSchema } from '@/lib/schemas/login-schema';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(() => {
      try {
        // TODO: Implement actual login logic
        toast.success('Login successful!');
      } catch {
        toast.error('Login failed. Please try again.');
      }
    });
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Logo and Header */}
      <div className="space-y-8">
        <div className="h-[110px] w-[269px]">
          <div
            aria-label="WIMS Logo"
            className="h-full w-full bg-center bg-contain bg-no-repeat"
            role="img"
            style={{
              backgroundImage:
                'url(http://localhost:3845/assets/19f3c6a8c4856a3099d311c54b5f3a2ab38e1f76.png)',
            }}
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-normal text-3xl text-[#161513] tracking-[-0.3px]">
            WIMS App
          </h1>
          <p className="text-[#7a7a7a] text-lg">
            Receiving Cargo into Warehouse
          </p>
        </div>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="h-12 border-[#d1d1d1] text-base placeholder:text-[#161513]"
                        disabled={isPending}
                        placeholder="Username"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="h-12 border-[#d1d1d1] pr-12 text-base placeholder:text-[#161513]"
                        disabled={isPending}
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                      />
                      <Button
                        className="absolute top-0 right-0 h-12 w-12 text-[#d1d1d1] hover:text-[#161513]"
                        disabled={isPending}
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {showPassword ? (
                          <EyeOff className="h-6 w-6" />
                        ) : (
                          <Eye className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Login Button */}
          <Button
            className="h-12 w-full bg-[#505f6d] font-normal text-lg text-white hover:bg-[#505f6d]/90"
            disabled={isPending}
            type="submit"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
