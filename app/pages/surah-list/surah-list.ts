import {Page, NavController, NavParams} from 'ionic-angular';
import {gq} from '../../GlobalQuran/gq';

import {SurahDetailPage} from '../surah-detail/surah-detail';
import {SettingPage} from "../setting/setting";


@Page({
    templateUrl: 'build/pages/surah-list/surah-list.html'
})
export class SurahListPage {

    surahList   = [];
    pageNumbers = this._arrayFill(604);
    juzNumbers  = this._arrayFill(30);

    constructor(private nav:NavController, private gq:gq)
    {
        this.gq
            .getSurahList()
            .subscribe(list => this.surahList.push(list));
    }

    surahTapped(event, surah)
    {
        this.nav.push(SurahDetailPage, {
            surah: surah
        });
    }

    _arrayFill (length): Array<any>
    {
        return new Array(length).fill('').map((x,i) => i + 1);
    }

    openSetting()
    {
        this.nav.push(SettingPage);
    }


}
