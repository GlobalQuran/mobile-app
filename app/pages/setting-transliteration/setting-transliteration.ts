import {Page, NavController} from 'ionic-angular';
import {gq} from "../../GlobalQuran/gq";


@Page({
    templateUrl: 'build/pages/setting-transliteration/setting-transliteration.html'
})
export class SettingTransliterationPage
{
    transliterationList = [];

    constructor(nav: NavController, public gq: gq)
    {
        this.gq
            .getTransliterationList()
            .subscribe(data => this.transliterationList.push(data));
    }
}