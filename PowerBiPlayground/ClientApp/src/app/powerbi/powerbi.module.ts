import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerbiRoutingModule } from './powerbi-routing.module';
import { PowerbiHostComponent } from './powerbi-host/powerbi-host.component';

@NgModule({
  imports: [
    CommonModule,
    PowerbiRoutingModule
  ],
  declarations: [PowerbiHostComponent]
})
export class PowerbiModule { }
