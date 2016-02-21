import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {gq} from '../../GlobalQuran/gq';
import {SettingPage} from "../setting/setting";



@Page({
  templateUrl: 'build/pages/surah-detail/surah-detail.html'
})
export class SurahDetailPage {

  selectedSurah:any;
  content: any;

  constructor(private nav: NavController, navParams: NavParams, private gq: gq)
  {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSurah = navParams.get('surah');

    this.gq
        .select(this.selectedSurah.no, 1)
        .getContent()
        .subscribe(list => this.content = list);
  }
}
