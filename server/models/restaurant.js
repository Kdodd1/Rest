console.log("inside of rest.js");

const mongoose = require("mongoose");
const ReviewSchema = require("./review.js");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Restaurants must have a name"],
    minxlength: [3, "Name must be atleast 3 characters long"],
    maxlength: 255,
    validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ name: value })
                .exec(function(err, user){
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self.id === user.id) {
                            return isValid(true);
                        }
                        return isValid(false);
                    }
                    else{
                        return isValid(true);
                    }

                })
            },
            message:  'This restaurant is already taken!'
          }

  },
  style: {
    type: String,
    required: [true, "There must be a style"],
    minlength: [5, "Location must be atleast 5 characters"],
    maxlength: 255
  },
  description: {
    type: String,
    required: [true, "You need a description for the restarants"],
    minlength: [5, "Description must be atleast 5 characters"]
  },
  reviews: [ReviewSchema],
  avgreview: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

mongoose.model('Restaurant', RestaurantSchema);
