export class SynthMessage {}

export class SynthNoteMessage implements SynthMessage {
  readonly note: number|string;

  constructor(note: number|string) {
    this.note = note;
  }
}

export class SynthNoteOn extends SynthNoteMessage { }

export class SynthNoteOff extends SynthNoteMessage { }

export class TriggerSample implements SynthMessage {
  public instrument: string;
  public velocity: number;
  constructor(instrument: string, velocity: number) {
   this.instrument = instrument;
   this.velocity = velocity;
  }
}

export class ClockTick implements SynthMessage { }

export class SynthControlMessage implements SynthMessage { }

export class VolumeChange implements SynthControlMessage {
  public level: number;
  constructor(level: number) {
    // hack due to arduino stupidity kenny
    this.level = Math.min(level / 127.0);
  }
}

export class WaveformChange implements SynthControlMessage {
  public waveForm: string;
  constructor(public rawValue: number) {
    switch (rawValue) {
      case 0:
        this.waveForm = 'sawtooth';
        break;
      case 1:
        this.waveForm = 'sine';
        break;
      case 2:
        this.waveForm = 'triangle';
        break;
      case 3:
        this.waveForm = 'square';
        break;
      default:
        this.waveForm = 'sawtooth';
    }
  }
}
