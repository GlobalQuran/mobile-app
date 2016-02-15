import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http'

@Injectable()
export class Api {

    constructor(private http: Http) {}

    getAll (surahNo, quranBy)
    {
        return this.http.get(`http://api.globalquran.com/all/surah/${surahNo}/${quranBy}`).map(res => res.json());
    }

    getList ()
    {
        return this.http.get(`http://api.globalquran.com/quran`).map(res => res.json());
    }

    getSurahContent (surah, quranById)
    {
        return this.http.get(`http://api.globalquran.com/surah/${surah}/${quranById}`).map(res => res.json());
    }
}