import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodaysMedicationComponent } from './todays-medication/todays-medication.component';
import { MyInventoryComponent } from './my-inventory/my-inventory.component';

const routes: Routes = [
  { path: '', redirectTo: '/todays-medication', pathMatch: 'full' },
  { path: 'todays-medication', component: TodaysMedicationComponent },
  { path: 'my-inventory', component: MyInventoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
