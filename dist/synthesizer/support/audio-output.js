"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var AudioOutput = (function () {
    function AudioOutput(synthStream$, audioContext) {
        this.messageSubscription = null;
        // wire up audio
        this.synthStream$ = synthStream$;
        this.mainMixOutput = audioContext.destination;
        this.mainMixFinalGain = audioContext.createGain();
        this.mainMixCompressor = audioContext.createDynamicsCompressor();
        this.mainMixFinalGain.connect(this.mainMixOutput);
        this.mainMixCompressor.connect(this.mainMixFinalGain);
    }
    AudioOutput.prototype.begin = function () {
        var _this = this;
        // set the max value of the compressor
        this.mainMixFinalGain.gain.value = 0.9;
        if (!this.messageSubscription) {
            // in this service we only care about the volume level
            this.messageSubscription = this.synthStream$.subscribe(function (message) {
                if (message instanceof models_1.VolumeChange) {
                    _this.setVolume(message.level);
                }
            });
        }
        else {
            console.log('already subscribed!  Cannot re-enable audio output service');
        }
    };
    AudioOutput.prototype.setVolume = function (gain) {
        this.mainMixFinalGain.gain.value = gain;
    };
    AudioOutput.prototype.end = function () {
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
    return AudioOutput;
}());
exports.AudioOutput = AudioOutput;
//# sourceMappingURL=audio-output.js.map