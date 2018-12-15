import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  restaurant = {};
  errors = {};

  constructor(private _restaurantService: RestaurantService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getRestaurant(params['id']);
    })
  }

  getRestaurant(id){
    let observable = this._restaurantService.getOne(id);
    observable.subscribe( data => {
      this.restaurant = data['restaurant']
    })
  }

  update(id){
    let observable = this._restaurantService.updateOne(id, this.restaurant);
    observable.subscribe( data => {
      if (data['status']== 'failed'){
        this.errors = data['errors']['errors'];
      }else{
        this._router.navigate(['/']);
      }
    })

  }
  delete(id){
    let observable = this._restaurantService.deleteOne(id);
    observable.subscribe( data => {
        this._router.navigate(['/']);
    })
  }

}
