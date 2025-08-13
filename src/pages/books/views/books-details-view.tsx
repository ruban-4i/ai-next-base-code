'use client';

import { format } from 'date-fns';
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  DollarSign,
  Edit,
  Hash,
  Package,
  User,
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
import type { Book } from '@/lib/schemas/books-schema';
import { paths } from '@/route/paths';

interface BookDetailsViewProps {
  bookData: Book;
  bookId: string;
}

export function BookDetailsView({ bookData, bookId }: BookDetailsViewProps) {
  const book = bookData;

  // Get status badge variant
  const getStatusVariant = (active: string) => {
    return active === 'Y' ? 'default' : 'secondary';
  };

  // Get category badge variant
  const getCategoryVariant = (category: string) => {
    const categoryColors: Record<string, string> = {
      Programming: 'default',
      'Computer Science': 'secondary',
      'Artificial Intelligence': 'destructive',
      'Frontend Development': 'outline',
      'Database Management': 'default',
      'Cloud Technology': 'secondary',
    };
    return categoryColors[category] || 'outline';
  };

  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Format creation date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch {
      return dateString;
    }
  };

  // Get stock status
  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { text: 'Out of Stock', variant: 'destructive' as const };
    if (quantity < 10)
      return { text: 'Low Stock', variant: 'secondary' as const };
    return { text: 'In Stock', variant: 'default' as const };
  };

  const stockStatus = getStockStatus(book.STOCK_QUANTITY);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild size="sm" variant="ghost">
            <Link href={paths.books.root}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Book Details</h1>
            <p className="text-muted-foreground">
              View and manage book information
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={paths.books.edit(bookId)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Book
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Book Overview Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-xl">{book.BOOK_TITLE}</CardTitle>
            <CardDescription className="text-base">
              by {book.AUTHOR}
            </CardDescription>
            <div className="mt-4 flex justify-center space-x-2">
              <Badge variant={getCategoryVariant(book.CATEGORY) as any}>
                {book.CATEGORY}
              </Badge>
              <Badge variant={getStatusVariant(book.ACTIVE)}>
                {book.ACTIVE === 'Y' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Book Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Book Information</CardTitle>
            <CardDescription>
              Detailed information about the book
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="mb-4 flex items-center font-semibold text-lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Basic Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Title
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{book.BOOK_TITLE}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Author
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{book.AUTHOR}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Category
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={getCategoryVariant(book.CATEGORY) as any}>
                      {book.CATEGORY}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Status
                  </div>
                  <div className="flex items-center space-x-2">
                    {book.ACTIVE === 'Y' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span>{book.ACTIVE === 'Y' ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Publication Details */}
            <div>
              <h3 className="mb-4 flex items-center font-semibold text-lg">
                <Hash className="mr-2 h-5 w-5" />
                Publication Details
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    ISBN
                  </div>
                  <div className="rounded bg-muted p-2 font-mono text-sm">
                    {book.ISBN}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Pages Count
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{book.PAGES_COUNT.toLocaleString()} pages</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Publication Date
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(book.CREATION_DATE)}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Pricing and Inventory */}
            <div>
              <h3 className="mb-4 flex items-center font-semibold text-lg">
                <DollarSign className="mr-2 h-5 w-5" />
                Pricing & Inventory
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Price
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-lg">
                      {formatPrice(book.PRICE)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Stock Quantity
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>{book.STOCK_QUANTITY}</span>
                    <Badge variant={stockStatus.variant}>
                      {stockStatus.text}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground text-sm">
                    Total Value
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">
                      {formatPrice(book.PRICE * book.STOCK_QUANTITY)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description Card */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {book.DESCRIPTION}
          </p>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Technical details and system-related information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="font-medium text-muted-foreground text-sm">
                Book ID
              </div>
              <div className="rounded bg-muted p-2 font-mono text-sm">
                {book.BOOK_ID}
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-muted-foreground text-sm">
                Creation Date
              </div>
              <div className="rounded bg-muted p-2 font-mono text-sm">
                {book.CREATION_DATE}
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-muted-foreground text-sm">
                Last Updated
              </div>
              <div className="rounded bg-muted p-2 font-mono text-sm">
                {formatDate(book.CREATION_DATE)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button asChild variant="outline">
          <Link href={paths.books.root}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books List
          </Link>
        </Button>
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link href={paths.books.edit(bookId)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Book
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
