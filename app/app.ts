import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {gq} from './GlobalQuran/gq';
import {Api} from './GlobalQuran/Api/Api';

import {AboutUs} from './pages/about-us/about-us';
import {SurahListPage} from './pages/surah-list/surah-list';

@Component({
    templateUrl: 'build/app.html',
    providers: [gq, Api]
})
export class MyApp {
    rootPage: any = SurahListPage;

    constructor(
        platform: Platform,
        private gq: gq) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
        this.gq.getAllContent();
    }
}

ionicBootstrap(MyApp);
