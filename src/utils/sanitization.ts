/**
 * Security utilities for input sanitization and validation
 */

// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (Norwegian format)
export const PHONE_REGEX = /^[\+]?[0-9\s\-\(\)]{8,15}$/;

// Organization number validation (Norwegian format)
export const ORG_NUMBER_REGEX = /^[0-9]{9}$/;

/**
 * Sanitize string input to prevent XSS attacks
 */
export const sanitizeString = (input: string, maxLength: number = 255): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"&]/g, ''); // Remove potentially dangerous characters
};

/**
 * Sanitize email input
 */
export const sanitizeEmail = (email: string): string => {
  const sanitized = sanitizeString(email, 100).toLowerCase();
  return EMAIL_REGEX.test(sanitized) ? sanitized : '';
};

/**
 * Sanitize phone number
 */
export const sanitizePhone = (phone: string): string => {
  const sanitized = sanitizeString(phone, 20).replace(/[^\d\+\-\s\(\)]/g, '');
  return PHONE_REGEX.test(sanitized) ? sanitized : '';
};

/**
 * Sanitize organization number
 */
export const sanitizeOrgNumber = (orgNumber: string): string => {
  const sanitized = sanitizeString(orgNumber, 20).replace(/[^\d]/g, '');
  return ORG_NUMBER_REGEX.test(sanitized) ? sanitized : '';
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
};

/**
 * Sanitize search term for database queries
 */
export const sanitizeSearchTerm = (term: string): string => {
  if (!term || typeof term !== 'string') return '';
  
  return term
    .trim()
    .toLowerCase()
    .slice(0, 100)
    .replace(/[%_\\]/g, '\\$&'); // Escape SQL wildcards
};