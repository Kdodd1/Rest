import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SingleComponent } from './single/single.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'newrestaurant', component: CreateComponent},
  { path: 'edit/:id', component: EditComponent },
  { path: 'restaurant/:id', component: SingleComponent},
  { path: 'review/:id', component: ReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
