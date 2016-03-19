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

    constructor(private nav:NavController, public gq: gq)
    {
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
