import { required, dataMember } from 'santee-dcts';
import { Injectable } from '@angular/core';

export class EmbedConfig {
    @dataMember()
    @required()
    public reportId: string;

    @dataMember()
    @required()
    public embedUrl: string;

    @dataMember()
    @required()
    public token: string;
}
