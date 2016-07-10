import {Page, NavController} from 'ionic-angular';
import {GlobalQuran} from "../../providers/GlobalQuran/GQ";


@Page({
    templateUrl: 'build/pages/setting-transliteration/setting-transliteration.html'
})
export class SettingTransliterationPage
{
    transliterationList = [];

    constructor(nav: NavController, public globalQuran: GlobalQuran)
    {
        this.globalQuran
            .getTransliterationList()
            .subscribe(data => this.transliterationList.push(data));
    }
}
