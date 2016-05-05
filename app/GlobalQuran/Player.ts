import {Injectable, Injector} from 'angular2/core';
import {gq} from "./gq";


@Injectable()
export class Player {

    player: any;

    current: any;

    next: any;

    constructor(private gq:gq)
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