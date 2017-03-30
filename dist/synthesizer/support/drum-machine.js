"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var synth_note_message_1 = require("../models/synth-note-message");
var sample_1 = require("../models/sample");
var http_1 = require("@angular/http");
/**
 * Note, this helper class is NOT dependency injected. I had trouble with the factory
 * when trying to set up ngc to export the library for another Angular project to use,
 * so I gave up on trying. It's really not something I want exported from the main service anyway,
 * so consider it a helper class.
 */
var DrumMachine = (function () {
    function DrumMachine(synthStream$, audioContext, audioBus, http) {
        this.synthStream$ = synthStream$;
        this.audioContext = audioContext;
        this.audioBus = audioBus;
        this.http = http;
    }
    DrumMachine.prototype.begin = function () {
        var self = this;
        this.samples = {
            bass: new sample_1.Sample('assets/drums/bass-thud.wav'),
            hihat: new sample_1.Sample('assets/drums/hi-hat-closed.wav'),
            hihatopen: new sample_1.Sample('assets/drums/hi-hat-open.wav'),
            snare: new sample_1.Sample('assets/drums/short-snare.wav'),
            flam: new sample_1.Sample('assets/drums/snare-flam.wav'),
            rimshot: new sample_1.Sample('assets/drums/snare-rimshot.wav'),
            htrimshot: new sample_1.Sample('assets/drums/hi-tom-rimshot.wav'),
            tom1: new sample_1.Sample('assets/drums/hi-tom-normal.wav'),
            tom2: new sample_1.Sample('assets/drums/low-tom.wav'),
            crash: new sample_1.Sample('assets/drums/crash-trash.wav'),
            ride: new sample_1.Sample('assets/drums/ride-standard.wav'),
            ping: new sample_1.Sample('assets/drums/ride-ping.wav')
        };
        self.loadSamples()
            .then(function () {
            self.subscribeToSampleTriggerMessages();
        });
    };
    DrumMachine.prototype.loadSamples = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            Promise.all([
                self.loadSample(_this.samples.bass),
                self.loadSample(_this.samples.crash),
                self.loadSample(_this.samples.hihat),
                self.loadSample(_this.samples.hihatopen),
                self.loadSample(_this.samples.ride),
                self.loadSample(_this.samples.snare),
                self.loadSample(_this.samples.flam),
                self.loadSample(_this.samples.rimshot),
                self.loadSample(_this.samples.ping),
                self.loadSample(_this.samples.htrimshot),
                self.loadSample(_this.samples.tom1),
                self.loadSample(_this.samples.tom2)
            ])
                .then(function () {
                console.log('samples loaded');
                resolve();
            }, function (error) {
                console.log('samples not loaded', error);
                reject(error);
            });
        });
    };
    DrumMachine.prototype.loadSample = function (sample) {
        var _this = this;
        var self = this;
        var options = new http_1.BaseRequestOptions();
        options.responseType = http_1.ResponseContentType.ArrayBuffer;
        return new Promise(function (resolve, reject) {
            _this.http.get(sample.fileName, options)
                .map(function (response) {
                return response.arrayBuffer();
            })
                .subscribe(function (rawBuffer) {
                sample.arrayBuffer = rawBuffer;
                self.audioContext.decodeAudioData(rawBuffer, function (buffer) {
                    sample.audioBuffer = buffer;
                    resolve();
                });
            }, function (error) {
                console.dir(error);
                reject();
            });
        });
    };
    DrumMachine.prototype.subscribeToSampleTriggerMessages = function () {
        var self = this;
        var gain = self.audioContext.createGain();
        gain.gain.value = 1;
        // now sip please, get what you want and play it!
        self.synthStream$
            .filter(function (synthMessage) {
            return synthMessage instanceof synth_note_message_1.TriggerSample;
        })
            .subscribe(function (message) {
            var instrument = message.instrument;
            var sample = self.samples[instrument];
            if (sample) {
                var source = self.audioContext.createBufferSource();
                if (!sample.gain) {
                    sample.gain = gain;
                }
                source.connect(sample.gain);
                sample.gain.connect(self.audioBus);
                source.buffer = sample.audioBuffer;
                source.start(0);
            }
        }, function (error) {
            console.error('error in subscription', error);
        }, function () {
            console.log('stream closed.');
        });
    };
    return DrumMachine;
}());
exports.DrumMachine = DrumMachine;
//# sourceMappingURL=drum-machine.js.map