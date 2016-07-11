import {Page, NavController} from 'ionic-angular';
import {GlobalQuran} from "../../providers/GlobalQuran/GQ";
import {SettingTranslationPage} from "../setting-translation/setting-translation";
import {SettingTransliterationPage} from "../setting-transliteration/setting-transliteration";


@Page({
    templateUrl: 'build/pages/setting/setting.html'
})
export class SettingPage {

    tab1;
    tab2;


    //private _pageByPage: boolean;
    //
    //set pageByPage(value:boolean) {
    //    this._pageByPage = value;
    //
    //    localStorage.setItem('_view', value ? 'pageByPage' : 'ayahByAyah');
    //}

    //get pageByPage():boolean {
    //    return this._pageByPage;
    //}

    constructor(private nav:NavController, public globalQuran: GlobalQuran)
    {
        this.tab1 = SettingTranslationPage;
        this.tab2 = SettingTransliterationPage;

        //let _view = localStorage.getItem('_view');
        //this._pageByPage = (_view == 'pageByPage');
    }
}
