import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  restaurant = {
    "name": '',
    "style": '',
    "description": ''
  }
  errors = {};

  constructor(private _restaurantService: RestaurantService, private _router: Router) { }

  ngOnInit() {
  }
  create(){
    let observable = this._restaurantService.createRestaurant(this.restaurant);
    observable.subscribe(data => {
      console.log(data);
      if (data['status'] == 'failed'){
        this.errors = data['errors']['errors'];
      }else{
        this._router.navigate(['/']);
      }
    })
  }

}
