var ToneSettings = (function () {
    function ToneSettings(attack, sustain, decay, waveform, volume) {
        if (attack === void 0) { attack = 0; }
        if (sustain === void 0) { sustain = 0.5; }
        if (decay === void 0) { decay = 0.1; }
        if (waveform === void 0) { waveform = 'sawtooth'; }
        if (volume === void 0) { volume = 0.2; }
        this.attack = attack;
        this.sustain = sustain;
        this.decay = decay;
    }
    return ToneSettings;
}());
export { ToneSettings };
//# sourceMappingURL=tone-settings.js.map