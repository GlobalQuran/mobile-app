import {Injectable} from 'angular2/core';
import {Page} from 'ionic-framework/ionic';

import {test} from '../../GlobalQuran/test';



@Page({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
@Injectable()
export class HelloIonicPage {

  show;



  change ()
  {
    console.log('trigger');

    //this.test.change('changed 2');
    //this.test = 'hmm';
  }

}
