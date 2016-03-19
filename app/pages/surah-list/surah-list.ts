import {Page, NavController, NavParams} from 'ionic-angular';
import {gq} from '../../GlobalQuran/gq';

import {SurahDetailPage} from '../surah-detail/surah-detail';
import {SettingPage} from "../setting/setting";


@Page({
    templateUrl: 'build/pages/surah-list/surah-list.html'
})
export class SurahListPage {

    surahList   = [];
    pageNumbers = this.arrayNumber(604);
    juzNumbers  = this.arrayNumber(30);

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

    arrayNumber(number)
    {
        return Array(number).fill('').map((x,i) => i + 1);
    }

    openSetting()
    {
        this.nav.push(SettingPage);
    }


}
