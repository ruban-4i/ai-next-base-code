# Electronics Route Implementation Task

**Date**: 25-08-25
**Status**: Pending Approval

## Requirements Summary

### Table Display

- Fields: name, brand, category, price, year, color
- Features: Search/Filter, server-side pagination, column sorting, delete confirmations
- Extra features: Show count in table, modal view for feature details

### Form Configuration

- Fields: name (text), brand (text), year (number), category (select), color (text), price (number)
- Nested specs: processor (text), ram (text), storage (text)
- Dynamic extra features: feature (text), warranty (text) with bulk operations
- Validation: Required fields, price validation, year validation
- Form Type: Full Page

### CRUD Operations

- Complete CRUD: Create, Read, Update, Delete
- Modal view for extra features with bulk add/edit/delete
- Delete confirmations for safety

### API Integration

- Uses onlinetestapplication axios instance
- Endpoint: `/electronics`
- Pagination support with currentPage, totalCount, totalPages

## Implementation Plan

### 1. Schema Creation

- File: `src/lib/schemas/electronics-schema.ts`
- Main schema: ElectronicsSchema with id, name, brand, year, category, color, price
- Nested specs schema: processor, ram, storage
- Extra features schema: child_id, feature, warranty
- Form schemas for create/update operations
- Hard-coded category options: Mobile, Laptop, Smartwatch, Tablet, Earbuds, Camera, Drone

### 2. API Integration

- Update: `src/lib/api-paths.ts`
- Add electronics endpoints: list, create, read, update, delete
- Support pagination parameters

### 3. Server Functions/Actions

- Files: `src/server/functions/electronics-functions.ts`
- Files: `src/server/actions/electronics-actions.ts`
- Functions: getElectronics (with pagination), getElectronicsById
- Actions: createElectronics, updateElectronics, deleteElectronics
- Uses onlinetestapplication axios instance

### 4. UI Components

- Table: DataTable with name, brand, category, price, year, color columns
- Extra features: Show count in table, modal for detailed view
- Forms: Full page forms with specs section and dynamic extra features
- Category select with hard-coded options
- Modal for bulk feature operations

### 5. Route Pages

- List page: `/electronics/page.tsx`
- Details page: `/electronics/[id]/page.tsx`
- Create page: `/electronics/new/page.tsx`
- Edit page: `/electronics/[id]/edit/page.tsx`

### 6. View Components

- `src/pages/electronics/views/electronics-list-view.tsx`
- `src/pages/electronics/views/electronics-details-view.tsx`
- `src/pages/electronics/views/electronics-create-edit-view.tsx`

### 7. Hooks

- `src/pages/electronics/hooks/use-electronics-column.tsx`
- Column definitions with proper formatting for price, year
- Actions column with view, edit, delete options

### 8. Components (if needed)

- `src/pages/electronics/components/` for any specific components
- Extra features modal component
- Specs display component

## Technical Details

### Category Options (Hard-coded)

- Mobile
- Laptop
- Smartwatch
- Tablet
- Earbuds
- Camera
- Drone

### Data Structure

```typescript
interface Electronics {
  id: number
  name: string
  brand: string
  year: number
  category: string
  color: string
  price: number
  specs: {
    processor: string
    ram: string
    storage: string
  }
  extra: Array<{
    child_id: number
    feature: string
    warranty: string
  }>
}
```

### API Response Structure

```typescript
interface ElectronicsResponse {
  data: Electronics[]
  currentPage: number
  totalCount: number
  totalPages: number
}
```

## File Structure

```
src/
├── lib/
│   ├── api-paths.ts (update)
│   └── schemas/
│       └── electronics-schema.ts (new)
├── pages/
│   └── electronics/
│       ├── components/
│       │   └── electronics-extra-features-modal.tsx (new)
│       ├── hooks/
│       │   └── use-electronics-column.tsx (new)
│       └── views/
│           ├── electronics-list-view.tsx (new)
│           ├── electronics-details-view.tsx (new)
│           └── electronics-create-edit-view.tsx (new)
├── route/
│   └── paths.ts (update)
├── server/
│   ├── actions/
│   │   └── electronics-actions.ts (new)
│   └── functions/
│       └── electronics-functions.ts (new)
└── app/
    └── electronics/
        ├── page.tsx (new)
        ├── [id]/
        │   ├── page.tsx (new)
        │   └── edit/
        │       └── page.tsx (new)
        └── new/
            └── page.tsx (new)
```

## Approval Required

Review the above plan and respond with "go ahead" to proceed with implementation.
