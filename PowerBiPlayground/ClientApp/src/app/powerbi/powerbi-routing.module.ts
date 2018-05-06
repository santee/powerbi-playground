import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PowerbiContainerComponent } from './powerbi-container/powerbi-container.component';

const routes: Routes = [
  { path: 'powerbi', component: PowerbiContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerbiRoutingModule { }
