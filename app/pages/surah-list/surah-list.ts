import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {gq} from '../../GlobalQuran/gq';

import {SurahDetailPage} from '../surah-detail/surah-detail';


@Page({
  templateUrl: 'build/pages/surah-list/surah-list.html'
})
export class SurahListPage {

  surahList = [];

  constructor(private nav: NavController, navParams: NavParams, private gq: gq) {}

  onPageWillEnter()
  {
    this.gq.listen('list.surah').subscribe(list => this.surahList = list);
    this.gq.getSurahList();
  }

  surahTapped(event, surah)
  {
    this.nav.push(SurahDetailPage, {
      surah: surah
    });
  }
}
