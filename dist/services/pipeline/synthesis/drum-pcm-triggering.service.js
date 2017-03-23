var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions, ResponseContentType } from '@angular/http';
import { Sample, TriggerSample } from '../../../models';
import { Subject } from 'rxjs';
var DrumPCMTriggeringService = (function () {
    function DrumPCMTriggeringService(http) {
        this.http = http;
        this.synthStream$ = new Subject();
    }
    DrumPCMTriggeringService.prototype.setup = function (context, targetNode, synthStream$) {
        var _this = this;
        var self = this;
        self.synthStream$ = synthStream$;
        self.samples = {
            bass: new Sample('assets/drums/bass-thud.wav'),
            hihat: new Sample('assets/drums/hi-hat-closed.wav'),
            hihatopen: new Sample('assets/drums/hi-hat-open.wav'),
            snare: new Sample('assets/drums/short-snare.wav'),
            flam: new Sample('assets/drums/snare-flam.wav'),
            rimshot: new Sample('assets/drums/snare-rimshot.wav'),
            htrimshot: new Sample('assets/drums/hi-tom-rimshot.wav'),
            tom1: new Sample('assets/drums/hi-tom-normal.wav'),
            tom2: new Sample('assets/drums/low-tom.wav'),
            crash: new Sample('assets/drums/crash-trash.wav'),
            ride: new Sample('assets/drums/ride-standard.wav'),
            ping: new Sample('assets/drums/ride-ping.wav')
        };
        self.loadSamples(context).then(function () {
            console.log('samples loaded...  Subscribing to streams');
            _this.subscribeTo(context, targetNode);
        });
    };
    DrumPCMTriggeringService.prototype.subscribeTo = function (context, targetNode) {
        var self = this;
        var gain = context.createGain();
        gain.gain.value = 1;
        // now sip please, get what you want and play it!
        self.synthStream$
            .filter(function (synthMessage) {
            return synthMessage instanceof TriggerSample;
        })
            .subscribe(function (message) {
            var instrument = message.instrument;
            var sample = self.samples[instrument];
            if (sample) {
                var source = context.createBufferSource();
                if (!sample.gain) {
                    sample.gain = gain;
                }
                source.connect(sample.gain);
                sample.gain.connect(targetNode);
                source.buffer = sample.audioBuffer;
                source.start(0);
            }
        }, function (error) {
            console.error('error in subscription', error);
        }, function () {
            console.log('stream closed.');
        });
    };
    DrumPCMTriggeringService.prototype.loadSamples = function (context) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            Promise.all([
                self.loadSample(context, _this.samples.bass),
                self.loadSample(context, _this.samples.crash),
                self.loadSample(context, _this.samples.hihat),
                self.loadSample(context, _this.samples.hihatopen),
                self.loadSample(context, _this.samples.ride),
                self.loadSample(context, _this.samples.snare),
                self.loadSample(context, _this.samples.flam),
                self.loadSample(context, _this.samples.rimshot),
                self.loadSample(context, _this.samples.ping),
                self.loadSample(context, _this.samples.htrimshot),
                self.loadSample(context, _this.samples.tom1),
                self.loadSample(context, _this.samples.tom2)
            ])
                .then(function () {
                console.log('samples loaded...');
                resolve();
            });
        });
    };
    DrumPCMTriggeringService.prototype.loadSample = function (context, sample) {
        var _this = this;
        var options = new BaseRequestOptions();
        options.responseType = ResponseContentType.ArrayBuffer;
        return new Promise(function (resolve, reject) {
            _this.http.get(sample.fileName, options)
                .map(function (response) {
                return response.arrayBuffer();
            })
                .subscribe(function (rawBuffer) {
                sample.arrayBuffer = rawBuffer;
                context.decodeAudioData(rawBuffer, function (buffer) {
                    sample.audioBuffer = buffer;
                    resolve();
                });
            }, function (error) {
                console.dir(error);
                reject();
            });
        });
    };
    return DrumPCMTriggeringService;
}());
DrumPCMTriggeringService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DrumPCMTriggeringService);
export { DrumPCMTriggeringService };
//# sourceMappingURL=drum-pcm-triggering.service.js.map