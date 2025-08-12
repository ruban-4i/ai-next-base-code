# LLM Context Rules - Next.js Route Generation

## SINGLE PROMPT GENERATES COMPLETE ROUTE

**INPUT FORMAT:**

```
Generate route for: {entity_name}
Data shape: {json_structure}
```

**OUTPUT:** 12+ files, complete CRUD system, type-safe, production-ready

---

## GENERATION RULES

### 1. NAMING CONVENTIONS

- `{entity}` = lowercase plural (`products`, `orders`)
- `{Entity}` = PascalCase (`Products`, `Orders`)
- `{ENTITY}` = UPPERCASE (`PRODUCTS`, `ORDERS`)
- `{ID_FIELD}` = Primary key from JSON

### 2. FILE STRUCTURE (EXACT)

```
src/lib/schemas/{entity}-schema.ts           # Zod schemas + types
src/api/{entity}-api.ts                      # Axios instance
src/server/functions/{entity}-functions.ts   # Read ops (NO 'use server')
src/server/actions/{entity}-actions.ts       # Write ops (WITH 'use server')
src/app/{entity}/page.tsx                    # List page
src/app/{entity}/[{ID_FIELD}]/page.tsx       # Detail page
src/app/{entity}/new/page.tsx                # Create page
src/app/{entity}/[{ID_FIELD}]/edit/page.tsx  # Edit page
src/pages/{entity}/views/{entity}-list-view.tsx        # List UI
src/pages/{entity}/views/{entity}-details-view.tsx     # Detail UI
src/pages/{entity}/views/{entity}-create-edit-view.tsx # Form UI
src/pages/{entity}/hooks/use-{entity}-column.tsx       # Table columns
```

### 3. SCHEMA PATTERN (DRY)

```typescript
// BASE SCHEMA - Single source of truth
const base{Entity}Schema = z.object({
  {ID_FIELD}: z.string().min(1, 'ID required'),
  // Map JSON fields to Zod validators
})

// EXTEND FOR CRUD
export const {entity}Schema = base{Entity}Schema
export const {entity}CreateSchema = base{Entity}Schema.omit({ {ID_FIELD}: true })
export const {entity}UpdateSchema = base{Entity}Schema.partial().required({ {ID_FIELD}: true })
export const {entity}QuerySchema = base{Entity}Schema.partial().extend({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(100).default(10),
  sortBy: z.enum([/* sortable fields */]).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().optional(),
})

export const {entity}ListResponseSchema = z.object({
  data: z.array({entity}Schema),
  currentPage: z.number().positive(),
  totalPages: z.number().positive(),
  totalcount: z.number().nonnegative(),
})
```

### 4. SERVER LAYER PATTERN

```typescript
// FUNCTIONS (Read - NO 'use server')
export async function get{Entity}sList(query: {Entity}Query): Promise<{Entity}ListResponse>
export async function get{Entity}ById(id: string): Promise<{Entity}Response | null>

// ACTIONS (Write - WITH 'use server')
'use server'
type ActionResult<T> = { success: boolean; data?: T; error?: string; fieldErrors?: Record<string, string[]> }

export async function create{Entity}(data: {Entity}Create): Promise<ActionResult<{Entity}Response>>
export async function update{Entity}(id: string, data: Partial<{Entity}Update>): Promise<ActionResult<{Entity}Response>>
export async function delete{Entity}(id: string): Promise<ActionResult<{Entity}DeleteResponse>>
```

### 5. PAGE STRUCTURE

```typescript
// LIST PAGE - Server Component with search params
export default async function {Entity}Page({ searchParams }: { searchParams: any }) {
  const query = { page: Number(searchParams.page) || 1, /* ... */ }
  const {entityList} = await get{Entity}sList(query)
  return <{Entity}ListView initialData={{entityList}} />
}

// DETAIL PAGE - Dynamic route
export default async function {Entity}DetailPage({ params }: { params: { {ID_FIELD}: string } }) {
  const {entity} = await get{Entity}ById(params.{ID_FIELD})
  return <{Entity}DetailsView {entity}={{entity}} />
}
```

### 6. API INTEGRATION

```typescript
// Axios instance
export const {entityApi} = axios.create({
  baseURL: env.{API_NAME}_APPLICATION_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// API paths (ADD to existing API_PATHS)
{ENTITY}: {
  LIST: '/{entities}',
  GET_BY_ID: (id: string) => `/{entities}/${id}`,
  CREATE: '/{entities}',
  UPDATE: (id: string) => `/{entities}/${id}`,
  DELETE: (id: string) => `/{entities}/${id}`,
}
```

### 7. FIELD TYPE MAPPING

```typescript
"string"           → z.string()
"email@test.com"   → z.email()
123                → z.number()
true/false         → z.boolean()
"Y"/"N"            → z.enum(['Y', 'N'])
null               → z.string().nullable()
undefined          → z.string().optional()
"2024-01-01"       → z.string().datetime()
"ObjectId"         → z.string().min(1)
```

---

## EXAMPLE USAGE

**Prompt:**

```
Generate route for: products
Data shape: {
  "PRODUCT_ID": "507f1f77bcf86cd799439011",
  "NAME": "iPhone 15",
  "PRICE": 999.99,
  "CATEGORY": "Electronics",
  "ACTIVE": "Y",
  "DESCRIPTION": "Latest iPhone model"
}
```

**Result:** Complete product management system with 12+ files, type-safe CRUD, server-side rendering, form validation, data tables, search/filter, pagination, error handling.

---

## CRITICAL REQUIREMENTS

✅ **MUST FOLLOW**: Existing folder structure and naming conventions  
✅ **MUST INCLUDE**: Complete error handling and validation  
✅ **MUST USE**: Server Components for pages, Client Components for interactivity  
✅ **MUST SEPARATE**: Read operations (functions) vs Write operations (actions)  
✅ **MUST VALIDATE**: All inputs/outputs with Zod schemas  
✅ **MUST REVALIDATE**: Cache after mutations with `revalidatePath()`  
✅ **MUST EXPORT**: TypeScript types from schemas

❌ **NEVER**: Use 'use server' in functions files  
❌ **NEVER**: Duplicate field definitions across schemas  
❌ **NEVER**: Hardcode API URLs or skip environment variables  
❌ **NEVER**: Skip error handling or validation  
❌ **NEVER**: Mix read/write operations in same file

---

## READY TO USE

Copy this entire file as context when prompting any LLM. Then use the simple format:

```
Generate route for: {your_entity}
Data shape: {your_json_structure}
```

The LLM will generate a complete, production-ready route following all your established patterns and best practices.
