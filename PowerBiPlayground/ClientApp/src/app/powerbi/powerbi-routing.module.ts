import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PowerbiHostComponent } from "./powerbi-host/powerbi-host.component";

const routes: Routes = [
  { path: 'powerbi', component: PowerbiHostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerbiRoutingModule { }
