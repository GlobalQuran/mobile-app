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

    goToSurah(surah:number)
    {
        this.nav.push(SurahDetailPage, {
            surah: surah,
            ayah: 1,
            eventBy: 'surah'
        });
    }

    goToJuz (juz:number)
    {
        let quran = this.gq.getAyahNumberByJuz(juz);

        this.nav.push(SurahDetailPage, {
            surah: quran.surah,
            ayah: quran.ayah,
            eventBy: 'juz'
        });
    }

    goToPage (page:number)
    {
        let quran = this.gq.getAyahNumberByPage(page);

        this.nav.push(SurahDetailPage, {
            surah: quran.surah,
            ayah: quran.ayah,
            eventBy: 'page'
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
