# SERG Workflow Quick Reference Card

**⚠️ CRITICAL: This is MANDATORY for all route generation requests**

## 🚨 AUTO-TRIGGER DETECTION

```javascript
// These phrases AUTOMATICALLY trigger SERG workflow:
✅ "create route"
✅ "generate route for"
✅ "entire route page"
✅ "new page with data"
✅ "CRUD operations"
✅ "end-to-end"
✅ "table form functionality"
```

## 📋 MANDATORY 5-STEP CHECKLIST

### ✅ STEP 1: Smart Analysis (2 seconds)

- [ ] Detect data complexity (≤5 = simple, >5 = complex)
- [ ] Identify nested objects/arrays
- [ ] Map field types to UI components
- [ ] Infer CRUD scope

### ✅ STEP 2: Essential Questions (NEVER SKIP)

**Simple Data (≤5 fields):**

- [ ] "Table fields look good? Any special UI needs?"
- [ ] "Form type preference (modal/page)?"

**Complex Data (>5 fields):**

- [ ] "Which fields for table display?"
- [ ] "Child data display pattern?"
- [ ] "Form approach (page/modal)?"
- [ ] "Special features needed?"

**Nested Data:**

- [ ] "How to display nested arrays?"
- [ ] "Edit nested items inline or separate?"

### ✅ STEP 3: Task File Creation (ALWAYS CREATE)

```
LOCATION: .cursor/tasks/{DD-MM-YY}/{entity}-route-task.md
SECTIONS: 8 mandatory sections (Header, Data Analysis, Requirements, Steps, etc.)
```

### ✅ STEP 4: User Approval (MANDATORY WAIT)

```
REQUIRED PHRASE: "Please review the task file and say 'go ahead' to begin implementation"
FORBIDDEN: Auto-implementing without approval
```

### ✅ STEP 5: Implementation

- [ ] Follow task file exactly
- [ ] Update todos as progressing
- [ ] Create ALL files from checklist

## 🗂️ COMPLETE FILE CHECKLIST

```
✅ Schema: src/lib/schemas/{entity}-schema.ts
✅ API Paths: src/lib/api-paths.ts (update)
✅ Server Functions: src/server/functions/{entity}-functions.ts
✅ Server Actions: src/server/actions/{entity}-actions.ts
✅ App Pages: src/app/{entity}/page.tsx + [ID]/page.tsx + new + edit
✅ Views: src/pages/{entity}/views/ (list, details, create-edit)
✅ Hooks: src/pages/{entity}/hooks/use-{entity}-column.tsx
✅ Path Constants: src/route/paths.ts (update) ← Often missed!
```

## 🚫 VIOLATION PREVENTION

**FORBIDDEN BEHAVIORS:**
❌ Skipping essential questions
❌ Not creating task file  
❌ Auto-implementing without approval
❌ Missing files from checklist
❌ Not using path constants

**EMERGENCY OVERRIDE ONLY:**
User explicitly says `--express` mode

## 🔍 SELF-CHECK BEFORE RESPONDING

```
1. Did user request route creation? → If YES, trigger SERG
2. Have I asked essential questions? → If NO, ask them now
3. Have I created task file? → If NO, create it now
4. Has user approved? → If NO, wait for approval
5. Am I following task file exactly? → If NO, follow it
```

## 📞 VIOLATION RECOVERY

If you catch yourself skipping steps:

1. **STOP immediately**
2. **Acknowledge the violation**: "I need to follow the mandatory SERG workflow"
3. **Restart from missed step**
4. **Continue properly**

---

**Remember: This workflow is MANDATORY and NON-NEGOTIABLE for all route generation!**
