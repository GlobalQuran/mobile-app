import {Page, NavController} from 'ionic-angular';
import {gq} from "../../GlobalQuran/gq";


@Page({
    templateUrl: 'build/pages/setting/setting.html'
})
export class SettingPage {

    quranListSelected;
    quranList = [];

    translationListSelected;
    translationList = [];

    transliterationListSelected;
    transliterationList = [];

    private _pageByPage: boolean;

    set pageByPage(value:boolean) {
        this._pageByPage = value;

        localStorage.setItem('_view', value ? 'pageByPage' : 'ayahByAyah');
    }

    get pageByPage():boolean {
        return this._pageByPage;
    }

    constructor(private nav:NavController, public gq: gq)
    {
        let _view = localStorage.getItem('_view');
        this._pageByPage = (_view == 'pageByPage');

        this.gq
            .getQuranList()
            .subscribe(data => this.quranList.push(data));

        this.gq
            .getTranslationList()
            .subscribe(data => this.translationList.push(data));

        this.gq
            .getTransliterationList()
            .subscribe(data => this.transliterationList.push(data));
    }

    onQuranChange ()
    {
        this.gq
            .setSelectListQuran(this.quranListSelected);
    }

    onTranslationChange ()
    {
        this.gq
            .setSelectListTranslation(this.translationListSelected);
    }

    onTransliterationChange ()
    {
        this.gq
            .setSelectListTransliteration(this.transliterationListSelected);
    }
}
