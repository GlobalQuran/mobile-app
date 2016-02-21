import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {gq} from '../../GlobalQuran/gq';

import {SurahDetailPage} from '../surah-detail/surah-detail';
import {SettingPage} from "../setting/setting";


@Page({
    templateUrl: 'build/pages/surah-list/surah-list.html'
})
export class SurahListPage {

    surahList = [];

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

    openSetting()
    {
        this.nav.push(SettingPage);
    }
}
