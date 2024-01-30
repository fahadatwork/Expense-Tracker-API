const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
 token: {
    type: String,
    required: true,
    unique: true,
 },
 user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
 },
 expiry: {
    type: Date,
    required: true,
  },
});

tokenSchema.pre('save', function(next) {
    this.expiry = new Date();
    this.expiry.setHours(this.expiry.getHours() + 3); // token expires in 3 hours
    next();
  });

tokenSchema.index({ expiry: 1 }, { expireAfterSeconds: 3 * 60 * 60 });

module.exports = mongoose.model('Token', tokenSchema);