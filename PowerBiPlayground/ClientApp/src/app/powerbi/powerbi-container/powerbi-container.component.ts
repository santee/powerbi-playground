import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmbedConfig } from '../embed-config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { deserialize } from 'santee-dcts';

@Component({
  selector: 'app-powerbi-container',
  templateUrl: './powerbi-container.component.html',
  styleUrls: ['./powerbi-container.component.scss']
})
export class PowerbiContainerComponent implements OnInit {

  private embedConfig$: Observable<EmbedConfig>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.embedConfig$ = this.http.get('api/powerbi/token').map(x => deserialize(x, EmbedConfig));
  }

}
