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

    loading: boolean;

    constructor(private nav:NavController, navParams:NavParams, private gq:gq)
    {
        this.surah = navParams.get('surah');
        this.ayah  = navParams.get('ayah');
        this.eventBy = navParams.get('eventBy');


        this.loadContent();
    }

    private loadContent ()
    {
        let self = this;

        this.surahDetail = this.gq.getSurahDetail(this.surah);
        this.content = [];

        this.totalAyahs = this.surahDetail.ayahs;
        this.startAyah = this.ayah;

        this.gq
            .selectSurah(this.surah, this.ayah)
            .getContent()
            .take(10)
            .subscribe(
                list => this.content.push(list),
                (error) => '',
                ()   => {
                    self.endAyah = self.startAyah + 9;

                    if (self.totalAyahs > self.endAyah)
                    {
                        self.loading = true;
                    }

                    setTimeout(() => {
                        if (self.totalAyahs > self.endAyah)
                        {
                            self.gq
                                .getContent()
                                .skip(10)
                                .subscribe(
                                    list => self.content.push(list),
                                    (error) => '',
                                    () => {
                                        self.endAyah = self.totalAyahs;
                                        self.loading = false;
                                    }
                                );
                        }
                    }, 500);
                }
            )
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

    isAyahEnded ():boolean
    {
        return (this.totalAyahs <= this.endAyah)
    }

    isShowNextSurahButton ():boolean
    {
        return (this.isAyahEnded() && this.surah < 114);
    }

    getNextSurah ()
    {
        this.surah++;
        this.ayah = 1;

        this.loadContent();
    }

    openSetting()
    {
        this.nav.push(SettingPage);
    }
}
