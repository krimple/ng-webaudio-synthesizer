export class ToneSettings {
  constructor(private attack = 0,
              private sustain = 0.5,
              private decay = 0.1,
              waveform = 'sawtooth',
              volume = 0.2) {}
}
