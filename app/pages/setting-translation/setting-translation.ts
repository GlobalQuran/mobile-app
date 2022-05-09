import {Page, NavController} from 'ionic-angular';
import {GlobalQuran} from "../../providers/GlobalQuran/GQ";


@Page({
    templateUrl: 'build/pages/setting-translation/setting-translation.html'
})
export class SettingTranslationPage
{
    constructor(nav: NavController, public globalQuran: GlobalQuran) {}
}
