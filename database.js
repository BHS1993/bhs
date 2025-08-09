const mongoose = require('mongoose');

const dbConfig = {
  development: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/school_db',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  production: {
    url: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }
};

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV || 'development';
    const config = dbConfig[env];
    
    await mongoose.connect(config.url, config.options);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
