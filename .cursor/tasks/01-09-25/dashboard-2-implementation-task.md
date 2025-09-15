# Dashboard-2 Implementation Task

**Date**: 01-09-25
**Status**: Pending Approval

## Requirements Summary

### Design Analysis (from Figma)

- **Layout**: Sidebar + Main Content Area
- **Components**:
  - Collapsible sidebar with navigation
  - Top header with search, notifications, user profile
  - Stats cards row (4 cards)
  - Charts section (Request Trends line chart + Service Usage pie chart)
  - Activity feeds section (Recent Activity + Upcoming Holidays)

### Key Features

- **Sidebar Navigation**: Home (active), All services, Help, Configuration
- **Header**: Search bar, notification bell, user profile with avatar
- **Stats Cards**: Announcements (4), Pending Lists (59), Completed (123), Efficiency (87%)
- **Charts**: Interactive line chart and pie chart with data visualization
- **Activity Lists**: Recent activities with timestamps, Upcoming holidays with countdowns

### Technical Requirements

- **Route**: `/dashboard-2/page.tsx`
- **Components**: Reusable UI components following project structure
- **Styling**: Tailwind CSS with design system tokens
- **Icons**: SVG icons for navigation and stats
- **Responsive**: Mobile-first approach
- **Accessibility**: ARIA labels, keyboard navigation

## Implementation Plan

### 1. Project Structure Setup

- Create `/src/app/dashboard-2/` route
- Create `/src/pages/dashboard-2/` components and views
- Update path constants in `/src/route/paths.ts`

### 2. Core Components Development

- **DashboardSidebar**: Navigation with collapsible functionality
- **DashboardHeader**: Search, notifications, user profile
- **StatsCard**: Reusable card component for metrics
- **RequestTrendsChart**: Line chart component
- **ServiceUsageChart**: Pie chart component
- **ActivityList**: Recent activity feed
- **HolidaysList**: Upcoming holidays with countdown

### 3. Main Dashboard Layout

- **DashboardLayout**: Sidebar + main content structure
- **Dashboard2View**: Main dashboard page component
- **Responsive Design**: Mobile sidebar collapse, responsive charts

### 4. Data Integration

- Mock data for charts and lists
- Type definitions for dashboard data
- Proper state management for interactive elements

### 5. Styling & Polish

- Design system color tokens
- Hover states and transitions
- Loading states for components
- Proper spacing and typography

## File Structure

```
src/
├── app/
│   └── dashboard-2/
│       ├── layout.tsx
│       └── page.tsx
├── pages/
│   └── dashboard-2/
│       ├── components/
│       │   ├── dashboard-sidebar.tsx
│       │   ├── dashboard-header.tsx
│       │   ├── stats-card.tsx
│       │   ├── request-trends-chart.tsx
│       │   ├── service-usage-chart.tsx
│       │   ├── activity-list.tsx
│       │   └── holidays-list.tsx
│       └── views/
│           └── dashboard-2-view.tsx
└── route/
    └── paths.ts (update with DASHBOARD_2 constant)
```

## Design Tokens (from Figma)

- **Primary Color**: #008381 (teal)
- **Background**: #f5f7fa (light gray)
- **Cards**: #ffffff (white)
- **Text Primary**: #212121
- **Text Secondary**: #8a8a8a
- **Border**: #e8e8e8
- **Spacing**: 4, 8, 12, 16, 24px
- **Border Radius**: 8px for cards, 4px for buttons

## Interactive Elements

- **Sidebar**: Collapsible with expand/collapse button
- **Search**: Functional search input
- **Charts**: Hover tooltips and data points
- **Activity**: Click to view details
- **Navigation**: Active states and hover effects

## Approval Required

Review the above plan and respond with "go ahead" to proceed with implementation.
