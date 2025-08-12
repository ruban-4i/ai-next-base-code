'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  User, 
  Shield, 
  Building2, 
  GraduationCap,
  Calendar,
  CheckCircle,
  XCircle,
  Key
} from 'lucide-react'
import type { UserResponse } from '@/lib/schemas/user-schema'

interface UserDetailsViewProps {
  userData: UserResponse
  userId: string
}

export function UserDetailsView({ userData, userId }: UserDetailsViewProps) {
  const user = userData

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get status badge variant
  const getStatusVariant = (active: string) => {
    return active === 'Y' ? 'default' : 'secondary'
  }

  // Get role badge variant
  const getRoleVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'destructive'
      case 'hr':
        return 'default'
      case 'candidate':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
            <p className="text-muted-foreground">
              View and manage user information
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/users/${userId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* User Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {getUserInitials(user.NAME)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{user.NAME}</CardTitle>
            <CardDescription className="text-base">
              {user.USER_NAME}
            </CardDescription>
            <div className="flex justify-center space-x-2 mt-4">
              <Badge variant={getRoleVariant(user.LOOKUP_VALUES)}>
                {user.LOOKUP_VALUES}
              </Badge>
              <Badge variant={getStatusVariant(user.ACTIVE)}>
                {user.ACTIVE === 'Y' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* User Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Detailed information about the user
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Basic Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Full Name</div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{user.NAME}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Email Address</div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.USER_NAME}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">User ID</div>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{user.USER_ID}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Account Status</div>
                  <div className="flex items-center space-x-2">
                    {user.ACTIVE === 'Y' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span>{user.ACTIVE === 'Y' ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Role and Permissions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Role & Permissions
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">User Role</div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={getRoleVariant(user.LOOKUP_VALUES)}>
                      {user.LOOKUP_VALUES}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Role ID</div>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{user.USER_ROLE}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department and Batch Information */}
            {(user.DEPARTMENT || user.BATCH_NAME) && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    Organization Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {user.DEPARTMENT && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Department</div>
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>{user.DEPARTMENT}</span>
                        </div>
                      </div>
                    )}
                    {user.BATCH_NAME && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Batch</div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>{user.BATCH_NAME}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
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
              <div className="text-sm font-medium text-muted-foreground">User ID</div>
              <div className="font-mono text-sm bg-muted p-2 rounded">
                {user.USER_ID}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Role ID</div>
              <div className="font-mono text-sm bg-muted p-2 rounded">
                {user.USER_ROLE}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Password Status</div>
              <div className="flex items-center space-x-2 p-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Encrypted</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" asChild>
          <Link href="/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users List
          </Link>
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/users/${userId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
