import {Injectable} from 'angular2/core';
import {Page} from 'ionic-angular';

import {test} from '../../GlobalQuran/test';



@Page({
  templateUrl: 'build/pages/about-us/about-us.html'
})
@Injectable()
export class AboutUs {

  show;



  change ()
  {
    console.log('trigger');

    //this.test.change('changed 2');
    //this.test = 'hmm';
  }

}
