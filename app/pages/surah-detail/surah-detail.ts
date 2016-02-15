import {Page, NavController, NavParams} from 'ionic-framework/ionic';

import {Pipe, PipeTransform} from 'angular2/core';

import {gq} from '../../GlobalQuran/gq';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';


@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    console.log(value);
    return Object.keys(value).map(key => value[key]);
  }
}

@Page({
  templateUrl: 'build/pages/surah-detail/surah-detail.html',
  pipes: [ValuesPipe]

})
export class SurahDetailPage {

  selectedSurah:any;
  content: any;

  constructor(private nav: NavController, navParams: NavParams, private gq: gq) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSurah = navParams.get('surah');
  }

  onPageWillEnter()
  {
    this.gq.listen('content').subscribe(list => this.content = list);
    this.gq.select(this.selectedSurah.no, 1);
    this.gq.getContent(this.selectedSurah.no);
  }
}
