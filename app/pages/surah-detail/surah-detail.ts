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

    selectedSurah: surahDetail;
    content:Array<any>;

    startAyah: number;
    endAyah: number;

    totalAyahs: number;

    constructor(private nav:NavController, navParams:NavParams, private gq:gq)
    {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedSurah = navParams.get('surah');
        this.content = [];

        this.totalAyahs = this.selectedSurah.ayahs;
        this.startAyah = 1;

        this.gq
            .select(this.selectedSurah.no, this.startAyah)
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
        if (this.selectedSurah.no < 10)
            return '00'+this.selectedSurah.no;
        else if (this.selectedSurah.no < 100)
            return '0'+this.selectedSurah.no;
        else
            return this.selectedSurah.no;
    }

    openSetting()
    {
        this.nav.push(SettingPage);
    }
}
