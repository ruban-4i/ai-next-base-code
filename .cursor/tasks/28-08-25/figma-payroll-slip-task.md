# Figma Payroll Slip Implementation Task

**Date**: 28-08-25
**Status**: Pending Approval

## Requirements Summary

### Route Structure

- Route: `/figma-example/payroll-slip`
- Static component with dummy data
- No dynamic features or interactivity needed

### Design Specifications

- Exact visual replication of Figma design
- Clean, professional payroll slip layout
- Company header with simple SVG logo
- Employee information card
- Two-column earnings/deductions tables
- Summary section with net pay

### Asset Handling

- Create simple SVG logo for "Payday" company
- Use placeholder company information
- Dummy employee data (Balaji.K, Senior Software Test Engineer)

### Responsive Behavior

- Maintain same layout across devices
- Fixed width design (similar to original)
- Professional document appearance

## Implementation Plan

### 1. Route Setup

- File: `src/app/figma-example/payroll-slip/page.tsx`
- Create route structure

### 2. PayrollSlip Component

- File: `src/pages/figma-example/views/payroll-slip-view.tsx`
- Implement exact layout from Figma design
- Use dummy data structure

### 3. SVG Logo Creation

- Create simple "Payday" logo SVG
- Integrate into component header

### 4. Styling Implementation

- Use Tailwind CSS classes to match Figma design exactly
- Implement proper typography hierarchy
- Add borders, spacing, and colors as per design

### 5. Data Structure

- Create dummy payroll data object
- Include earnings, deductions, employee details
- Match the exact values from Figma design

## Dummy Data Structure

```typescript
const payrollData = {
  company: {
    name: 'Payday',
    address: '959 Emerson Road Winnfield, LA',
    phone: '+1 888-555-0000',
  },
  employee: {
    name: 'Balaji.K',
    id: '17309',
    position: 'Senior Software Test Engineer',
    joiningDate: '23/09/2024',
    payDate: '31/01/2025',
    paymentMethod: 'Bank Transfer',
    bankDetails: {
      name: 'Gulf National Bank',
      account: 'GNB948394834',
    },
  },
  earnings: [
    { name: 'Basic', amount: '25,054.20' },
    { name: 'House Rent Allowance', amount: '8,034.00' },
    { name: 'Mobile allowance', amount: '6,054.00' },
    { name: 'WFH allowance', amount: '7,000.00' },
    { name: 'Basic Retro Dec', amount: '8,000.00' },
    { name: 'Basic Retro Nov', amount: '8,000.00' },
    { name: 'House Rent Allowance Retro Nov', amount: '2,000.00' },
  ],
  deductions: [
    { name: 'Provident Fund', amount: '1,000.00' },
    { name: 'Social security benefits', amount: '4,300.00' },
    { name: 'Social security benefits Retro Dec', amount: '4,300.00' },
  ],
  summary: {
    totalEarnings: '64,142.20',
    totalDeductions: '9,600.00',
    netPay: '54,542.00',
    netPayWords: '(Fifty Four Thousand Five Hundred Forty Two Dirhams)',
    paidDays: '30',
    lopDays: '0',
    unpaidReversalDays: '0',
  },
}
```

## Files to Create/Update

1. `src/app/figma-example/payroll-slip/page.tsx` - Route page
2. `src/pages/figma-example/views/payroll-slip-view.tsx` - Main component
3. Update `src/route/paths.ts` if needed

## Approval Required

Review the above plan and respond with "go ahead" to proceed with implementation.
