import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './components/exchange/exchange.component';

export const routes: Routes = [
  { path: 'exchange', component: ExchangeComponent },
   { path: '', redirectTo: '/exchange', pathMatch: 'full' },
  { path: '**', redirectTo: '/exchange' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
