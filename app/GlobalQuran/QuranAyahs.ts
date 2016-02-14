import {Injectable, Injector} from 'angular2/core';

import {Ayah} from './Ayah';

interface quranData {
    quranBy;
}

@Injectable()
export class QuranAyahs {

    ayahs: Array<Ayah>;

    constructor()
    {
       //.... to be continue
    }
}