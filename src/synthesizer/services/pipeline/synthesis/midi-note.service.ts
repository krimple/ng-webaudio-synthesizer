import { Observable, Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  SynthMessage, SynthNoteOff, SynthNoteOn, VolumeChange,
  WaveformChange
} from '../../../models/synth-note-message';
@Injectable()
export class MidiNoteService {

  private notes: Note[];

  setup(audioContext: AudioContext, synthStream$: Subject<SynthMessage>, audioBus: AudioNode) {
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
 }

  playNoteByMidiNoteNumber(noteNumber) {
    this.notes[noteNumber].noteOn();
  }

  stopNoteByMidiNoteNumber(noteNumber) {
    this.notes[noteNumber].noteOff();
  }

  playNoteByNoteValue(noteValueString: string) {
    const note: Note = this.notes.find((theNote: Note) => {
      return (theNote.noteValues.findIndex((noteValue: string) => noteValue === noteValueString) > -1);
    });
    if (note) {
      note.noteOn();
    }
  }

  stopNoteByNoteValue(noteValueString: string) {
    const note: Note = this.notes.find((theNote: Note) => {
      return (theNote.noteValues.findIndex((noteValue: string) => noteValue === noteValueString) > -1);
    });
    if (note) {
      note.noteOff();
    }
  }
}

export class Note {
  public static context: AudioContext;
  private static audioBus: AudioNode;
  private static synthStream$: Subject<SynthMessage>;
  private static midiNoteNumberCtr = 0;
  private oscillator: OscillatorNode;


  private subscriptions: Subscription[] = [];

  // for any notes that are fired, here's the message to stop them
  private midiNoteNumber: number;
  private waveform = 'sine';
  private gainNode: GainNode;
  private volume = 0.2;

  // tone curve
  private attack = 0;
  private sustain = 0.3;
  private decay = 0.1;
  private release = 0.1;


  static configure(context: AudioContext, synthStream: Subject<SynthMessage>, audioBus: AudioNode) {
    Note.context = context;
    Note.audioBus = audioBus;
    Note.synthStream$ = synthStream;
  }

  constructor(public noteValues: string[], private frequency: number) {
    // hackity - instead of adding to constructor, assume we construct in
    // 88 key order properly
    this.midiNoteNumber = Note.midiNoteNumberCtr;
    Note.midiNoteNumberCtr = Note.midiNoteNumberCtr + 1;
    this.gainNode = Note.context.createGain();
    this.gainNode.gain.value = this.volume;
    this.gainNode.connect(Note.audioBus);

    this.subscriptions.push(Note.synthStream$
      .filter((message: SynthMessage) =>
         message instanceof SynthNoteOn &&
         parseFloat((<SynthNoteOn>message).note) === this.midiNoteNumber)
      .subscribe((message: SynthNoteOn) => {
        this.noteOn();
      }));

    this.subscriptions.push(Note.synthStream$
      .filter((message: SynthMessage) =>
         message instanceof SynthNoteOff &&
         parseFloat((<SynthNoteOn>message).note) === this.midiNoteNumber)
      .subscribe((message: SynthNoteOff) => {
          this.noteOff();
      }));

    this.subscriptions.push(Note.synthStream$
      .filter((message: SynthMessage) => message instanceof WaveformChange)
      .subscribe((message: WaveformChange) => {
        this.waveform = message.waveForm;
    }));

    this.subscriptions.push(Note.synthStream$
      .filter((message: SynthMessage) => message instanceof VolumeChange)
      .subscribe((volumeChange: VolumeChange) => {
        this.gainNode.gain.value = volumeChange.level;
    }));
  }

  private createOscillator(): void {
    this.gainNode = Note.context.createGain();
    this.oscillator = Note.context.createOscillator();
    this.oscillator.type = this.waveform;
    this.oscillator.frequency.value = this.frequency;
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(Note.audioBus);
    this.gainNode.gain.value = 0;
  }

  noteOn() {
    const now = Note.context.currentTime;
    this.createOscillator();
    this.oscillator.start(0);

    // attack
    this.gainNode.gain.linearRampToValueAtTime(this.volume, now + this.attack);
    this.gainNode.gain.setTargetAtTime(this.volume / 2, now + this.attack + this.sustain, 0.5);
  }

  noteOff() {
    const now = Note.context.currentTime;
    this.gainNode.gain.setTargetAtTime(0, now + this.attack + this.sustain + this.decay, 0.5);
  }
}

