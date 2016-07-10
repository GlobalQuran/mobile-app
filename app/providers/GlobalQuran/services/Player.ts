import {Injectable, Injector} from '@angular/core';
import {GlobalQuran} from "../GlobalQuran";


@Injectable()
export class Player {

    player: any;

    current: any;

    next: any;

    constructor(private globalQuran:GlobalQuran)
    {
        //this.player = (window.plugins && window.plugins.NativeAudio) ? window.plugins.NativeAudio : false;
    }

    preload (skipAyah?:number)
    {

    } // todo

    isPlaying ():boolean {return false;} // TODO

    play () {} // TODO

    stop () {} // TODO

    _unload () {} // TODO

}
