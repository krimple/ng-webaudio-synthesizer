import { VolumeChange } from '../../../models';
var AudioOutputService = (function () {
    function AudioOutputService() {
    }
    AudioOutputService.prototype.setup = function (audioContext, messageStream$) {
        var _this = this;
        // wire up audio
        this.mainMixOutput = audioContext.destination;
        this.mainMixCompressor = audioContext.createDynamicsCompressor();
        this.mainMixFinalGain = audioContext.createGain();
        this.mainMixFinalGain.gain.value = 0.9;
        this.mainMixCompressor.connect(this.mainMixFinalGain);
        this.mainMixFinalGain.connect(this.mainMixOutput);
        this.messageStream$ = messageStream$;
        // in this service we only care about the volume level
        this.messageStream$.subscribe(function (message) {
            if (message instanceof VolumeChange) {
                _this.mainMixFinalGain.gain.value = message.level;
            }
        });
    };
    AudioOutputService.prototype.setVolume = function (gain) {
        this.mainMixFinalGain.gain.value = gain;
    };
    return AudioOutputService;
}());
export { AudioOutputService };
//# sourceMappingURL=audio-output.service.js.map