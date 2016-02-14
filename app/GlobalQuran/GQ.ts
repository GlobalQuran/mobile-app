import {Injectable, Injector} from 'angular2/core';

import {Api} from './Api/Api';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

@Injectable()
export class gq {

    protected api;

    protected data;

    public ayahs;

    constructor(Api: Api)
    {
        this.api = Api;
    }

    getAyahs (surah)
    {
        return this.api.getAyahs(surah, 'quran-simple')
            .map(res => res.json());
            //.subscribe(
            //    data => this.ayahs = data,
            //    err => this.api.logError(err)
            //);
    }
}