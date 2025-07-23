/**
 * Helper utility functions for Recipe Management System
 */

/**
 * Format time duration from minutes to human readable format
 * @param {number} minutes - Duration in minutes
 * @returns {string} - Formatted duration string
 */
const formatDuration = (minutes) => {
  if (!minutes || minutes <= 0) return 'Not specified';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${mins}m`;
  }
};

/**
 * Calculate total cooking time
 * @param {number} prepTime - Preparation time in minutes
 * @param {number} cookTime - Cooking time in minutes
 * @returns {number} - Total time in minutes
 */
const calculateTotalTime = (prepTime = 0, cookTime = 0) => {
  return (prepTime || 0) + (cookTime || 0);
};

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Generate slug from text
 * @param {string} text - Text to convert to slug
 * @returns {string} - URL-friendly slug
 */
const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} - Capitalized text
 */
const capitalize = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add when truncated
 * @returns {string} - Truncated text
 */
const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - suffix.length).trim() + suffix;
};

/**
 * Extract unique tags from array and clean them
 * @param {Array} tags - Array of tags
 * @returns {Array} - Clean unique tags
 */
const cleanTags = (tags) => {
  if (!Array.isArray(tags)) return [];
  
  return [...new Set(
    tags
      .map(tag => 
        tag
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
      )
      .filter(tag => tag.length > 0 && tag.length <= 30)
  )];
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate random string
 * @param {number} length - Length of random string
 * @returns {string} - Random string
 */
const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Remove empty values from object
 * @param {Object} obj - Object to clean
 * @returns {Object} - Cleaned object
 */
const removeEmptyValues = (obj) => {
  const cleaned = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          cleaned[key] = value;
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          const cleanedNested = removeEmptyValues(value);
          if (Object.keys(cleanedNested).length > 0) {
            cleaned[key] = cleanedNested;
          }
        } else if (typeof value !== 'object') {
          cleaned[key] = value;
        }
      }
    }
  }
  
  return cleaned;
};

/**
 * Format date to readable string
 * @param {Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} - Formatted date string
 */
const formatDate = (date, format = 'short') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString();
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    case 'relative':
      return getRelativeTime(dateObj);
    default:
      return dateObj.toLocaleDateString();
  }
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date} date - Date to compare
 * @returns {string} - Relative time string
 */
const getRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
};

/**
 * Paginate array
 * @param {Array} array - Array to paginate
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @returns {Object} - Paginated result
 */
const paginateArray = (array, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const paginatedItems = array.slice(offset, offset + limit);
  const totalPages = Math.ceil(array.length / limit);
  
  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total: array.length,
      pages: totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with score and feedback
 */
const validatePasswordStrength = (password) => {
  if (!password) {
    return {
      isValid: false,
      score: 0,
      feedback: ['Password is required']
    };
  }
  
  const feedback = [];
  let score = 0;
  
  // Length check
  if (password.length < 6) {
    feedback.push('Password must be at least 6 characters long');
  } else if (password.length >= 8) {
    score += 1;
  }
  
  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }
  
  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }
  
  // Number check
  if (!/\d/.test(password)) {
    feedback.push('Password must contain at least one number');
  } else {
    score += 1;
  }
  
  // Special character check
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Consider adding special characters for stronger security');
  } else {
    score += 1;
  }
  
  return {
    isValid: feedback.length === 0,
    score,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
    feedback
  };
};

module.exports = {
  formatDuration,
  calculateTotalTime,
  formatFileSize,
  generateSlug,
  capitalize,
  truncateText,
  cleanTags,
  isValidEmail,
  generateRandomString,
  deepClone,
  removeEmptyValues,
  formatDate,
  getRelativeTime,
  paginateArray,
  validatePasswordStrength
};