"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var synth_note_message_1 = require("../../../models/synth-note-message");
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
    NoteInputService.prototype.emitNoteByNoteNumber = function (noteValue) {
        if (this.enabled) {
            this.synthStream$.next(new synth_note_message_1.SynthNoteOn(noteValue));
        }
        else {
            console.log('cannot send notes. Service is disabled');
        }
    };
    NoteInputService.prototype.emitNoteByName = function (noteName) {
        if (this.enabled) {
            this.synthStream$.next(new synth_note_message_1.SynthNoteOn(noteName));
        }
    };
    NoteInputService.prototype.end = function () {
        this.enabled = false;
    };
    return NoteInputService;
}());
NoteInputService = __decorate([
    core_1.Injectable()
], NoteInputService);
exports.NoteInputService = NoteInputService;
//# sourceMappingURL=note-input.service.js.map