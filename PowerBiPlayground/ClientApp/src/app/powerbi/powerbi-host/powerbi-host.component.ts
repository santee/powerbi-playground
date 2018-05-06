import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, Input } from '@angular/core';
import { PowerbiService } from '../powerbi-service.service';
import { IEmbedConfiguration, Embed } from 'embed';
import { models } from 'powerbi-client';
import { EmbedConfig } from '../embed-config';

@Component({
  selector: 'app-powerbi-host',
  templateUrl: './powerbi-host.component.html',
  styleUrls: ['./powerbi-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerbiHostComponent implements OnInit {

  @ViewChild('powerbihost')
  private host: ElementRef;

  private embedConfig: EmbedConfig;

  @Input()
  public set config(value: EmbedConfig) {
    this.embedConfig = value;

    if (!value) {
      return;
    }

    this.render();
  }

  public get config() {
    return this.embedConfig;
  }

  constructor(private powerbi: PowerbiService) { }

  public ngOnInit() {
  }

  public render() {

    const config: IEmbedConfiguration = {
      type: 'report',
      tokenType: models.TokenType.Embed,
      accessToken: this.config.token,
      embedUrl: this.config.embedUrl,
      id: this.config.reportId,
      permissions: models.Permissions.All,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true
      }
    };

    this.powerbi.get().embed(this.host.nativeElement, config);
  }
}
