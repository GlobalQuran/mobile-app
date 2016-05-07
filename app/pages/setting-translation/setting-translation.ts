import {Page, NavController} from 'ionic-angular';
import {gq} from "../../GlobalQuran/gq";


@Page({
    templateUrl: 'build/pages/setting-translation/setting-translation.html'
})
export class SettingTranslationPage
{
    constructor(nav: NavController, public gq: gq) {}
}