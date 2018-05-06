import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerbiRoutingModule } from './powerbi-routing.module';
import { PowerbiHostComponent } from './powerbi-host/powerbi-host.component';
import { PowerbiService } from '../powerbi/powerbi-service.service';
import { PowerbiContainerComponent } from '../powerbi/powerbi-container/powerbi-container.component';

@NgModule({
  imports: [
    CommonModule,
    PowerbiRoutingModule
  ],
  declarations: [PowerbiHostComponent, PowerbiContainerComponent],
  providers: [PowerbiService]
})
export class PowerbiModule { }
