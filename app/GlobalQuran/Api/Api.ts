import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

let baseURL = 'http://api.globalquran.com'

@Injectable()
export class Api {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http: Http) {
        this.http = http;
    }

    getAll(surahNo: number, quranBy?: string) {
        let url = baseURL + '/all/surah/' + surahNo + ((quranBy) ? '/' + quranBy : '');
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getList() {
        let url = baseURL + '/quran';
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getSurahContent(surah: number, quranById: string) {
        let url = baseURL + '/surah/' + surah + '/' + quranById;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getPageContent(page: number, quranById: string) {
        let url = baseURL + '/page/' + page + '/' + quranById;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
