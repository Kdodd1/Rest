import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  restaurant: any;
  newReview = {
    "name" : '',
    'rating' : 3,
    "review" : ''
  }

  constructor(private _restaurantService: RestaurantService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.getRestaurant(params['id']);
    });
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
      this.getRestaurant(id);
      this.newReview = {
        'name': '',
        'rating': 3,
        'review': ''
      }
    });

  }
}
