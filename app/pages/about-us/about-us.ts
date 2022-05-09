import {Component, Injectable} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {test} from '../../providers/GlobalQuran/services/test';

@Component({
    templateUrl: 'build/pages/about-us/about-us.html'
})
@Injectable()
export class AboutUs {

    show;

    change() {
        console.log('trigger');

        //this.test.change('changed 2');
        //this.test = 'hmm';
    }

}
