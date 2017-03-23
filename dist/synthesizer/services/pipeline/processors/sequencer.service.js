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
var core_1 = require('@angular/core');
var models_1 = require('../../../models');
var pipeline_service_1 = require('../pipeline.service');
(function (SequencerStates) {
    SequencerStates[SequencerStates["STOPPED"] = 0] = "STOPPED";
    SequencerStates[SequencerStates["RECORDING"] = 1] = "RECORDING";
    SequencerStates[SequencerStates["PLAYING"] = 2] = "PLAYING";
})(exports.SequencerStates || (exports.SequencerStates = {}));
var SequencerStates = exports.SequencerStates;
;
var SequencerService = (function () {
    function SequencerService(pipelineService) {
        this.streamBuffer = [];
        // start out idle
        this.state = SequencerStates.STOPPED;
        this.synthStream$ = pipelineService.synthStream$;
    }
    SequencerService.prototype.record = function () {
        var _this = this;
        // guard, guard, guard
        if (!this.synthStream$) {
            throw new Error('Pipeline must provide a valid data stream.');
        }
        // guard, guard
        if (this.state !== SequencerStates.STOPPED) {
            // do nothing
            return;
        }
        else {
            this.state = SequencerStates.RECORDING;
        }
        // record!
        var startTime = Date.now();
        this.subscription = this.synthStream$.subscribe(function (eventPayload) {
            _this.streamBuffer.push(new models_1.StreamEvent(eventPayload, Date.now() - startTime));
        });
    };
    SequencerService.prototype.stop = function () {
        // guard, guard, guard
        if (this.state !== SequencerStates.RECORDING) {
            // do nothing
            return;
        }
        else {
            this.state = SequencerStates.STOPPED;
        }
        // stop it!
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
            this.subscription = null;
            console.log('stopped recorder');
            console.log('events');
            console.dir(this.streamBuffer);
        }
        else {
            console.log('doing nothing - not recording...');
        }
    };
    SequencerService.prototype.playback = function () {
        // Oh, arrow functions, you don't always give me `this`
        var self = this;
        // guard, guard, guard
        if (this.state === SequencerStates.RECORDING) {
            // first, stop it!!!
            this.stop();
        }
        if (this.state === SequencerStates.PLAYING) {
            // we shouldn't try playing while already playing, ignore
            return;
        }
        this.state = SequencerStates.PLAYING;
        // check - do we have notes???
        if (!this.streamBuffer || this.streamBuffer.length === 0) {
            console.log('no events!');
            return;
        }
        // ok, we do, set up events for each note and play 'em in time
        this.streamBuffer.forEach(function (event) {
            setTimeout(function () {
                self.synthStream$.next(event.payload);
            }, event.timeOffset);
        });
        // I know, it isn't technically stopped yet, but it will be.
        this.state = SequencerStates.STOPPED;
        this.streamBuffer.length = 0;
    };
    SequencerService.prototype.isPlaying = function () {
        return this.state === SequencerStates.PLAYING;
    };
    SequencerService.prototype.isStopped = function () {
        return this.state === SequencerStates.STOPPED;
    };
    SequencerService.prototype.isRecording = function () {
        return this.state === SequencerStates.RECORDING;
    };
    SequencerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [pipeline_service_1.PipelineService])
    ], SequencerService);
    return SequencerService;
}());
exports.SequencerService = SequencerService;
//# sourceMappingURL=sequencer.service.js.map