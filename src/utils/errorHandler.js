import toast from 'react-hot-toast';

// Error types for better categorization
export const ErrorTypes = {
  NETWORK: 'NETWORK',
  AUTHENTICATION: 'AUTHENTICATION',
  VALIDATION: 'VALIDATION',
  PERMISSION: 'PERMISSION',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER',
  UNKNOWN: 'UNKNOWN'
};

// Error messages mapping
const errorMessages = {
  [ErrorTypes.NETWORK]: 'Network connection error. Please check your internet connection.',
  [ErrorTypes.AUTHENTICATION]: 'Authentication failed. Please sign in again.',
  [ErrorTypes.VALIDATION]: 'Please check your input and try again.',
  [ErrorTypes.PERMISSION]: 'You don\'t have permission to perform this action.',
  [ErrorTypes.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorTypes.SERVER]: 'Server error. Please try again later.',
  [ErrorTypes.UNKNOWN]: 'An unexpected error occurred. Please try again.'
};

// Categorize error based on error object
export const categorizeError = (error) => {
  if (!error) return ErrorTypes.UNKNOWN;
  
  const errorMessage = error.message?.toLowerCase() || '';
  const errorCode = error.code?.toLowerCase() || '';
  
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return ErrorTypes.NETWORK;
  }
  
  if (errorCode.includes('auth') || errorMessage.includes('auth')) {
    return ErrorTypes.AUTHENTICATION;
  }
  
  if (errorCode.includes('permission') || errorMessage.includes('permission')) {
    return ErrorTypes.PERMISSION;
  }
  
  if (errorCode.includes('not-found') || errorMessage.includes('not found')) {
    return ErrorTypes.NOT_FOUND;
  }
  
  if (errorCode.includes('validation') || errorMessage.includes('validation')) {
    return ErrorTypes.VALIDATION;
  }
  
  return ErrorTypes.UNKNOWN;
};

// Main error handler function
export const handleError = (error, context = '') => {
  const errorType = categorizeError(error);
  const message = errorMessages[errorType];
  
  // Log error for debugging
  console.error(`Error in ${context}:`, error);
  
  // Show user-friendly toast message
  toast.error(message);
  
  // Return error type for further handling if needed
  return errorType;
};

// Async wrapper for error handling
export const withErrorHandling = async (asyncFunction, context = '') => {
  try {
    return await asyncFunction();
  } catch (error) {
    handleError(error, context);
    throw error;
  }
};

// Validation error handler
export const handleValidationError = (errors) => {
  if (typeof errors === 'string') {
    toast.error(errors);
    return;
  }
  
  if (Array.isArray(errors)) {
    errors.forEach(error => toast.error(error));
    return;
  }
  
  if (typeof errors === 'object') {
    Object.values(errors).forEach(error => {
      if (error) toast.error(error);
    });
    return;
  }
  
  toast.error('Please check your input and try again.');
};

// Success message handler
export const showSuccess = (message) => {
  toast.success(message);
};

// Info message handler
export const showInfo = (message) => {
  toast(message, {
    icon: 'ℹ️',
  });
};
