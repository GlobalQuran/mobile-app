import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {GlobalQuran} from './providers/GlobalQuran/GQ';
import {Api} from './providers/GlobalQuran/Api/Api';

import {AboutUs} from './pages/about-us/about-us';
import {SurahListPage} from './pages/surah-list/surah-list';

@Component({
    templateUrl: 'build/app.html',
    providers: [GlobalQuran, Api]
})
export class MyApp {
    rootPage: any = SurahListPage;

    constructor(
        platform: Platform,
        private globalQuran: GlobalQuran) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
        this.globalQuran.getAllContent();
    }
}

ionicBootstrap(MyApp, [], {
    iconMode: 'ios',
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabbarPlacement: 'bottom',
    pageTransition: 'ios',
});
