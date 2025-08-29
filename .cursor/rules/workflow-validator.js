/**
 * SERG Workflow Validator
 * Helps AI detect if mandatory workflow steps are being followed
 */

const ROUTE_TRIGGERS = [
  /create.*route.*for/i,
  /generate.*route/i,
  /new.*page.*with.*data/i,
  /crud.*operations/i,
  /end.to.end/i,
  /table.*form.*functionality/i,
  /route.*generation/i,
  /entire.*route.*page/i,
];

const WORKFLOW_STATE = {
  analysis_complete: false,
  questions_asked: false,
  task_file_created: false,
  user_approved: false,
  implementation_started: false,
};

/**
 * Detects if user request triggers SERG workflow
 */
function detectSERGTrigger(userMessage) {
  return ROUTE_TRIGGERS.some((pattern) => pattern.test(userMessage));
}

/**
 * Validates if essential questions were asked
 */
function validateEssentialQuestions(aiResponse) {
  const questionIndicators = [
    /which fields.*table/i,
    /form approach/i,
    /special features/i,
    /display pattern/i,
    /UI needs/i,
    /form type preference/i,
  ];

  return questionIndicators.some((pattern) => pattern.test(aiResponse));
}

/**
 * Validates if task file was created
 */
function validateTaskFileCreation(aiResponse) {
  const taskFileIndicators = [
    /\.cursor\/tasks/i,
    /task file/i,
    /implementation plan/i,
    /review.*task/i,
  ];

  return taskFileIndicators.some((pattern) => pattern.test(aiResponse));
}

/**
 * Validates if waiting for approval
 */
function validateWaitingForApproval(aiResponse) {
  const approvalIndicators = [
    /go ahead/i,
    /review.*file/i,
    /say.*start/i,
    /approval/i,
    /confirm/i,
  ];

  return approvalIndicators.some((pattern) => pattern.test(aiResponse));
}

/**
 * Complete workflow validation
 */
function validateSERGWorkflow(userMessage, aiResponse) {
  const results = {
    triggerDetected: detectSERGTrigger(userMessage),
    questionsAsked: validateEssentialQuestions(aiResponse),
    taskFileCreated: validateTaskFileCreation(aiResponse),
    waitingForApproval: validateWaitingForApproval(aiResponse),
    violations: [],
  };

  // Check for violations
  if (results.triggerDetected && !results.questionsAsked) {
    results.violations.push('CRITICAL: Essential questions not asked');
  }

  if (results.questionsAsked && !results.taskFileCreated) {
    results.violations.push('CRITICAL: Task file not created after questions');
  }

  if (results.taskFileCreated && !results.waitingForApproval) {
    results.violations.push('CRITICAL: Not waiting for user approval');
  }

  return results;
}

module.exports = {
  detectSERGTrigger,
  validateEssentialQuestions,
  validateTaskFileCreation,
  validateWaitingForApproval,
  validateSERGWorkflow,
  ROUTE_TRIGGERS,
  WORKFLOW_STATE,
};
