# Super-Efficient Route Generator (SERG) - Updated Workflow Rules

**Updated**: 22-08-25  
**Status**: Active Standard Workflow

## Core SERG Workflow (MANDATORY SEQUENCE)

### TRIGGERS

- New route with URL and data shape
- "Create route" requests
- CRUD operations requests
- JSON data + table/form requirements
- "End-to-end" implementation requests

### LIGHTNING-FAST PROCESS (UPDATED)

1. **User Request** → Smart Analysis (2 seconds)
2. **Essential Questions** (MANDATORY - NEVER skip)
3. **Task File Generation** (MANDATORY - ALWAYS create)
4. **User Approval** (Wait for "go ahead" or similar)
5. **Implementation** (2 minutes)

**Total Time**: 3-4 minutes from request to working route

## STEP 1: SMART ANALYSIS ENGINE

- Auto-detects complexity (≤5 fields = simple, >5 = complex)
- Identifies relationships (nested objects/arrays)
- Recommends form type (modal vs page based on complexity)
- Finds lookup fields (\*\_id, status, category patterns)
- Infers CRUD scope from context
- Suggests features based on data patterns

## STEP 2: ESSENTIAL QUESTIONS (MANDATORY)

**Always ask 2-4 focused questions based on complexity:**

### For Simple Data (≤5 fields):

- "Table fields look good? Any special UI needs? Form type preference?"

### For Complex Data (>5 fields):

- "Which fields for table display?"
- "Child data display pattern?"
- "Form approach (page/modal)?"
- "Special features needed?"

### For Nested Data:

- "How to display nested arrays?"
- "Edit nested items inline or separate?"
- "Parent-child relationship handling?"

## STEP 3: TASK FILE GENERATION (MANDATORY - NEW STANDARD)

**ALWAYS create after essential questions are answered:**

### File Location

- Create in `.cursor/{DD-MM-YY}/` folder
- Use PowerShell `Get-Date -Format "dd-MM-yy"` to get current date
- Filename: `{entity}-route-task.md`

### Task File Content (MANDATORY SECTIONS)

1. **Header**: Date, Route, API Instance, Complexity
2. **Data Shape Analysis**: Full JSON structure with annotations
3. **User Requirements**: Numbered list of confirmed requirements
4. **Implementation Steps**: Detailed 6-8 step breakdown
5. **Technical Specifications**: Tables, forms, validation rules
6. **Directory Structure**: Exact file paths and organization
7. **Integration Points**: Dependencies and patterns to follow
8. **Success Criteria**: Checkboxes for completion validation

### Task File Template Structure

```markdown
# {Entity} Route Implementation Task

**Date**: {DD-MM-YY}
**Route**: `/{entity}`
**API Instance**: {specified instance}
**Complexity**: {Simple/Complex analysis}

## Data Shape Analysis

[JSON structure with comments]

## User Requirements

1. [Requirement 1]
2. [Requirement 2]
   ...

## Implementation Steps

### 1. Schema & Types

### 2. API Configuration

### 3. Server Layer

### 4. Components & Hooks

### 5. Views

### 6. App Router Pages

### 7. Directory Structure

## Technical Specifications

[Detailed specs]

## Success Criteria

✅ [Criteria 1]
✅ [Criteria 2]
```

## STEP 4: USER APPROVAL (MANDATORY WAIT)

- **NEVER proceed to implementation automatically**
- Wait for explicit approval: "go ahead", "start", "implement", etc.
- Allow user to modify task file if needed
- Only proceed after confirmation

## STEP 5: IMPLEMENTATION

- Follow task file exactly
- Update todos as work progresses
- Mark completed items immediately
- Follow all cursor rules and project patterns

## INTELLIGENT DEFAULTS

- **Form Type**: Modal for ≤5 simple fields, Page for complex/nested data
- **Table Fields**: Show key fields, hide technical IDs
- **CRUD Operations**: Complete CRUD unless explicitly limited
- **Components**: Auto-map data types to optimal UI components
- **Features**: Include search, pagination, sorting, filtering by default

## MODES AVAILABLE

- **Standard Mode**: Essential questions → Task file → Approval → Implementation (DEFAULT)
- **Express Mode** (--express): Skip questions and task file (ONLY when explicitly requested)

## CRITICAL RULES

1. ✅ **ALWAYS ask essential questions first** - NEVER skip
2. ✅ **ALWAYS create task file after questions** - NEW MANDATORY STEP
3. ✅ **ALWAYS wait for user approval** - NEVER auto-implement
4. ✅ **ALWAYS use path constants** from paths.ts
5. ✅ **ALWAYS follow project structure** - components in correct directories
6. ✅ **ALWAYS update todos** and mark completed immediately

## WORKFLOW ENFORCEMENT

- This workflow replaces ALL previous route generation methods
- AI must follow this sequence for every route request
- No exceptions unless user explicitly requests --express mode
- Task file generation is now a permanent standard step

---

**Implementation Date**: 22-08-25  
**Status**: Active Standard - All route generation must follow this workflow  
**Next Review**: When user requests workflow changes
