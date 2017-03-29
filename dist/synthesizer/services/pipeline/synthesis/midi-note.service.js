var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SynthNoteOff, SynthNoteOn, VolumeChange, WaveformChange } from '../../../models/synth-note-message';
var MidiNoteService = (function () {
    function MidiNoteService() {
    }
    MidiNoteService.prototype.setup = function (audioContext, synthStream$, audioBus) {
        Note.configure(audioContext, synthStream$, audioBus);
        this.notes = [
            new Note(['C0'], 16.3516),
            new Note(['C#0', 'Db0'], 17.3239),
            new Note(['D0'], 18.3540),
            new Note(['D#0', 'Eb0'], 19.4454),
            new Note(['E0'], 20.6017),
            new Note(['F0'], 21.8268),
            new Note(['F#0', 'Gb0'], 23.1247),
            new Note(['G0'], 24.4997),
            new Note(['G#0', 'Ab0'], 25.9565),
            new Note(['A0'], 27.5000),
            new Note(['A#0', 'Bb0'], 29.1352),
            new Note(['B0'], 30.8677),
            new Note(['C1'], 32.7032),
            new Note(['C#1', 'Db1'], 34.6478),
            new Note(['D1'], 36.7081),
            new Note(['D#1', 'Eb1'], 38.8909),
            new Note(['E1'], 41.2034),
            new Note(['F1'], 43.6535),
            new Note(['F#1', 'Gb1'], 46.25),
            new Note(['G1'], 48.8884),
            new Note(['G#1', 'Ab1'], 51.9131),
            new Note(['A1'], 55.00),
            new Note(['A#1', 'Bb1'], 58.2705),
            new Note(['B1'], 61.7354),
            new Note(['C2'], 65.4064),
            new Note(['C#2', 'Db2'], 69.2957),
            new Note(['D2'], 73.4162),
            new Note(['D#2', 'Eb2'], 77.7817),
            new Note(['E2'], 82.4069),
            new Note(['F2'], 87.3071),
            new Note(['F#2', 'Gb2'], 92.4986),
            new Note(['G2'], 97.9989),
            new Note(['G#2', 'Ab2'], 103.826),
            new Note(['A2'], 110.00),
            new Note(['A#2', 'Bb2'], 116.541),
            new Note(['B2'], 123.471),
            new Note(['C3'], 130.813),
            new Note(['C#3', 'Db3'], 138.591),
            new Note(['D3'], 146.832),
            new Note(['D#3', 'Eb3'], 155.563),
            new Note(['E3'], 164.814),
            new Note(['F3'], 174.614),
            new Note(['F#3', 'Gb3'], 184.997),
            new Note(['G3'], 195.998),
            new Note(['G#3', 'Ab3'], 207.652),
            new Note(['A3'], 220.00),
            new Note(['A#3', 'Bb3'], 233.082),
            new Note(['B3'], 246.942),
            new Note(['C4'], 261.626),
            new Note(['C#4', 'Db4'], 277.183),
            new Note(['D4'], 293.665),
            new Note(['D#4', 'Eb4'], 311.127),
            new Note(['E4'], 329.628),
            new Note(['F4'], 349.228),
            new Note(['F#4', 'Gb4'], 369.994),
            new Note(['G4'], 391.995),
            new Note(['G#4', 'Ab4'], 415.305),
            new Note(['A4'], 440.00),
            new Note(['A#4', 'Bb4'], 466.164),
            new Note(['B4'], 493.883),
            new Note(['C5'], 523.251),
            new Note(['C#5', 'Db5'], 554.365),
            new Note(['D5'], 587.330),
            new Note(['D#5', 'Eb5'], 622.254),
            new Note(['E5'], 659.255),
            new Note(['F5'], 698.456),
            new Note(['F#5', 'Gb5'], 739.989),
            new Note(['G5'], 783.991),
            new Note(['G#5', 'Ab5'], 830.609),
            new Note(['A5'], 880.00),
            new Note(['A#5', 'Bb5'], 932.328),
            new Note(['B5'], 987.767),
            new Note(['C6'], 1046.50),
            new Note(['C#6', 'Db6'], 1108.73),
            new Note(['D6'], 1174.66),
            new Note(['D#6', 'Eb6'], 1244.51),
            new Note(['E6'], 1318.51),
            new Note(['F6'], 1396.91),
            new Note(['F#6', 'Gb6'], 1479.98),
            new Note(['G6'], 1567.98),
            new Note(['G#6', 'Ab6'], 1661.22),
            new Note(['A6'], 1760.00),
            new Note(['A#6', 'Bb6'], 1864.66),
            new Note(['B6'], 1975.53),
            new Note(['C7'], 2093.00),
            new Note(['C#7', 'Db7'], 2217.46),
            new Note(['D7'], 2349.32),
            new Note(['D#7', 'Eb7'], 2489.02),
            new Note(['E7'], 2637.02),
            new Note(['F7'], 2793.83),
            new Note(['F#7', 'Gb7'], 2959.96),
            new Note(['G7'], 3135.96),
            new Note(['G#7', 'Ab7'], 3322.44),
            new Note(['A7'], 3520.00),
            new Note(['A#7', 'Bb7'], 3729.31),
            new Note(['B7'], 3951.07),
            new Note(['C8'], 4186.01),
            new Note(['C#8', 'Db8'], 4434.92),
            new Note(['D8'], 4698.64),
            new Note(['D#8', 'Eb8'], 4978.03),
            new Note(['E8'], 5274.041),
            new Note(['F8'], 5587.652)
        ];
    };
    return MidiNoteService;
}());
MidiNoteService = __decorate([
    Injectable()
], MidiNoteService);
export { MidiNoteService };
export var NoteState;
(function (NoteState) {
    NoteState[NoteState["PLAYING"] = 0] = "PLAYING";
    NoteState[NoteState["STOPPED"] = 1] = "STOPPED";
})(NoteState || (NoteState = {}));
var Note = (function () {
    function Note(noteValues, frequency) {
        var _this = this;
        this.noteValues = noteValues;
        this.frequency = frequency;
        this.stopWatcher$ = new Subject();
        this.subscriptions = [];
        this.state = NoteState.STOPPED;
        this.waveform = 'sine';
        this.volume = 0.2;
        // tone curve
        this.attack = 0;
        this.sustain = 0.3;
        this.decay = 0.1;
        this.release = 0.1;
        // hackity - instead of adding to constructor, assume we construct in
        // 88 key order properly
        this.midiNoteNumber = Note.midiNoteNumberCtr;
        Note.midiNoteNumberCtr = Note.midiNoteNumberCtr + 1;
        this.gainNode = Note.context.createGain();
        this.gainNode.gain.value = this.volume;
        this.gainNode.connect(Note.audioBus);
        this.subscriptions.push(Note.synthStream$
            .filter(function (message) {
            return message instanceof SynthNoteOn &&
                message.note === _this.midiNoteNumber ||
                _this.noteValues.indexOf((message.note)) > -1;
        })
            .subscribe(function (message) {
            console.log("starting MIDI NOTE " + message.note);
            _this.noteOn();
        }));
        this.subscriptions.push(Note.synthStream$
            .filter(function (message) { return message instanceof WaveformChange; })
            .subscribe(function (message) {
            _this.waveform = message.waveForm;
        }));
        this.subscriptions.push(Note.synthStream$
            .filter(function (message) { return message instanceof VolumeChange; })
            .subscribe(function (volumeChange) {
            _this.volume = volumeChange.level;
            if (_this.state === NoteState.PLAYING) {
                _this.gainNode.gain.value = _this.volume;
            }
        }));
    }
    Note.configure = function (context, synthStream, audioBus) {
        Note.context = context;
        Note.audioBus = audioBus;
        Note.synthStream$ = synthStream;
    };
    Note.prototype.noteOn = function () {
        var _this = this;
        setTimeout(function () {
            var now = Note.context.currentTime;
            new ToneWorker(_this.frequency, _this.waveform, now, _this.volume, _this.attack, _this.sustain, _this.decay, Note.audioBus, _this.stopWatcher$);
            // subscribe to note off and stop oscillation
            Note.synthStream$
                .filter(function (message) {
                return message instanceof SynthNoteOff &&
                    message.note === _this.midiNoteNumber ||
                    _this.noteValues.indexOf((message.note)) > -1;
            })
                .subscribe(function (message) {
                _this.stopWatcher$.next();
            });
        }, 0);
    };
    return Note;
}());
export { Note };
Note.midiNoteNumberCtr = 0;
var ToneWorker = (function () {
    function ToneWorker(frequency, waveform, startTime, volume, attack, sustain, decay, outputBus, stopWatcher$) {
        this.stopWatcher$ = stopWatcher$;
        var oscillator = Note.context.createOscillator();
        oscillator.frequency.value = frequency;
        oscillator.type = waveform;
        var gainNode = Note.context.createGain();
        gainNode.gain.value = 0.2;
        gainNode.connect(outputBus);
        oscillator.connect(gainNode);
        oscillator.frequency.value = frequency;
        oscillator.start(0);
        // attack
        gainNode.gain.linearRampToValueAtTime(volume, startTime + attack);
        gainNode.gain.setTargetAtTime(volume / 2, startTime + attack + sustain, 0.5);
        var subscription = stopWatcher$.subscribe(function () {
            var now = Note.context.currentTime;
            gainNode.gain.cancelScheduledValues(0);
            gainNode.gain.setTargetAtTime(0, now + decay, 0.5);
            subscription.unsubscribe();
        });
    }
    return ToneWorker;
}());
//# sourceMappingURL=midi-note.service.js.map