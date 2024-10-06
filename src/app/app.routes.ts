import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './components/exchange/exchange.component';

export const routes: Routes = [
  { path: '', component: ExchangeComponent, pathMatch: 'full' },
  { path: 'exchange', component: ExchangeComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
