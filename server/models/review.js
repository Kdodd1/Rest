console.log("Inside of review.js");

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [255, "Name is too long"],
    minxlength: [3, "Name must be atleast 3 characters long"]
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    max: 5,
    min: 1
  },
  review: {
    type: String,
    required: [true, "Review is required"],
    minlength: [5, "Reviews must be atleast 5 characters"]
  }
}, {timestamps: true});

mongoose.model('Review', ReviewSchema);
module.exports = ReviewSchema;
