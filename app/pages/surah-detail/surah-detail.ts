import {Page, NavController, NavParams} from 'ionic-angular';
import {gq} from '../../GlobalQuran/gq';
import {SettingPage} from "../setting/setting";

import 'rxjs/add/operator/take';
import {surahDetail} from "../../GlobalQuran/interface/surahDetail";

let _view = localStorage.getItem('_view');

@Page({
    templateUrl: (_view == 'pageByPage') ? 'build/pages/surah-detail/surah-detail-page-by-page-view.html' : 'build/pages/surah-detail/surah-detail.html'
})
export class SurahDetailPage {

    selectedSurah: surahDetail;
    content:Array<any>;

    constructor(private nav:NavController, navParams:NavParams, private gq:gq)
    {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedSurah = navParams.get('surah');
        this.content = [];

        this.gq
            .select(this.selectedSurah.no, 1)
            .getContent()
            .take(10)
            .subscribe(list => {
                this.content.push(list);
            });
    }

    getSurahTitleNumber ()
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
