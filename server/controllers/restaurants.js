console.log("inside of foodtrucks.js");

const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

class Restaurants {
  getAll(req, res){
    Restaurant.find({}).sort({'avgreview' : -1}).exec( function(err, restaurants){
      if(err){
        res.json({"status": "failed", "errors": err});
      }else{
        res.json({"status": "success", "restaurants": restaurants});
      }
    });
  }

  getId(req, res){
    Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
      if(err){
        res.json({"status": "failed", "errors": err});
      }else{
        res.json({"status": "success", "restaurant": restaurant});
      }
    });
  }

  create(req, res){
    let restaurant = new Restaurant(req.body);
    restaurant.save(function(err){
      if(err){
        res.json({"status": "failed", "errors": err});
      }else{
        res.json({"status": "ok"});
      }
    });
  }
  update(req, res){
    Restaurant.findOneAndUpdate({_id: req.params.id}, req.body,
    {runValidators: true}, function(err){
      if(err){
        res.json({"status": "failed", "errors": err});
      }else{
        res.json({"status": "success"});
      }
    });
  }
  delete(req, res){
    Restaurant.remove({_id: req.params.id}, function(err){
      if(err){
        res.json({"status": "failed", "errors": err});
      }else{
        res.json({"status": "deleted"});
      }
    });
  }
}

module.exports = new Restaurants();
