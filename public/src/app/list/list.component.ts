import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  restaurants = [];

  constructor(private _restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getAllRestaurants();
  }
  getAllRestaurants(){
    let observable = this._restaurantService.getRestaurants();
    observable.subscribe( data => {
      this.restaurants = data['restaurants'];
      console.log(data);
    });
  }

}
