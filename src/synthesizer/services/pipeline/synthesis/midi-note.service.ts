import { Observable, Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { WaveformChange } from '../../../models/synth-note-message';
@Injectable()
export class MidiNoteService {

  private notes: Note[];
  private audioBus: AudioNode;

  constructor(/*controlPanelData: Observable<ControlPanelData>*/) {
  }

  configure(audioContext: AudioContext, audioBus: AudioNode) {
    Note.configure(audioContext, audioBus/*, controlPanelData*/);

    this.notes = [
      new Note(['C-1'], 8.176), new Note(['C#-1', 'Db-1'], 8.662), new Note(['D-1'], 9.177),
      new Note(['D#-1', 'Eb-1'], 9.723), new Note(['F-1'], 10.913), new Note(['F#-1', 'Gb-1'], 11.562),
      new Note(['G-1'], 12.250), new Note(['G#-1', 'Ab-0'], 12.978), new Note(['A0'], 13.750),
      new Note(['A#0, Bb0'], 14.568), new Note(['B0'], 15.434),
      new Note(['C0'], 16.35), new Note(['C#0', 'Db0'], 17.32), new Note(['D0'], 18.35),
      new Note(['D#0', 'Eb0'], 19.45), new Note(['E0'], 20.60), new Note(['F0'], 21.83),
      new Note(['F#0', 'Gb0'], 23.12), new Note(['G0'], 24.50), new Note(['G#0', 'Ab0'], 25.96),
      new Note(['A0'], 27.50), new Note(['A#0', 'Bb0'], 29.14), new Note(['B0'], 30.87),
      new Note(['C1'], 32.70), new Note(['C#1', 'Db1'], 34.65), new Note(['D1'], 36.71),
      new Note(['D#1', 'Eb1'], 38.89), new Note(['E1'], 41.20), new Note(['F1'], 43.65),
      new Note(['F#1', 'Gb1'], 46.25), new Note(['G1'], 49.00), new Note(['G#1', 'Ab1'], 51.91),
      new Note(['A1'], 55.00), new Note(['A#1', 'Bb1'], 58.27), new Note(['B1'], 61.74),
      new Note(['C2'], 65.41), new Note(['C#2', 'Db2'], 69.30), new Note(['D2'], 73.42),
      new Note(['D#2', 'Eb2'], 77.78), new Note(['E2'], 82.41), new Note(['F2'], 87.31),
      new Note(['F#2', 'Gb2'], 92.50), new Note(['G2'], 98.00), new Note(['G#2', 'Ab2'], 103.83),
      new Note(['A2'], 110.00), new Note(['A#2', 'Bb2'], 116.54), new Note(['B2'], 123.47),
      new Note(['C3'], 130.81), new Note(['C#3', 'Db3'], 138.59), new Note(['D3'], 146.83),
      new Note(['D#3', 'Eb3'], 155.56), new Note(['E3'], 164.81), new Note(['F3'], 174.61),
      new Note(['F#3', 'Gb3'], 185.00), new Note(['G3'], 196.00), new Note(['G#3', 'Ab3'], 207.65),
      new Note(['A3'], 220.00), new Note(['A#3', 'Bb3'], 233.08), new Note(['B3'], 246.94),
      new Note(['C4'], 261.63), new Note(['C#4', 'Db4'], 277.18), new Note(['D4'], 293.66),
      new Note(['D#4', 'Eb4'], 311.13), new Note(['E4'], 329.63), new Note(['F4'], 349.23),
      new Note(['F#4', 'Gb4'], 369.99), new Note(['G4'], 392.00), new Note(['G#4', 'Ab4'], 415.30),
      new Note(['A4'], 440.00), new Note(['A#4', 'Bb4'], 466.16), new Note(['B4'], 493.88),
      new Note(['C5'], 523.25), new Note(['C#5', 'Db5'], 554.37), new Note(['D5'], 587.33),
      new Note(['D#5', 'Eb5'], 622.25), new Note(['E5'], 659.26), new Note(['F5'], 698.46),
      new Note(['F#5', 'Gb5'], 739.99), new Note(['G5'], 783.99), new Note(['G#5', 'Ab5'], 830.61),
      new Note(['A5'], 880.00), new Note(['A#5', 'Bb5'], 932.33), new Note(['B5'], 987.77),
      new Note(['C6'], 1046.50), new Note(['C#6', 'Db6'], 1108.73), new Note(['D6'], 1174.66),
      new Note(['D#6', 'Eb6'], 1244.51), new Note(['E6'], 1318.51), new Note(['F6'], 1396.91),
      new Note(['F#6', 'Gb6'], 1479.98), new Note(['G6'], 1567.98), new Note(['G#6', 'Ab6'], 1661.22),
      new Note(['A6'], 1760.00), new Note(['A#6', 'Bb6'], 1864.66), new Note(['B6'], 1975.53),
      new Note(['C7'], 2093.00), new Note(['C#7', 'Db7'], 2217.46), new Note(['D7'], 2349.32),
      new Note(['D#7', 'Eb7'], 2489.02), new Note(['E7'], 2637.02), new Note(['F7'], 2793.83),
      new Note(['F#7', 'Gb7'], 2959.96), new Note(['G7'], 3135.96), new Note(['G#7', 'Ab8'], 3322.44),
      new Note(['A8'], 3520.00), new Note(['A#8', 'Bb8'], 3729.31), new Note(['B8'], 3951.07),
      new Note(['C8'], 4186.01), new Note(['C#8', 'Db8'], 4434.92), new Note(['D8'], 4698.64),
      new Note(['D#8', 'Eb8'], 4978.0), new Note(['E8'], 5274.041), new Note(['F8'], 5587.652),
      new Note(['F#8', 'Gb8'], 5919.911), new Note(['G8'], 6271.921), new Note(['G#8', 'Ab9'], 6644.875),
      new Note(['A9'], 7040.0), new Note(['A#9', 'Bb9'], 7458.62), new Note(['B9'], 7902.133),
      new Note(['C9'], 8372.133), new Note(['C#9', 'Db8'], 8869.844), new Note(['D9'], 9397.273),
      new Note(['D#9', 'Eb9'], 9956.063), new Note(['E9'], 10548.080), new Note(['F9'], 11175.300),
      new Note(['F#9', 'Gb9'], 12543.850)
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
  private static controlPanelDataChanges$: Observable<ControlPanelData>;
  private static waveform = 'sine';

  // for any notes that are fired, here's the message to stop them
  private stopWatcher$: Subject<number> = new Subject<number>();
  private gainNode: GainNode;
  private startingVolume = 0.2;
  private playingSince = -1;

  static configure(context: AudioContext, audioBus: AudioNode) {
    Note.context = context;
    Note.audioBus = audioBus;
    // Note.controlPanelDataChanges$ = controlPanelDataChanges$;
  }

  static changeWaveform(waveform: WaveformChange) {
    Note.waveform = waveform.waveForm;
  }

  constructor(public noteValues: string[], private frequency: number) {
    this.gainNode = Note.context.createGain();
    this.gainNode.gain.value = 0.2;
    this.gainNode.connect(Note.audioBus);

    /*
     Note.controlPanelDataChanges$.subscribe(
     (changes: ControlPanelData) => {
     this.oscillator.type = changes.waveForm;
     this.startingVolume = changes.volume;
     }
     );
     */
  }

  private getNewOscillator(): OscillatorNode {
    const oscillator = Note.context.createOscillator();
    oscillator.type = Note.waveform;
    oscillator.frequency.value = this.frequency;
    return oscillator;
  }

  noteOn() {
    console.log(`Playing note ${this.noteValues}/${this.frequency}`);
    this.playingSince = Note.context.currentTime;
    this.gainNode.gain.value = this.startingVolume;
    const oscillator = this.getNewOscillator();
    // trigger the note, let it ring
    new ToneWorker(oscillator, this.frequency, Note.context.currentTime + 0.5, Note.audioBus, this.stopWatcher$);
  }

  noteOff() {
    console.log(`Stopping note ${this.noteValues}/${this.frequency}`);
    this.stopWatcher$.next(Note.context.currentTime + 0.5);
  }
}

class ToneWorker {
  constructor(oscillator: OscillatorNode,
              frequency: number,
              currentTime: number,
              outputBus: AudioNode,
              private stopWatcher$: Observable<number>) {
    const gainNode: GainNode = Note.context.createGain();
    gainNode.gain.value = 0.2;
    gainNode.connect(outputBus);
    oscillator.connect(gainNode);
    oscillator.frequency.value = frequency;
    oscillator.start(0);
    const subscription: Subscription = stopWatcher$.subscribe((cutoffTime: number) => {
      gainNode.gain.linearRampToValueAtTime(0, cutoffTime);
      subscription.unsubscribe();
    });
    gainNode.gain.linearRampToValueAtTime(0, currentTime + 1.5);
  }
}

export class ControlPanelData {
  waveForm: string;
  volume: number;

  constructor() {
    this.waveForm = 'sawtooth';
    this.volume = 1.0;
  }
}
