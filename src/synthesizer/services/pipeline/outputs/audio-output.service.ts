import { Subject } from 'rxjs';
import {
  SynthMessage,
  SynthControlMessage,
  VolumeChange,
  WaveformChange
} from '../../../models';
export class AudioOutputService {

  // the final mix elements
  public mainMixCompressor: DynamicsCompressorNode;
  private mainMixFinalGain: GainNode;
  private mainMixOutput: AudioDestinationNode;
  private messageStream$: Subject<SynthMessage>;

  setup(audioContext: AudioContext, messageStream$: Subject<SynthMessage>) {
    // wire up audio
    this.mainMixOutput = audioContext.destination;
    this.mainMixCompressor = audioContext.createDynamicsCompressor();
    this.mainMixFinalGain = audioContext.createGain();
    this.mainMixFinalGain.gain.value = 0.9;
    this.mainMixCompressor.connect(this.mainMixFinalGain);
    this.mainMixFinalGain.connect(this.mainMixOutput);
    this.messageStream$ = messageStream$;

    // in this service we only care about the volume level
    this.messageStream$.subscribe(
      (message: SynthMessage) => {
        if (message instanceof VolumeChange) {
          this.mainMixFinalGain.gain.value = message.level;
        }
      }
    )
  }

  public setVolume(gain: number) {
    this.mainMixFinalGain.gain.value = gain;
  }
}
