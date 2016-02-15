import {Injectable, Injector} from 'angular2/core';

import {Api} from './Api/Api';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable'

declare let Quran:any;


@Injectable()
export class gq {

    /**
     * This is observable data service https://coryrylan.com/blog/angular-2-observable-data-services
     */
    private _: {

        observer: {
            surah: any,
            quran: any,
            translation: any,
            translationLanguage: any,
            transliteration: any,
            recitor: any
            content: any;
        },

        observable: {
            surah$: Observable<any>,
            quran$: Observable<any>,
            translation$: Observable<any>,
            translationLanguage$: Observable<any>,
            transliteration$: Observable<any>,
            recitor$: Observable<any>,
            content$: Observable<any>,
        }
    };


    private _dataStore = {

        selected: {
            surah: {no: 0}, // surah detail has more then no (number)
            ayah: 0,
            quran: [],
            translation: [],
            translationLanguage: [],
            transliteration: [],
            recitor: []
        },

        list: {
            surah: [],
            quran: [],
            translation: [],
            translationLanguage: [],
            transliteration: [],
            recitor: [],
            language: [],
            countryLanguages: [],
        },

        content: [],

        dataBySurah: []
    };


    constructor(private api: Api)
    {
        this._ = {

            // just to define object here, else it will give error
            observer: {
                surah: '',
                quran: '',
                translation: '',
                translationLanguage: '',
                transliteration: '',
                recitor: '',
                content: ''
            },

            // observables
            observable: {
                surah$:                 new Observable(observer => this._.observer.surah = observer).share(),
                quran$:                 new Observable(observer => this._.observer.quran = observer).share(),
                translation$:           new Observable(observer => this._.observer.translation = observer).share(),
                translationLanguage$:   new Observable(observer => this._.observer.translationLanguage = observer).share(),
                transliteration$:       new Observable(observer => this._.observer.transliteration = observer).share(),
                recitor$:               new Observable(observer => this._.observer.recitor = observer).share(),
                content$:               new Observable(observer => this._.observer.content = observer).share(),
            }
        };
    }

    /**
     * listen to asked obversvables with .subscribe(data => this.data = data);
     *
     * @param to you can pass list.surah, list.quran, list.translation, list.transliteration and content (for selected surah)
     * @returns {Observable<any>}
     */
    listen (to)
    {
        switch (to)
        {
            case 'list.surah':
                return this._.observable.surah$;
            case 'list.quran':
                return this._.observable.quran$;
            case 'list.translation':
                return this._.observable.translation$;
            case 'list.translationLanguage':
                return this._.observable.translationLanguage$;
            case 'list.transliteration':
                return this._.observable.transliteration$;
            case 'list.recitor':
                return this._.observable.recitor$;
            case 'content':
                return this._.observable.content$;
        }
    }

    /**
     * trigger observer change, this will only trigger if any subscriber has been assigned
     *
     * @param to
     * @private
     */
    _trggerChange (to)
    {
        switch (to)
        {
            case 'list.surah':
                if (this._.observer.surah)
                    this._.observer.surah.next(this._dataStore.list.surah);
            case 'list.quran':
                if (this._.observer.quran)
                    this._.observer.quran.next(this._dataStore.list.quran);
            case 'list.translation':
                if (this._.observer.translation)
                    this._.observer.translation.next(this._dataStore.list.translation);
            case 'list.translationLanguage':
                if (this._.observer.translationLanguage)
                    this._.observer.translationLanguage.next(this._dataStore.list.translationLanguage);
            case 'list.transliteration':
                if (this._.observer.transliteration)
                    this._.observer.transliteration.next(this._dataStore.list.transliteration);
            case 'list.recitor':
                if (this._.observer.recitor)
                    this._.observer.recitor.next(this._dataStore.list.recitor);
            case 'content':
                if (this._.observer.content)
                    this._.observer.content.next(this._dataStore.content);
        }
    }

    /**
     * get all the content in one ajax call - http://docs.globalquran.com/API:Data/Getting_All_With_One_Call
     */
    getAllContent ()
    {
        this.api.getAll(1, 'quran-simple')
            .subscribe(data => this._buildAllContent(data));
    }

    /**
     * Build All content data, including selection
     *
     * @param data
     * @private
     */
    private _buildAllContent (data)
    {
        // selected values
        this._dataStore.selected.surah = this.getSurahDetail(1);
        this._dataStore.selected.ayah  = 1;
        //data.languageSelected

        // populate data in data store object
        this._dataStore.list.language = data.languageList;
        this._dataStore.list.countryLanguages = data.languageCountryList;
        this._dataStore.dataBySurah[1] = data.quran;

        this._buildList(data.quranList);
        this._buildSelectedByQuranData(data.quran);
        this._buildQuranContent(data.quran);
        this.getSurahList(); // build surah list, this also triggers surah observable

        // trigger observables
        // surah observable is skipped here, because it is already trigger on getSurahList above
        this._trggerChange('list.quran');
        this._trggerChange('list.translation');
        this._trggerChange('list.translationLanguage');
        this._trggerChange('list.transliteration');
        this._trggerChange('list.recitor');
        this._trggerChange('content');
    }

    /**
     * check if selected content exist or not
     *
     * @returns {boolean}
     * @private
     */
    private _isSelectedContentExist ()
    {
        if (!this._dataStore.content)
            return false;

        let selected = this._mergeObjects(
            this._dataStore.selected.quran,
            this._dataStore.selected.translation,
            this._dataStore.selected.transliteration);

        let found = [];

        for (let verseNo in this._dataStore.content)
        {
            for (let index in this._dataStore.content[verseNo])
            {
                let quranById = this._dataStore.content[verseNo][index].quranById;

                found[quranById] = quranById;
            }
        }

        return (found.length == selected.length);
    }

    /**
     * merge objects
     *
     * @param obj1
     * @param obj2
     * @param obj3
     * @returns {Object}
     * @private
     */
    private _mergeObjects (obj1, obj2, obj3)
    {
        let merge = [];
        for (let attrname in obj1) { merge[attrname] = obj1[attrname]; }
        for (let attrname in obj2) { merge[attrname] = obj2[attrname]; }
        for (let attrname in obj3) { merge[attrname] = obj3[attrname]; }
        return merge;
    }

    /**
     * auto populate selected values based on quran data
     *
     * @param data
     * @private
     */
    private _buildSelectedByQuranData (data)
    {
        this._dataStore.selected.quran = [];
        this._dataStore.selected.translation = [];
        this._dataStore.selected.translationLanguage = [];
        this._dataStore.selected.transliteration = [];

        for (let quranById in data)
        {
            if (this._dataStore.list.quran[quranById])
                this._dataStore.selected.quran[quranById] = quranById;
            else if (this._dataStore.list.translation[quranById])
            {
                this._dataStore.selected.translation[quranById] = quranById;

                // get translation language code
                let languageCode = this._dataStore.list.translation[quranById].language_code;

                // if not already selected, then select it
                if (!this._dataStore.selected.translationLanguage[languageCode])
                    this._dataStore.selected.translationLanguage[languageCode] = languageCode;
            }
            else if (this._dataStore.list.transliteration[quranById])
                this._dataStore.selected.transliteration[quranById] = quranById;
        }
    }



    /**
     * Build selected surah content
     *
     * @param data
     * @private
     */
    private _buildQuranContent (data)
    {
        let ayahs = []; // merged ayahs
        let quranAyahs = []; // quran only ayahs
        let translationAyahs = []; // translation or transliteration ayahs

        // first build quran ayahs, to keep them on top
        for (let quranById in data)
        {
            // if DONT exist
            if (!this._dataStore.list.quran[quranById])
                continue;

            // if NOT selected, then DON'T build this data
            if (!this._dataStore.selected.quran[quranById])
                continue;

            for (let verseNo in data[quranById])
            {
                let singleAyah = data[quranById][verseNo];
                singleAyah['quranById'] = quranById;

                if (!quranAyahs[verseNo])
                    quranAyahs[verseNo] = [];

                quranAyahs[verseNo].push(singleAyah);
            }
        }

        // second build all the translation or transliteration ayahs
        for (let quranById in data)
        {
            // if exist
            if (this._dataStore.list.quran[quranById])
                continue;

            // if NOT selected, then DON'T build this data
            if (!this._dataStore.selected.translation[quranById] && !this._dataStore.selected.transliteration[quranById])
                continue;

            for (let verseNo in data[quranById])
            {
                let singleAyah = data[quranById][verseNo];
                singleAyah['quranById'] = quranById;

                if (!translationAyahs[verseNo])
                    translationAyahs[verseNo] = [];

                translationAyahs[verseNo].push(singleAyah);
            }
        }

        // merge both ayahs
        if (translationAyahs.length > 1)
        {
            for (let verseNo in quranAyahs)
            {
                ayahs[verseNo] = quranAyahs[verseNo].concat(translationAyahs[verseNo]);
            }
        }
        else
            ayahs = quranAyahs;

        this._dataStore.content = ayahs;
    }

    /**
     * Get content of the surah
     *
     * @param surah
     */
    getContent (surah)
    {
        if (this._dataStore.dataBySurah[surah])
            this._buildQuranContent(this._dataStore.dataBySurah[surah]);

        // if data does not exist or if content does not match with selected items
        if (!this._dataStore.dataBySurah[surah] || !this._isSelectedContentExist())
        {
            this.api.getSurahContent(surah, 'quran-simple')
                .subscribe(data => this._buildQuranContent(data));
        }

        this._trggerChange('content');
    }

    /**
     * Build list
     *
     * @param quranList
     * @private
     */
    private _buildList (quranList)
    {
        this._dataStore.list.quran = [];
        this._dataStore.list.translation = [];
        this._dataStore.list.transliteration = [];
        this._dataStore.list.recitor = [];

        for (let quranById in quranList)
        {
            if (!quranList.hasOwnProperty(quranById))
                continue;

            let obj = quranList[quranById];

            if (obj.type == 'quran' && obj.format == 'text')
            {
                this._dataStore.list.quran[quranById] = obj;
            }
            else if (obj.type == 'translation' && obj.format == 'text')
            {
                this._dataStore.list.translation[quranById] = obj;

                // check if translation language is already added or not
                if (!this._dataStore.list.translationLanguage[obj.language_code])
                {
                    // this is language list, not a object current list
                    this._dataStore.list.translationLanguage[obj.language_code] = this._dataStore.list.language[obj.language_code];
                }

            }
            else if (obj.type == 'transliteration' && obj.format == 'text')
            {
                this._dataStore.list.transliteration[quranById] = obj;
            }
            else if (obj.format == 'audio')
            {
                this._dataStore.list.recitor[quranById] = obj;
            }
        }
    }

    /**
     * get surah details
     * 
     * @param surah
     * @returns {any}
     */
    getSurahDetail (surah)
    {
        return Quran.surah.detail(surah);
    }

    /**
     * load surah list to observable
     */
    getSurahList ()
    {
        if (this._dataStore.list.surah.length != 114)
        {
            let list = [];
            for(let i=1;i<=114;i++)
            {
                list.push(this.getSurahDetail(i));
            }

            this._dataStore.list.surah = list;
        }

        this._trggerChange('list.surah');
    }

    select (surah, ayah)
    {
        this._dataStore.selected.surah = this.getSurahDetail(surah);
        this._dataStore.selected.ayah = ayah;
    }

    /**
     * toggle quran selection
     *
     * @param quranById
     */
    toggleQuran (quranById)
    {
        if (this._dataStore.selected.quran[quranById])
            delete this._dataStore.selected.quran[quranById];
        else
            this._dataStore.selected.quran[quranById] = quranById;

        this.getContent(this._dataStore.selected.surah.no); // < this will trigger observables for content
    }

    /**
     * toggle translation selection
     *
     * @param quranById
     */
    toggleTranslation (quranById)
    {
        if (this._dataStore.selected.translation[quranById])
            delete this._dataStore.selected.translation[quranById];
        else
            this._dataStore.selected.translation[quranById] = quranById;

        this.getContent(this._dataStore.selected.surah.no); // < this will trigger observables for content
    }

    /**
     * toggle transliteration selection
     *
     * @param quranById
     */
    toggleTransliteration (quranById)
    {
        if (this._dataStore.selected.transliteration[quranById])
            delete this._dataStore.selected.transliteration[quranById];
        else
            this._dataStore.selected.transliteration[quranById] = quranById;

        this.getContent(this._dataStore.selected.surah.no); // < this will trigger observables for content
    }
}