/**
 * Database utility functions for Recipe Management System
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * @param {string} connectionString - MongoDB connection string
 * @returns {Promise} - Connection promise
 */
const connectDB = async (connectionString) => {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    const conn = await mongoose.connect(connectionString, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during MongoDB shutdown:', error);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

/**
 * Close database connection
 * @returns {Promise} - Close connection promise
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
    throw error;
  }
};

/**
 * Check database connection status
 * @returns {boolean} - Connection status
 */
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Get database connection state
 * @returns {string} - Connection state description
 */
const getConnectionState = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[mongoose.connection.readyState] || 'unknown';
};

/**
 * Drop database (use with caution - for testing only)
 * @returns {Promise} - Drop database promise
 */
const dropDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot drop database in production environment');
  }
  
  try {
    await mongoose.connection.db.dropDatabase();
    console.log('🗑️ Database dropped successfully');
  } catch (error) {
    console.error('❌ Error dropping database:', error);
    throw error;
  }
};

/**
 * Clear all collections (use with caution - for testing only)
 * @returns {Promise} - Clear collections promise
 */
const clearCollections = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot clear collections in production environment');
  }

  try {
    const collections = mongoose.connection.collections;
    
    const clearPromises = Object.values(collections).map(collection => 
      collection.deleteMany({})
    );
    
    await Promise.all(clearPromises);
    console.log('🧹 All collections cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing collections:', error);
    throw error;
  }
};

/**
 * Create database indexes
 * @returns {Promise} - Create indexes promise
 */
const createIndexes = async () => {
  try {
    // Import models to ensure indexes are created
    require('../models/User');
    require('../models/Recipe');

    // Ensure indexes are created
    await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.db.collection('users').createIndex({ username: 1 }, { unique: true });
    await mongoose.connection.db.collection('recipes').createIndex({ 
      title: 'text', 
      description: 'text', 
      tags: 'text' 
    });
    await mongoose.connection.db.collection('recipes').createIndex({ author: 1 });
    await mongoose.connection.db.collection('recipes').createIndex({ category: 1 });
    await mongoose.connection.db.collection('recipes').createIndex({ createdAt: -1 });
    await mongoose.connection.db.collection('recipes').createIndex({ 
      isPublic: 1, 
      isActive: 1 
    });

    console.log('📊 Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    throw error;
  }
};

/**
 * Get database statistics
 * @returns {Promise<Object>} - Database statistics
 */
const getDatabaseStats = async () => {
  try {
    const User = require('../models/User');
    const Recipe = require('../models/Recipe');

    const [
      userCount,
      recipeCount,
      publicRecipeCount,
      activeUserCount
    ] = await Promise.all([
      User.countDocuments({}),
      Recipe.countDocuments({ isActive: true }),
      Recipe.countDocuments({ isActive: true, isPublic: true }),
      User.countDocuments({ isActive: true })
    ]);

    const dbStats = await mongoose.connection.db.stats();

    return {
      users: {
        total: userCount,
        active: activeUserCount
      },
      recipes: {
        total: recipeCount,
        public: publicRecipeCount,
        private: recipeCount - publicRecipeCount
      },
      database: {
        name: mongoose.connection.name,
        collections: dbStats.collections,
        dataSize: dbStats.dataSize,
        storageSize: dbStats.storageSize,
        indexes: dbStats.indexes,
        indexSize: dbStats.indexSize
      },
      connection: {
        state: getConnectionState(),
        host: mongoose.connection.host,
        port: mongoose.connection.port
      }
    };
  } catch (error) {
    console.error('❌ Error getting database statistics:', error);
    throw error;
  }
};

/**
 * Validate MongoDB ObjectId
 * @param {string} id - ID to validate
 * @returns {boolean} - Whether ID is valid
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Convert string to ObjectId
 * @param {string} id - String ID to convert
 * @returns {ObjectId} - MongoDB ObjectId
 */
const toObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = {
  connectDB,
  disconnectDB,
  isConnected,
  getConnectionState,
  dropDatabase,
  clearCollections,
  createIndexes,
  getDatabaseStats,
  isValidObjectId,
  toObjectId
};