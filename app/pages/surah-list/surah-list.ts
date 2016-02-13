import {Page, NavController, NavParams} from 'ionic-framework/ionic';

import {SurahDetailPage} from '../surah-detail/surah-detail';

declare var Quran:any;

@Page({
  templateUrl: 'build/pages/surah-list/surah-list.html'
})
export class SurahListPage {
  selectedSurah: any;
  surahList: any;

  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSurah = navParams.get('surah');

    this.surahList = [];

    for(let i=1;i<=114;i++)
    {
      this.surahList.push(Quran.surah.detail(i));
    }

  }

  surahTapped(event, surah) {
    this.nav.push(SurahDetailPage, {
      surah: surah
    });
  }
}
