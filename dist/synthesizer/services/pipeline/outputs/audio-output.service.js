"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../../../models");
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var AudioOutputService = (function () {
    function AudioOutputService(synthStream$, audioContext) {
        this.synthStream$ = synthStream$;
        this.audioContext = audioContext;
        this.messageSubscription = null;
        // wire up audio
        this.mainMixOutput = audioContext.destination;
        this.mainMixFinalGain = audioContext.createGain();
        this.mainMixCompressor = audioContext.createDynamicsCompressor();
        this.mainMixFinalGain.connect(this.mainMixOutput);
        this.mainMixCompressor.connect(this.mainMixFinalGain);
    }
    AudioOutputService.prototype.begin = function () {
        var _this = this;
        // set the max value of the compressor
        this.mainMixFinalGain.gain.value = 0.9;
        if (!this.messageSubscription) {
            // in this service we only care about the volume level
            this.messageSubscription = this.synthStream$.subscribe(function (message) {
                if (message instanceof models_1.VolumeChange) {
                    _this.mainMixFinalGain.gain.value = message.level;
                }
            });
        }
        else {
            console.log('already subscribed!  Cannot re-enable audio output service');
        }
    };
    AudioOutputService.prototype.setVolume = function (gain) {
        this.mainMixFinalGain.gain.value = gain;
    };
    AudioOutputService.prototype.end = function () {
        this.mainMixFinalGain.gain.value = 0;
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
            this.setVolume(0);
            this.messageSubscription = null;
        }
        else {
            console.log('cannot end audio output. Not started');
        }
    };
    return AudioOutputService;
}());
AudioOutputService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Subject_1.Subject, Object])
], AudioOutputService);
exports.AudioOutputService = AudioOutputService;
//# sourceMappingURL=audio-output.service.js.map