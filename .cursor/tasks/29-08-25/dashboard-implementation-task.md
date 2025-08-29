# Dashboard Implementation Task

**Date**: 29-08-25  
**Status**: Pending Approval

## Requirements Summary

Based on the Figma design (node-id: 91:8765), I need to create a comprehensive employee dashboard with the following components:

### Layout Structure

- **Sidebar Navigation**: Dark theme (#1c252e) with logo, menu items (Dashboard, My Info, Attendance, Payslip, Expense management)
- **Header**: Light theme with country selector, search bar, notifications, and user avatar
- **Main Content**: Employee profile details with tabbed navigation (Details/Compensation)
- **Toggle Button**: Sidebar collapse/expand functionality

### Key Components to Implement

#### 1. Sidebar Navigation

- Logo component with green accent colors
- Menu items with icons and active states
- "My Info" item should be active (green highlight)
- Collapsible functionality
- Dark theme styling (#1c252e background)

#### 2. Header Component

- Country selector dropdown (showing "Oman")
- Search input with search icon
- Notification bell icon
- User avatar with green border indicator
- Light background (#f4f6f8)

#### 3. Employee Profile Content

- **Breadcrumb Navigation**: "My Info > Abdul Rahman"
- **Tab Navigation**: Details (active) and Compensation tabs
- **Personal Details Card**: Avatar, name, employee ID, job title, and detailed information
- **Contact Information Card**: Email, phone, residence and permanent addresses
- **Dependent Details Card**: Family member information with benefit coverage badges
- **Work Relationship Card**: Employment details
- **Passport Details Card**: Official document information

### Styling Requirements

- Use Tailwind CSS following project standards
- Implement exact colors from Figma design
- Use "Public Sans" font family
- Responsive layout with proper spacing
- Card-based layout with shadows and rounded corners
- Hard-coded values as requested

### Implementation Plan

1. **Create Route Structure**

   - `/app/dashboard/page.tsx` - Main dashboard page
   - `/app/dashboard/layout.tsx` - Dashboard-specific layout

2. **Component Structure**

   - `src/pages/dashboard/components/sidebar-navigation.tsx`
   - `src/pages/dashboard/components/dashboard-header.tsx`
   - `src/pages/dashboard/components/employee-profile.tsx`
   - `src/pages/dashboard/components/profile-tabs.tsx`

3. **Data Structure**
   - Hard-coded employee data matching the Figma design
   - Static navigation menu items
   - Mock contact and dependent information

## Files to Create/Update

### New Files:

- `src/app/dashboard/page.tsx`
- `src/app/dashboard/layout.tsx`
- `src/pages/dashboard/components/sidebar-navigation.tsx`
- `src/pages/dashboard/components/dashboard-header.tsx`
- `src/pages/dashboard/components/employee-profile.tsx`
- `src/pages/dashboard/components/profile-tabs.tsx`

### Updates:

- `src/route/paths.ts` - Add dashboard route constants

## Approval Required

Review the above plan and respond with "go ahead" to proceed with implementation.

## Design Reference

The implementation will replicate the exact Figma design with:

- Employee: Abdul Rahman (ID: 34834)
- Position: Product Developer
- All personal, contact, dependent, work, and passport details as shown
- Exact color scheme and typography
- Responsive card-based layout
