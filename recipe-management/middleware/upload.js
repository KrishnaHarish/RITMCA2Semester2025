const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AppError } = require('./errorHandler');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Storage configuration for multer
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp and random string
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = `recipe-${uniqueSuffix}${extension}`;
    cb(null, filename);
  }
});

/**
 * File filter function to validate uploaded files
 * @param {Object} req - Express request object
 * @param {Object} file - Multer file object
 * @param {Function} cb - Callback function
 */
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    // Allowed image types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Only JPEG, PNG, GIF, and WebP images are allowed', 400), false);
    }
  } else {
    cb(new AppError('Only image files are allowed', 400), false);
  }
};

/**
 * Multer configuration
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 1 // Only allow one file at a time
  }
});

/**
 * Middleware for single image upload
 */
const uploadSingle = upload.single('image');

/**
 * Middleware for multiple image uploads (for future use)
 */
const uploadMultiple = upload.array('images', 5);

/**
 * Enhanced upload middleware with error handling
 * @param {string} fieldName - Name of the file field
 * @returns {Function} - Middleware function
 */
const uploadWithErrorHandling = (fieldName = 'image') => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);
    
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle multer-specific errors
        switch (err.code) {
          case 'LIMIT_FILE_SIZE':
            return next(new AppError('File size too large. Maximum size is 5MB.', 400));
          case 'LIMIT_FILE_COUNT':
            return next(new AppError('Too many files. Only one file is allowed.', 400));
          case 'LIMIT_UNEXPECTED_FILE':
            return next(new AppError(`Unexpected file field. Expected field name: ${fieldName}`, 400));
          default:
            return next(new AppError('File upload error: ' + err.message, 400));
        }
      } else if (err) {
        // Handle custom errors from fileFilter
        return next(err);
      }
      
      // File upload successful or no file uploaded
      next();
    });
  };
};

/**
 * Middleware to validate uploaded file
 * @param {boolean} required - Whether file is required
 * @returns {Function} - Middleware function
 */
const validateUploadedFile = (required = false) => {
  return (req, res, next) => {
    if (required && !req.file) {
      return next(new AppError('Image file is required', 400));
    }
    
    if (req.file) {
      // Add file info to request for easy access
      req.uploadedFile = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };
    }
    
    next();
  };
};

/**
 * Utility function to delete uploaded file
 * @param {string} filename - Name of file to delete
 * @returns {Promise} - Promise that resolves when file is deleted
 */
const deleteUploadedFile = (filename) => {
  return new Promise((resolve, reject) => {
    if (!filename) {
      return resolve();
    }
    
    const filePath = path.join(uploadsDir, filename);
    
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        // ENOENT means file doesn't exist, which is fine
        console.error('Error deleting file:', err);
        return reject(err);
      }
      resolve();
    });
  });
};

/**
 * Middleware to clean up uploaded files on error
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const cleanupOnError = (err, req, res, next) => {
  // If there was an uploaded file and an error occurred, clean it up
  if (req.file) {
    deleteUploadedFile(req.file.filename)
      .catch(deleteErr => {
        console.error('Failed to cleanup uploaded file:', deleteErr);
      });
  }
  
  next(err);
};

/**
 * Get file URL for serving uploaded images
 * @param {string} filename - Name of the uploaded file
 * @returns {string} - URL to access the file
 */
const getFileUrl = (filename) => {
  if (!filename) return null;
  return `/uploads/${filename}`;
};

/**
 * Check if uploaded file exists
 * @param {string} filename - Name of the file to check
 * @returns {boolean} - Whether file exists
 */
const fileExists = (filename) => {
  if (!filename) return false;
  
  const filePath = path.join(uploadsDir, filename);
  return fs.existsSync(filePath);
};

/**
 * Get file stats
 * @param {string} filename - Name of the file
 * @returns {Object|null} - File stats or null if file doesn't exist
 */
const getFileStats = (filename) => {
  if (!filename) return null;
  
  try {
    const filePath = path.join(uploadsDir, filename);
    return fs.statSync(filePath);
  } catch (error) {
    return null;
  }
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadWithErrorHandling,
  validateUploadedFile,
  deleteUploadedFile,
  cleanupOnError,
  getFileUrl,
  fileExists,
  getFileStats,
  uploadsDir
};