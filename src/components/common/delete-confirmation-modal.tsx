'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from '@/components/ui/responsive-modal';

interface DeleteConfirmationModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isLoading?: boolean;
  title?: string;
}

export function DeleteConfirmationModal({
  message,
  isOpen,
  onClose,
  onDelete,
  isLoading = false,
  title = 'Confirm Deletion',
}: DeleteConfirmationModalProps) {
  return (
    <ResponsiveModal onOpenChange={onClose} open={isOpen}>
      <ResponsiveModalContent className="sm:max-w-md">
        <ResponsiveModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <ResponsiveModalTitle className="text-left">
                {title}
              </ResponsiveModalTitle>
              <ResponsiveModalDescription className="text-left">
                This action cannot be undone.
              </ResponsiveModalDescription>
            </div>
          </div>
        </ResponsiveModalHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">{message}</p>

          <div className="flex justify-end gap-3">
            <Button disabled={isLoading} onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onDelete}
              variant="destructive"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
