
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true,
    min: 1
  },
  raised: {
    type: Number,
    default: 0
  },
  backers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  endDate: {
    type: Date,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  rewards: [{
    title: String,
    description: String,
    amount: Number,
    items: [String]
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for days left calculation
projectSchema.virtual('daysLeft').get(function() {
  const today = new Date();
  const timeDiff = this.endDate.getTime() - today.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
});

// Virtual field for percentage funded
projectSchema.virtual('percentFunded').get(function() {
  return Math.min(100, Math.round((this.raised / this.goal) * 100));
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
