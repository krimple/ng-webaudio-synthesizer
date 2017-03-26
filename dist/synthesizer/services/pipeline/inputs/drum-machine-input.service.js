var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { TriggerSample } from '../../../models/synth-note-message';
export var DrumTrigger;
(function (DrumTrigger) {
    DrumTrigger[DrumTrigger["SNARE"] = 0] = "SNARE";
    DrumTrigger[DrumTrigger["TOM1"] = 1] = "TOM1";
    DrumTrigger[DrumTrigger["TOM2"] = 2] = "TOM2";
    DrumTrigger[DrumTrigger["FLOOR_TOM"] = 3] = "FLOOR_TOM";
    DrumTrigger[DrumTrigger["BASS_DRUM"] = 4] = "BASS_DRUM";
    DrumTrigger[DrumTrigger["HI_HAT_CLOSED"] = 5] = "HI_HAT_CLOSED";
    DrumTrigger[DrumTrigger["HI_HAT_OPEN"] = 6] = "HI_HAT_OPEN";
    DrumTrigger[DrumTrigger["CRASH_CYMBAL"] = 7] = "CRASH_CYMBAL";
    DrumTrigger[DrumTrigger["RIDE_CYMBAL"] = 8] = "RIDE_CYMBAL";
})(DrumTrigger || (DrumTrigger = {}));
var DrumMachineInputService = (function () {
    function DrumMachineInputService() {
    }
    DrumMachineInputService.prototype.setup = function (synthStream$) {
        this.synthStream$ = synthStream$;
    };
    DrumMachineInputService.prototype.playTrigger = function (trigger) {
        switch (trigger) {
            case 4 /* BASS_DRUM */:
                this.synthStream$.next(new TriggerSample('bass', 100));
                break;
            case 0 /* SNARE */:
                this.synthStream$.next(new TriggerSample('snare', 100));
                break;
            case 1 /* TOM1 */:
                this.synthStream$.next(new TriggerSample('tom1', 100));
                break;
            case 2 /* TOM2 */:
                this.synthStream$.next(new TriggerSample('tom2', 100));
                break;
            case 6 /* HI_HAT_OPEN */:
                this.synthStream$.next(new TriggerSample('hihat', 100));
                break;
            case 5 /* HI_HAT_CLOSED */:
                this.synthStream$.next(new TriggerSample('hihatclosed', 100));
                break;
            case 7 /* CRASH_CYMBAL */:
                this.synthStream$.next(new TriggerSample('crash', 100));
                break;
            case 8 /* RIDE_CYMBAL */:
                this.synthStream$.next(new TriggerSample('ride', 100));
                break;
            default:
                console.log('no soup for you, didn\'t pass a proper trigger type');
        }
    };
    return DrumMachineInputService;
}());
DrumMachineInputService = __decorate([
    Injectable()
], DrumMachineInputService);
export { DrumMachineInputService };
//# sourceMappingURL=drum-machine-input.service.js.map