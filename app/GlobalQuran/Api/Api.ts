import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http: Http) {

    }

    getAll (surahNo:number, quranBy?:string)
    {
        let ifQuranBy = quranBy ? `/${quranBy}` : '';
        return this.http.get(`http://api.globalquran.com/all/surah/${surahNo}${ifQuranBy}`).map(res => res.json());
    }

    getList ()
    {
        return this.http.get(`http://api.globalquran.com/quran`).map(res => res.json());
    }

    getSurahContent (surah:number, quranById:string)
    {
        return this.http.get(`http://api.globalquran.com/surah/${surah}/${quranById}`).map(res => res.json());
    }

    getPageContent (page:number, quranById:string)
    {
        return this.http.get(`http://api.globalquran.com/page/${page}/${quranById}`).map(res => res.json());
    }
}
