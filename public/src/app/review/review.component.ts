import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  restaurant: any;
  errors = {};
  newReview = {
    "name" : '',
    'rating' : 3,
    "review" : ''
  }

  constructor(private _restaurantService: RestaurantService, private _router: Router, private _route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.getRestaurant(params['id']);
    });
  }
  backClicked() {
   this._location.back();
 }

  getRestaurant(id){
    let observable = this._restaurantService.getOne(id);
    observable.subscribe( data => {
      this.restaurant = data['restaurant'];
      console.log(this.restaurant);
    });
  }
  newRating(id){
    let observable = this._restaurantService.addReview(id, this.newReview);
    observable.subscribe( data => {
      if (data['status']== 'failed'){
        this.errors = data['errors']['errors'];
      }else{
      this.getRestaurant(id);
      this.newReview = {
        'name': '',
        'rating': 3,
        'review': ''
      }
      this.backClicked();
    }
    });

}
}
