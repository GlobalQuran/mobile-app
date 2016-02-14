import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http'

@Injectable()
export class Api {

    protected http;

    constructor(Http: Http)
    {
        this.http = Http;
    }

    public logError (error)
    {
        console.log(error);
    }

    getAyahs (surah, quranById)
    {
        return this.fetch(`http://api.globalquran.com/surah/${surah}/${quranById}`);
    }


    protected fetch (url)
    {
        return this.http.get(url);
    }
}