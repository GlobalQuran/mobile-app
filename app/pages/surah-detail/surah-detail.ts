import {Page, NavController, NavParams} from 'ionic-angular';
import {gq} from '../../GlobalQuran/gq';
import {SettingPage} from "../setting/setting";

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import {surahDetail} from "../../GlobalQuran/interface/surahDetail";

let _view = localStorage.getItem('_view');

@Page({
    templateUrl: (_view == 'pageByPage') ? 'build/pages/surah-detail/surah-detail-page-by-page-view.html' : 'build/pages/surah-detail/surah-detail.html'
})
export class SurahDetailPage {

    surah: number;
    ayah:  number;

    eventBy: string;

    surahDetail: surahDetail;
    content:Array<any>;

    startAyah: number;
    endAyah: number;

    totalAyahs: number;

    constructor(private nav:NavController, navParams:NavParams, private gq:gq)
    {
        this.surah = navParams.get('surah');
        this.ayah  = navParams.get('ayah');
        this.eventBy = navParams.get('eventBy');


        // If we navigated to this page, we will have an item available as a nav param
        this.surahDetail = this.gq.getSurahDetail(this.surah);
        this.content = [];

        this.totalAyahs = this.surahDetail.ayahs;
        this.startAyah = this.ayah;

        this.gq
            .selectSurah(this.surah, this.startAyah)
            .getContent()
            .take(10)
            .subscribe(
                list => this.content.push(list),
                (error) => '',
                ()   => {
                    this.endAyah = this.startAyah + 9;
                }
            );
    }

    loadMore (infiniteScroll)
    {
        if (this.totalAyahs <= this.endAyah)
        {
            infiniteScroll.enable(false);
            return;
        }

        this.gq
            .getContent()
            .skip(this.endAyah)
            .take(10)
            .subscribe(
                list => this.content.push(list),
                (error) => '',
                () => {
                    this.endAyah = this.endAyah + 10;
                    infiniteScroll.complete();
                }
            );
    }

    getSurahTitleNumber ():any
    {
        if (this.surahDetail.no < 10)
            return '00'+this.surahDetail.no;
        else if (this.surahDetail.no < 100)
            return '0'+this.surahDetail.no;
        else
            return this.surahDetail.no;
    }

    isQuran (ayah):boolean
    {
        return (ayah.type == 'quran');
    }

    openSetting()
    {
        this.nav.push(SettingPage);
    }
}
