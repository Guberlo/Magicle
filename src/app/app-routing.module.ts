import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardDetailComponent } from './card-detail/card-detail.component';

const routes: Routes = [
  { path: 'cards', component: CardsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:name', component: CardDetailComponent },
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
