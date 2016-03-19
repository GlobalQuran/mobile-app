import {Page, NavController, NavParams} from 'ionic-angular';
import {gq} from '../../GlobalQuran/gq';
import {SettingPage} from "../setting/setting";

import 'rxjs/add/operator/take';

@Page({
    templateUrl: 'build/pages/surah-detail/surah-detail.html'
})
export class SurahDetailPage {

    selectedSurah:any;
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

    openSetting()
    {
        this.nav.push(SettingPage);
    }
}
