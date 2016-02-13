import {Page, NavController, NavParams} from 'ionic-framework/ionic';


@Page({
  templateUrl: 'build/pages/surah-detail/surah-detail.html'
})
export class SurahDetailPage {

  selectedSurah:any;

  constructor(private nav: NavController, navParams: NavParams) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSurah = navParams.get('surah');
  }
}
