# Quick Route Generation Prompt Template

## ULTRA-CONCISE PROMPT FORMAT

```
🚀 GENERATE ROUTE: {entity_name}

📋 DATA SHAPE:
{
  "ID_FIELD": "value_type",
  "FIELD_NAME": "value_type",
  // ... more fields
}

🎯 GENERATE: Complete CRUD route with all files
```

## EXAMPLE PROMPTS

### E-commerce Product

```
🚀 GENERATE ROUTE: products

📋 DATA SHAPE:
{
  "PRODUCT_ID": "507f1f77bcf86cd799439011",
  "NAME": "iPhone 15",
  "PRICE": 999.99,
  "CATEGORY": "Electronics",
  "ACTIVE": "Y",
  "STOCK_QUANTITY": 100,
  "DESCRIPTION": "Latest iPhone model"
}

🎯 GENERATE: Complete CRUD route with all files
```

### Customer Management

```
🚀 GENERATE ROUTE: customers

📋 DATA SHAPE:
{
  "CUSTOMER_ID": "cust_123456",
  "EMAIL": "john@example.com",
  "FIRST_NAME": "John",
  "LAST_NAME": "Doe",
  "PHONE": "+1234567890",
  "STATUS": "ACTIVE",
  "CREATED_DATE": "2024-01-15T10:30:00Z"
}

🎯 GENERATE: Complete CRUD route with all files
```

### Order Management

```
🚀 GENERATE ROUTE: orders

📋 DATA SHAPE:
{
  "ORDER_ID": "ord_789012",
  "CUSTOMER_ID": "cust_123456",
  "TOTAL_AMOUNT": 1299.99,
  "STATUS": "PENDING",
  "ORDER_DATE": "2024-08-12T14:22:00Z",
  "SHIPPING_ADDRESS": "123 Main St, City, State"
}

🎯 GENERATE: Complete CRUD route with all files
```

## EXPECTED OUTPUT

When you use this prompt, the AI will generate:

✅ **10+ Files** following your exact patterns
✅ **Complete CRUD** operations (Create, Read, Update, Delete)
✅ **Type-safe** with Zod validation and TypeScript
✅ **Server Components** with ISR for performance
✅ **Data Tables** with search, filter, pagination
✅ **Form Validation** with error handling
✅ **Responsive UI** following your design system

## CUSTOMIZATION FLAGS

Add these to your prompt for variations:

```
🎯 GENERATE: Complete CRUD route with all files
+ Include bulk operations
+ Add export functionality
+ Skip create/edit pages (read-only)
+ Include soft delete
+ Add audit trail
```

## FILE STRUCTURE PREVIEW

Your prompt will generate this exact structure:

```
📁 NEW ROUTE: /{entity}
├── 📄 src/lib/schemas/{entity}-schema.ts
├── 📄 src/api/{entity}-api.ts
├── 📄 src/server/functions/{entity}-functions.ts
├── 📄 src/server/actions/{entity}-actions.ts
├── 📄 src/app/{entity}/page.tsx
├── 📄 src/app/{entity}/[ID]/page.tsx
├── 📄 src/app/{entity}/new/page.tsx
├── 📄 src/app/{entity}/[ID]/edit/page.tsx
├── 📄 src/pages/{entity}/views/{entity}-list-view.tsx
├── 📄 src/pages/{entity}/views/{entity}-details-view.tsx
├── 📄 src/pages/{entity}/views/{entity}-create-edit-view.tsx
└── 📄 src/pages/{entity}/hooks/use-{entity}-column.tsx
```

## READY TO USE

Copy any example prompt above, replace with your data, and paste into Claude/ChatGPT. Your complete route will be generated following all your established patterns and best practices!
