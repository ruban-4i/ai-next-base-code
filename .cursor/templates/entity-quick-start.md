# Entity Quick Start Template

## Replacement Guide

When creating a new entity, replace these placeholders:

- `{entity}` → lowercase entity name (e.g., `products`, `orders`, `customers`)
- `{Entity}` → PascalCase entity name (e.g., `Products`, `Orders`, `Customers`)
- `{ENTITY}` → UPPERCASE entity name (e.g., `PRODUCTS`, `ORDERS`, `CUSTOMERS`)

## File Creation Checklist

### 1. Schema (Required)

```
src/lib/schemas/{entity}-schema.ts
```

### 2. API Integration (Required)

```
src/api/{entity}-api.ts              # Axios instance
src/lib/api-paths.ts                 # Add {ENTITY} paths
```

### 3. Server Layer (Required)

```
src/server/functions/{entity}-functions.ts    # Query functions
src/server/actions/{entity}-actions.ts        # Mutation actions
```

### 4. Pages (Required)

```
src/app/{entity}/page.tsx                     # List page
src/app/{entity}/[ID]/page.tsx                # Detail page
src/app/{entity}/new/page.tsx                 # Create page (optional)
src/app/{entity}/[ID]/edit/page.tsx           # Edit page (optional)
```

### 5. Views (Required)

```
src/pages/{entity}/views/{entity}-list-view.tsx      # List UI
src/pages/{entity}/views/{entity}-details-view.tsx   # Detail UI
src/pages/{entity}/views/{entity}-create-edit-view.tsx # Form UI (optional)
```

### 6. Hooks (Required)

```
src/pages/{entity}/hooks/use-{entity}-column.tsx     # Table columns
```

## Quick Commands

### Create Directory Structure

```powershell
# Pages structure
New-Item -Path "src/pages/{entity}/views" -ItemType Directory -Force
New-Item -Path "src/pages/{entity}/hooks" -ItemType Directory -Force

# App routes structure
New-Item -Path "src/app/{entity}/[ID]" -ItemType Directory -Force
New-Item -Path "src/app/{entity}/new" -ItemType Directory -Force
New-Item -Path "src/app/{entity}/[ID]/edit" -ItemType Directory -Force
```

### Create Files

```powershell
# Schema
New-Item -Path "src/lib/schemas/{entity}-schema.ts" -ItemType File

# Server functions
New-Item -Path "src/server/functions/{entity}-functions.ts" -ItemType File
New-Item -Path "src/server/actions/{entity}-actions.ts" -ItemType File

# Pages
New-Item -Path "src/app/{entity}/page.tsx" -ItemType File
New-Item -Path "src/app/{entity}/[ID]/page.tsx" -ItemType File

# Views
New-Item -Path "src/pages/{entity}/views/{entity}-list-view.tsx" -ItemType File
New-Item -Path "src/pages/{entity}/views/{entity}-details-view.tsx" -ItemType File

# Hooks
New-Item -Path "src/pages/{entity}/hooks/use-{entity}-column.tsx" -ItemType File
```

## Implementation Order

1. **Schema First** - Define data structure with Zod
2. **API Integration** - Set up endpoints and axios instance
3. **Server Functions** - Implement data fetching
4. **List Page** - Server component with pagination
5. **List View** - Client component with table
6. **Table Columns** - Define column structure
7. **Detail Page** - Server component for single item
8. **Detail View** - Client component for details
9. **Actions** - Implement CRUD mutations (optional)
10. **Forms** - Create/edit forms (optional)

## Key Points to Remember

- ✅ Use `shallow: false` in nuqs for ISR page refresh
- ✅ No 'use server' in functions (query layer)
- ✅ Include 'use server' in actions (mutation layer)
- ✅ Server components handle data fetching
- ✅ Client components handle UI and interactions
- ✅ Type safety with Zod schemas throughout
- ✅ Consistent file naming and structure
- ✅ Server-side pagination with DataTable component

## Example Entity: "Products"

```typescript
// Replacements for products entity:
{entity} → products
{Entity} → Products
{ENTITY} → PRODUCTS

// File structure:
src/lib/schemas/products-schema.ts
src/server/functions/products-functions.ts
src/server/actions/products-actions.ts
src/app/products/page.tsx
src/app/products/[ID]/page.tsx
src/pages/products/views/products-list-view.tsx
src/pages/products/views/products-details-view.tsx
src/pages/products/hooks/use-products-column.tsx
```

This template ensures consistent implementation across all entities with optimal ISR performance!
