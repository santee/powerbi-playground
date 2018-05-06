import { Injectable } from '@angular/core';
import { service, factories } from 'powerbi-client';

@Injectable()
export class PowerbiService {

  private instance: service.Service;

  public get = () => this.instance;

  constructor() {
    this.instance = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);
   }
}
