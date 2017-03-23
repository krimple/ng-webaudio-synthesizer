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
var rxjs_1 = require('rxjs');
var models_1 = require('../../../models');
var QuantizerService = (function () {
    function QuantizerService() {
        this.outStream$ = new rxjs_1.Subject();
        this.streamBuffer = [];
    }
    QuantizerService.prototype.setDataStream = function (dataStream) {
        this.dataStream$ = dataStream;
    };
    QuantizerService.prototype.setBPM = function (bpm) {
        this.bpm = bpm;
    };
    QuantizerService.prototype.record = function () {
        var _this = this;
        var self = this;
        // guard, guard, guard
        if (!this.dataStream$) {
            throw new Error('Must provide a data stream with setDataStream');
        }
        var startTime = Date.now();
        this.subscription = this.dataStream$
            .debounceTime(Math.min((self.bpm / 60) * 1000))
            .do(function () {
            console.log('sending a tick!');
            // TODO - reinstantiate this
            // self.dataStream$.next(new ClockTick());
        })
            .subscribe(function (eventPayload) {
            _this.streamBuffer.push(new models_1.StreamEvent(eventPayload, Date.now() - startTime));
        });
    };
    QuantizerService.prototype.stop = function () {
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
    QuantizerService.prototype.playback = function () {
        if (!this.streamBuffer || this.streamBuffer.length === 0) {
            console.log('no events!');
            return;
        }
        var self = this;
        this.streamBuffer.forEach(function (event) {
            setTimeout(function () {
                self.dataStream$.next(event.payload);
            }, event.timeOffset);
        });
    };
    QuantizerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], QuantizerService);
    return QuantizerService;
}());
exports.QuantizerService = QuantizerService;
//# sourceMappingURL=quantizer.service.js.map