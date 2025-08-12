'use client';

import { format } from 'date-fns';
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  Edit,
  MessageSquare,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Topics } from '@/lib/schemas/topics-schema';

interface TopicsDetailsViewProps {
  topic: Topics;
}

export function TopicsDetailsView({ topic }: TopicsDetailsViewProps) {
  // Get status badge variant
  const getStatusVariant = (active: string) => {
    return active === 'Y' ? 'default' : 'secondary';
  };

  // Get status icon
  const getStatusIcon = (active: string) => {
    return active === 'Y' ? CheckCircle : XCircle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild size="sm" variant="ghost">
            <Link href="/topics">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold text-2xl tracking-tight">
              {topic.TOPIC_NAME}
            </h1>
            <p className="text-muted-foreground text-sm">
              Topic details and information
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/topics/${topic.TOPIC_ID}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Topic
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Information */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Topic Information</span>
              </CardTitle>
              <CardDescription>
                Basic information about this topic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="font-medium text-muted-foreground text-sm">
                    Topic Name
                  </span>
                  <p className="mt-1 font-medium text-sm">{topic.TOPIC_NAME}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground text-sm">
                    Stream
                  </span>
                  <p className="mt-1 text-sm">{topic.STREAM}</p>
                </div>
              </div>

              <Separator />

              <div>
                <span className="font-medium text-muted-foreground text-sm">
                  Description
                </span>
                <p className="mt-1 text-sm">{topic.DESCRIPTION}</p>
              </div>
            </CardContent>
          </Card>

          {/* Questions Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Questions</span>
              </CardTitle>
              <CardDescription>
                Information about questions in this topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary">
                    {topic.QUERIES_COUNT}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Total Questions
                  </p>
                </div>
                <Separator className="h-12" orientation="vertical" />
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">
                    This topic contains{' '}
                    <span className="font-medium text-foreground">
                      {topic.QUERIES_COUNT}
                    </span>{' '}
                    questions that can be used for assessments and practice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                {(() => {
                  const StatusIcon = getStatusIcon(topic.ACTIVE);
                  return (
                    <>
                      <StatusIcon className="h-4 w-4" />
                      <Badge variant={getStatusVariant(topic.ACTIVE)}>
                        {topic.ACTIVE === 'Y' ? 'Active' : 'Inactive'}
                      </Badge>
                    </>
                  );
                })()}
              </div>
              <p className="text-muted-foreground text-sm">
                {topic.ACTIVE === 'Y'
                  ? 'This topic is currently active and available for use.'
                  : 'This topic is inactive and not available for use.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-medium text-muted-foreground text-sm">
                  Created Date
                </span>
                <p className="mt-1 text-sm">
                  {format(new Date(topic.CREATION_DATE), 'PPP')}
                </p>
                <p className="mt-1 text-muted-foreground text-xs">
                  {format(new Date(topic.CREATION_DATE), 'p')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full" size="sm" variant="outline">
                <Link href={`/topics/${topic.TOPIC_ID}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Topic
                </Link>
              </Button>
              <Button asChild className="w-full" size="sm" variant="outline">
                <Link href="/topics">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to List
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
