var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { SynthNoteOn } from '../../../models/synth-note-message';
var NoteInputService = (function () {
    function NoteInputService() {
        this.enabled = false;
    }
    NoteInputService.prototype.setup = function (synthStream$) {
        this.synthStream$ = synthStream$;
    };
    NoteInputService.prototype.begin = function () {
        this.enabled = true;
    };
    NoteInputService.prototype.emitNote = function (noteValue) {
        if (this.enabled) {
            this.synthStream$.next(new SynthNoteOn(noteValue));
        }
        else {
            console.log('cannot send notes. Service is disabled');
        }
    };
    NoteInputService.prototype.end = function () {
        this.enabled = false;
    };
    return NoteInputService;
}());
NoteInputService = __decorate([
    Injectable()
], NoteInputService);
export { NoteInputService };
//# sourceMappingURL=note-input.service.js.map