import 'es6-shim';
import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';


import {gq} from './GlobalQuran/gq';
import {Api} from './GlobalQuran/Api/Api';


import {AboutUs} from './pages/about-us/about-us';
import {SurahListPage} from './pages/surah-list/surah-list';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
//import {Type} from 'angular2/core';



@App({
  templateUrl: 'build/app.html',
  providers: [gq, Api],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  // make surah list home page
  rootPage: any = SurahListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
      private app:IonicApp,
      private platform:Platform,
      private menu: MenuController,
      private gq:gq
  ) {

    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Surah List', component: SurahListPage},
      {title: 'About us', component: AboutUs}
    ];

    this.gq.getAllContent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
