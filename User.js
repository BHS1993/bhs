const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50],
      is: /^[a-zA-Z0-9_]+$/
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher', 'student', 'parent'),
    allowNull: false,
    defaultValue: 'student'
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      is: /^[0-9+\-\s()]+$/
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPhoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  passwordResetToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  emailVerificationToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  emailVerificationExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true
  },
  preferences: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  }
}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['username']
    },
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['role']
    },
    {
      fields: ['isActive']
    },
    {
      fields: ['createdAt']
    }
  ],
  hooks: {
    beforeCreate: (user) => {
      // Ensure username is lowercase
      if (user.username) {
        user.username = user.username.toLowerCase();
      }
      // Ensure email is lowercase
      if (user.email) {
        user.email = user.email.toLowerCase();
      }
    },
    beforeUpdate: (user) => {
      // Ensure username is lowercase
      if (user.changed('username') && user.username) {
        user.username = user.username.toLowerCase();
      }
      // Ensure email is lowercase
      if (user.changed('email') && user.email) {
        user.email = user.email.toLowerCase();
      }
    }
  }
});

// Instance methods
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  delete values.refreshToken;
  delete values.passwordResetToken;
  delete values.emailVerificationToken;
  return values;
};

User.prototype.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

User.prototype.incLoginAttempts = async function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.update({
      $inc: { loginAttempts: 1 },
      lockUntil: null
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts
  if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  }
  
  return await this.update(updates);
};

User.prototype.resetLoginAttempts = async function() {
  return await this.update({
    loginAttempts: 0,
    lockUntil: null
  });
};

// Class methods
User.findByUsernameOrEmail = function(identifier) {
  return this.findOne({
    where: {
      [sequelize.Op.or]: [
        { username: identifier.toLowerCase() },
        { email: identifier.toLowerCase() }
      ]
    }
  });
};

User.findActiveUsers = function() {
  return this.findAll({
    where: { isActive: true },
    order: [['createdAt', 'DESC']]
  });
};

User.findByRole = function(role) {
  return this.findAll({
    where: { role, isActive: true },
    order: [['fullName', 'ASC']]
  });
};

User.getStatistics = async function() {
  const stats = await this.findAll({
    attributes: [
      'role',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      [sequelize.fn('COUNT', sequelize.literal('CASE WHEN isActive = 1 THEN 1 END')), 'activeCount']
    ],
    group: ['role']
  });

  return stats.reduce((acc, stat) => {
    acc[stat.role] = {
      total: parseInt(stat.getDataValue('count')),
      active: parseInt(stat.getDataValue('activeCount'))
    };
    return acc;
  }, {});
};

module.exports = { User };
