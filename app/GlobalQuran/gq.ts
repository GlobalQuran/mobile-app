import {Injectable, Injector} from 'angular2/core';

/*
 import 'rxjs/add/operator/map';
 import 'rxjs/operator/delay';
 import 'rxjs/operator/mergeMap';
 import 'rxjs/operator/switchMap';
 import 'rxjs/add/operator/share';
 import {Observable} from 'rxjs/Observable'
 */
import {Observable} from 'rxjs/Rx';

import {Api} from './Api/Api';
import {surahDetail} from "./interface/surahDetail";


declare let Quran:any;


@Injectable()
export class gq {

    private _dataStore = {

        selected: {
            surah: 0,
            ayah: 0,

            data: {},

            recitor: {}
        },

        list: {
            surah: [],

            quran: [],

            translation: [],
            transliteration: [],
            recitor: [],

            translationLanguage: [],
            language: [],
            countryLanguages: [],
        },

        content: [],

        dataBySurah: []
    };


    constructor(private api:Api) {
        this.loadLocalSorage();
    }

    /**
     * get all the content in one ajax call - http://docs.globalquran.com/API:Data/Getting_All_With_One_Call
     */
    getAllContent() {
        this.api.getAll(1, this.getSelectedDataArray().join('|'))
            .subscribe(data => this._buildAllContent(data));
    }

    /**
     * Build All content data, including selection
     *
     * @param data
     * @private
     */
    private _buildAllContent(data) {
        // selected values
        let surah = 1;
        if (this._dataStore.selected.surah == 0) {
            this._dataStore.selected.surah = surah;
            this._dataStore.selected.ayah = 1;
        }
        //data.languageSelected

        // populate data in data store object
        this._dataStore.list.quran = data.quranList;
        this._dataStore.list.language = data.languageList;
        this._dataStore.list.countryLanguages = data.languageCountryList;

        // build selected list from the quran data
        for (let quranById in data.quran) {
            this._dataStore.selected.data[quranById] = quranById;
        }

        this._dataStore.dataBySurah[surah] = this._rebuildQuranContent(data.quran);
    }


    /**
     * Get content of the surah
     *
     * @param surah
     * @returns {Observable}
     */
    getContent(surah?:number) {
        if (!surah)
            surah = this._dataStore.selected.surah;

        if (!this._isContentExist(surah))

            return this.api.getSurahContent(surah, this.getSelectedDataArray().join('|'))
                .map(data => this._dataStore.dataBySurah[surah] = this._rebuildQuranContent(data.quran))
                .flatMap(data => Observable.fromArray(data))
                .share();

        else
            return Observable.fromArray(this._dataStore.dataBySurah[surah]);
    }

    /**
     * rebuild quran content to ayah by ayah with sorting, this function is to use with .map()
     *
     * Usage:
     *  .map(data => this._rebuildQuranContent(data))
     *
     * @param data
     * @returns {Array}
     * @private
     */
    private _rebuildQuranContent(data) {
        // if coming from ajax, then get data.quran
        if (data && data.quran)
            data = data.quran;

        let ayahs = []; // quran only ayahs

        // first build quran ayahs, to keep them on top
        for (let quranById in data) {
            for (let verseNo in data[quranById]) {
                let singleAyah = data[quranById][verseNo];
                singleAyah['quranById'] = quranById;
                singleAyah['type'] = this.getQuranByDetail(quranById).type;

                let ayah = singleAyah.ayah - 1; // minus 1 because js array add extra, if we skip
                //let ayah = singleAyah.ayah;

                if (!ayahs[ayah])
                    ayahs[ayah] = [];

                ayahs[ayah].push(singleAyah);

                // sort and put Quran text on top and then translation and transliteration
                ayahs[ayah].sort(function (a, b) {
                    return (a.type == 'quran') ? -1 : 1;
                });
            }
        }

        return ayahs;
    }

    /**
     * check if selected content exist or not
     *
     * @returns {boolean}
     * @private
     */
    private _isContentExist(surah:number) {
        if (!this._dataStore.dataBySurah[surah])
            return false;

        let selected = this._dataStore.selected.data;

        let found = [];

        for (let verseNo in this._dataStore.dataBySurah[surah]) {
            for (let index in this._dataStore.dataBySurah[surah][verseNo]) {
                let quranById = this._dataStore.dataBySurah[surah][verseNo][index].quranById;

                found[quranById] = quranById;
            }
        }

        let notFound = 0;

        for (let id in selected) {
            if (!found[id])
                notFound++;
        }

        return !notFound;
    }

    private getSelectedDataArray() {
        if (!this.getSelectedDataCount())
            return ['quran-uthmani'];

        let list = [];

        for (let quranById in this._dataStore.selected.data) {
            list.push(quranById);
        }

        return list;
    }

    private getSelectedDataCount():number {
        if (!this._dataStore.selected.data)
            return 0;

        let count = 0;

        for (let quranById in this._dataStore.selected.data) {
            count++;
        }

        return count;
    }

    /**
     * get surah details
     *
     * @param surah
     * @returns {surahDetail}
     */
    getSurahDetail(surahNo:number):surahDetail {
        return Quran.surah.detail(surahNo);
    }

    /**
     * get starting ayah & surah number from juz number
     *
     * @param juz
     * @returns {any}
     */
    getAyahNumberByJuz(juz:number):{surah:number, ayah:number} {
        return Quran.ayah.fromJuz(juz);
    }

    /**
     * get starting ayah & surah number from page number
     *
     * @param page
     * @returns {any}
     */
    getAyahNumberByPage(page:number):{surah:number, ayah:number} {
        return Quran.ayah.fromPage(page);
    }

    getQuranByDetail(quranBy:string) {
        return this._dataStore.list.quran[quranBy];
    }

    isQuranText(quranBy:string) {
        let detail = this.getQuranByDetail(quranBy).type;
        return (detail.format == 'text' && detail.type == 'quran');
    }

    isTranslationText(quranBy:string) {
        let detail = this.getQuranByDetail(quranBy).type;
        return (detail.format == 'text' && detail.type == 'translation');
    }

    isTransliterationText(quranBy:string) {
        let detail = this.getQuranByDetail(quranBy).type;
        return (detail.format == 'text' && detail.type == 'translation');
    }

    private getQuranByList(type:string, format:string) {
        return new Observable(obverser => {

            let quranList = this._dataStore.list.quran;

            for (let quranById in quranList) {
                let detail = quranList[quranById];
                detail['id'] = quranById;

                if ((!detail.type || detail.type == type) && detail.format == format)
                    obverser.next(detail);
            }

            obverser.complete();
        });
    }

    getQuranList() {
        return this.getQuranByList('quran', 'text');
    }

    getTranslationList() {
        return this.getQuranByList('translation', 'text');
    }

    getTransliterationList() {
        return this.getQuranByList('transliteration', 'text');
    }

    getRecitorList() {
        return this.getQuranByList(null, 'audio');
    }

    getLangaugeList()
    {
        return this._dataStore.list.language;
    }

    getTranslationLanguageList()
    {
        let languageList    = this.getLangaugeList();
        let translationList = this.getTranslationList();

        let checkList = {};
        let newList = [];

        translationList.subscribe(data => {
            let langCode = data['language_code'];

            let language = languageList[langCode];

            language['language_code'] = langCode; // @TODO remove this, once fixed from the api

            if (!language.native_name)
                language.native_name = language.english_name;

            if (language.english_name == 'Divehi')// @TODO remove this line, once fixed the name from api
            {
                language.name = 'Divehi';
                language.native_name = 'Divehi';
            }

            if (!checkList[langCode])
                newList.push(language);

            checkList[langCode] = true;
        });


        return newList;
    }

    getTranslationListByLanguage (languageCode)
    {
        let translationList = this.getTranslationList();

        let filteredList = [];

        translationList.subscribe(data => {

            if (data['language_code'] == languageCode)
                filteredList.push(data);
        });

        return filteredList;
    }

    /**
     * load surah list to observable
     *
     * @returns {Observable}
     */
    getSurahList()
    {
        let surahs = [];
        for (let i = 1; i <= 114; i++) {
            surahs.push(this.getSurahDetail(i));
        }

        return Observable.fromArray(surahs);
    }

    selectSurah (surah, ayah)
    {
        this._dataStore.selected.surah = surah;
        this._dataStore.selected.ayah = ayah;

        this.saveLocalStorage();

        return this;
    }

    /**
     * check if its data is selected or not
     *
     * @param quranById
     * @returns {boolean}
     */
    isSelected (quranById:string)
    {
        return (this._dataStore.selected.data[quranById]) ? true : false;
    }

    /**
     * toggle data selection
     *
     * @param quranById
     */
    toggleSelect (quranById:string)
    {
        if (this.isSelected(quranById))
            delete this._dataStore.selected.data[quranById];
        else
            this._dataStore.selected.data[quranById] = quranById;

        this.saveLocalStorage();
    }

    getSelectedData ()
    {
        return this._dataStore.selected.data;
    }

    /**
     * if no type is provided, then complete previous selected list will be empty and replaced by new
     *
     * @param quranByIds
     * @param type quran|translation|transletiration
     * @param format text|audio
     */
    private setSelectListData (quranByIds: Array<any>, type?:string)
    {
        if (!type)
        {
            let list = {};

            this._dataStore.selected.data = {};
            quranByIds.forEach((x,y) => list[x] = x);

            this._dataStore.selected.data = list;
        }
        else
        {

            let list = this._dataStore.selected.data;

            // first remove same type from the selected list
            for (let quranById in list)
            {
                let detail = this.getQuranByDetail(quranById);

                if ((!detail.type || detail.type == type))
                    delete list[quranById];
            }

            // then add selected
            quranByIds.forEach((x,y) => {
                list[x] = x;
            });

            this._dataStore.selected.data = list;
        }

        this.saveLocalStorage();
    }

    /**
     * select quran list
     *
     * @param quranByIds
     */
    setSelectListQuran (quranByIds: Array<any>)
    {
        this.setSelectListData(quranByIds, 'quran');
    }

    /**
     * select translation list
     *
     * @param quranByIds
     */
    setSelectListTranslation (quranByIds: Array<any>)
    {
        this.setSelectListData(quranByIds, 'translation');
    }

    /**
     * select transliteration list
     *
     * @param quranByIds
     */
    setSelectListTransliteration (quranByIds: Array<any>)
    {
        this.setSelectListData(quranByIds, 'transliteration');
    }

    /**
     * select recitor list
     *
     * @param quranByIds
     */
    setSelectListRecitor (quranByIds: Array<any>)
    {
        //TODO dont use same function, store in _datastore.selected.recitor and not in data
        //this.setSelectListData(quranByIds, null, 'audio');
    }


    /**
     * save local storage data
     */
    saveLocalStorage ()
    {
        localStorage.setItem('_selected', JSON.stringify(this._dataStore.selected));
    }

    /**
     * load local storage data
     */
    loadLocalSorage ()
    {
        let selected = localStorage.getItem('_selected');

        if (selected)
            this._dataStore.selected = JSON.parse(selected);
    }

    /**
     * useful to reset local storage
     */
    clearLocalStorage ()
    {
        localStorage.clear();
    }
}