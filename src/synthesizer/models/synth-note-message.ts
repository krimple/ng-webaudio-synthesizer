export class SynthMessage {
  readonly action: string;

  constructor(action) {
    this.action = action;
  }
}

export class SynthNoteMessage extends SynthMessage {
  readonly note: string;

  constructor(note, action) {
    super(action);
    this.note = note;
  }

}

export class SynthNoteOn extends SynthNoteMessage {
  constructor(note: string) {
    super(note, 'ON');
  }
}

export class SynthNoteOff extends SynthNoteMessage {
  constructor(note: string) {
    super(note, 'OFF');
  }
}

export class TriggerSample extends SynthMessage {
  public instrument: string;
  public velocity: number;
  constructor(instrument: string, velocity: number) {
   super('SAMPLE!');
   this.instrument = instrument;
   this.velocity = velocity;
  }
}

export class ClockTick extends SynthMessage {
  constructor() {
    super('TICK');
  }
}

export class SynthControlMessage extends SynthMessage { }

export class VolumeChange extends SynthControlMessage {
  public level: number;
  constructor(level: number) {
    super('VOLUME');
    // hack due to arduino stupidity kenny
    this.level = Math.min(level / 127.0);
  }
}

export class WaveformChange extends SynthControlMessage {
  public waveForm: string;
  constructor(public rawValue: number) {
    super('WAVEFORM');
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
