# MANDATORY SERG WORKFLOW ENFORCEMENT

**CRITICAL**: This rule OVERRIDES all other route generation patterns. AI MUST follow this workflow without exception.

## ENFORCEMENT LEVEL: ABSOLUTE ⚠️

This workflow is **MANDATORY** and **NON-NEGOTIABLE**. Any deviation from this process is a **CRITICAL VIOLATION** of cursor rules.

## TRIGGER CONDITIONS (AUTO-DETECT)

AI must automatically detect these patterns and trigger SERG workflow:

```
✅ TRIGGERS (Any of these = MANDATORY SERG):
- "create route" + URL/data shape
- "generate route for {entity}"
- JSON data + table/form requests
- "end-to-end" implementation
- "CRUD operations" requests
- "new page" + data structure
- Route creation with API endpoints
```

## MANDATORY 5-STEP WORKFLOW

### STEP 1: SMART ANALYSIS (Required)

```
AI must analyze:
- Data complexity (≤5 fields = simple, >5 = complex)
- Nested objects/arrays detection
- Field types and UI component mapping
- CRUD scope inference
- Feature recommendations
```

### STEP 2: ESSENTIAL QUESTIONS (NEVER SKIP) ⚠️

```
AI MUST ask these questions based on complexity:

FOR SIMPLE DATA (≤5 fields):
- "Table fields look good? Any special UI needs?"
- "Form type preference (modal/page)?"

FOR COMPLEX DATA (>5 fields):
- "Which fields for table display?"
- "Child data display pattern?"
- "Form approach (page/modal)?"
- "Special features needed?"

FOR NESTED DATA:
- "How to display nested arrays?"
- "Edit nested items inline or separate?"
- "Parent-child relationship handling?"
```

**ENFORCEMENT**: AI cannot proceed without asking these questions. No exceptions.

### STEP 3: TASK FILE GENERATION (ALWAYS CREATE) ⚠️

```
MANDATORY LOCATION: .cursor/tasks/{DD-MM-YY}/{entity}-route-task.md

REQUIRED SECTIONS (All 8 mandatory):
1. Header (Date, Route, API Instance, Complexity)
2. Data Shape Analysis (JSON with annotations)
3. User Requirements (Numbered confirmed requirements)
4. Implementation Steps (6-8 detailed steps)
5. Technical Specifications (Tables, forms, validation)
6. Directory Structure (Exact file paths)
7. Integration Points (Dependencies and patterns)
8. Success Criteria (Completion checkboxes)
```

**ENFORCEMENT**: AI must create this file after essential questions. Cannot skip.

### STEP 4: USER APPROVAL (MANDATORY WAIT) ⚠️

```
AI MUST:
- Wait for explicit approval: "go ahead", "start", "implement"
- NOT proceed to implementation automatically
- Allow user to modify task file if needed
- Only continue after confirmation

FORBIDDEN PHRASES:
❌ "I'll start implementing now"
❌ "Let me create the files"
❌ "Beginning implementation"

REQUIRED PHRASE:
✅ "Please review the task file and say 'go ahead' to begin implementation"
```

### STEP 5: IMPLEMENTATION (Follow Task File Exactly)

```
AI MUST:
- Follow task file step-by-step
- Update todos as work progresses
- Mark completed items immediately
- Follow all cursor rules and project patterns
```

## VIOLATION DETECTION & PREVENTION

### AUTOMATIC WORKFLOW TRIGGERS

```javascript
// AI must detect these patterns and trigger SERG:
const ROUTE_TRIGGERS = [
  /create.*route.*for/i,
  /generate.*route/i,
  /new.*page.*with.*data/i,
  /crud.*operations/i,
  /end.to.end/i,
  /table.*form.*functionality/i,
]

// If any trigger matches → MANDATORY SERG workflow
```

### CHECKPOINT ENFORCEMENT

```
CHECKPOINT 1: Essential Questions Asked?
- If NO → CRITICAL VIOLATION
- If YES → Proceed to Task File

CHECKPOINT 2: Task File Created?
- If NO → CRITICAL VIOLATION
- If YES → Wait for Approval

CHECKPOINT 3: User Approval Received?
- If NO → WAIT (do not implement)
- If YES → Begin Implementation

CHECKPOINT 4: Following Task File?
- If NO → CRITICAL VIOLATION
- If YES → Continue Implementation
```

## COMPLETE FILE CHECKLIST (Enforce All)

AI must create/update ALL these files (from entity-quick-start.md):

```
✅ REQUIRED FILES (All must be created):

1. Schema (Required)
   └── src/lib/schemas/{entity}-schema.ts

2. API Integration (Required)
   ├── src/api/{entity}-api.ts (if new instance)
   └── src/lib/api-paths.ts (update with {ENTITY}_PATHS)

3. Server Layer (Required)
   ├── src/server/functions/{entity}-functions.ts
   └── src/server/actions/{entity}-actions.ts

4. App Router Pages (Required)
   ├── src/app/{entity}/page.tsx
   ├── src/app/{entity}/[ID]/page.tsx
   ├── src/app/{entity}/new/page.tsx (optional)
   └── src/app/{entity}/[ID]/edit/page.tsx (optional)

5. Views (Required)
   ├── src/pages/{entity}/views/{entity}-list-view.tsx
   ├── src/pages/{entity}/views/{entity}-details-view.tsx
   └── src/pages/{entity}/views/{entity}-create-edit-view.tsx

6. Hooks (Required)
   └── src/pages/{entity}/hooks/use-{entity}-column.tsx

7. Path Constants (Required - Often Missed)
   └── src/route/paths.ts (update with new paths)
```

**ENFORCEMENT**: AI must create ALL files in the checklist. Missing any file = VIOLATION.

## ERROR PREVENTION RULES

### FORBIDDEN BEHAVIORS ❌

```
❌ Skipping essential questions
❌ Not creating task file
❌ Auto-implementing without approval
❌ Missing files from checklist
❌ Not using path constants from paths.ts
❌ Creating components in wrong directories
❌ Not following project structure patterns
```

### REQUIRED BEHAVIORS ✅

```
✅ Always ask essential questions first
✅ Always create task file in .cursor/tasks/
✅ Always wait for user approval
✅ Always follow complete file checklist
✅ Always use path constants from paths.ts
✅ Always follow project structure rules
✅ Always update todos and mark completed
```

## EMERGENCY OVERRIDE (Express Mode)

Only when user explicitly requests `--express` mode:

```
User says: "Skip questions, just implement --express"
AI can skip questions and task file ONLY in this case.
```

**Default behavior**: Always follow full SERG workflow.

## SELF-MONITORING PROMPTS

AI must ask itself these questions before responding:

```
BEFORE RESPONDING:
1. Did user request route creation? → If YES, trigger SERG
2. Have I asked essential questions? → If NO, ask them now
3. Have I created task file? → If NO, create it now
4. Has user approved? → If NO, wait for approval
5. Am I following the task file? → If NO, follow it exactly
```

## WORKFLOW STATUS TRACKING

AI must track workflow state:

```
WORKFLOW_STATE: {
  analysis_complete: boolean,
  questions_asked: boolean,
  task_file_created: boolean,
  user_approved: boolean,
  implementation_started: boolean
}
```

Cannot proceed to next step until previous step is complete.

## COMPLIANCE VERIFICATION

At the end of any route generation, AI must verify:

```
✅ COMPLIANCE CHECKLIST:
- [ ] Essential questions were asked
- [ ] Task file was created in .cursor/tasks/
- [ ] User approval was received
- [ ] All files from checklist were created
- [ ] Path constants are used throughout
- [ ] Project structure patterns followed
- [ ] Implementation matches task file exactly
```

---

**IMPLEMENTATION DATE**: 25-08-25  
**STATUS**: ACTIVE ENFORCEMENT - NO EXCEPTIONS  
**VIOLATION CONSEQUENCE**: Immediate workflow restart from Step 1

This rule ensures consistent, complete, and user-approved route generation every time.
