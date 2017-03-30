import {
  SynthMessage,
  VolumeChange
} from '../models';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

export class AudioOutput {

  private synthStream$: Subject<SynthMessage>;

  // the final mix elements
  private mainMixCompressor: DynamicsCompressorNode;
  readonly mainMixFinalGain: GainNode;
  private mainMixOutput: AudioDestinationNode;
  private messageSubscription: Subscription = null;

  constructor (synthStream$: Subject<SynthMessage>, audioContext: any) {
    // wire up audio
    this.synthStream$ = synthStream$;
    this.mainMixOutput = audioContext.destination;
    this.mainMixFinalGain = audioContext.createGain();
    this.mainMixCompressor = audioContext.createDynamicsCompressor();
    this.mainMixFinalGain.connect(this.mainMixOutput);
    this.mainMixCompressor.connect(this.mainMixFinalGain);
  }

  begin() {
    // set the max value of the compressor
    this.mainMixFinalGain.gain.value = 0.9;

    if (!this.messageSubscription) {
      // in this service we only care about the volume level
      this.messageSubscription = this.synthStream$.subscribe(
        (message: SynthMessage) => {
          if (message instanceof VolumeChange) {
            this.setVolume(message.level);
          }
        }
      );
    } else {
      console.log('already subscribed!  Cannot re-enable audio output service');
    }
  }

  public setVolume(gain: number) {
    this.mainMixFinalGain.gain.value = gain;
  }

  public end() {
    this.mainMixFinalGain.gain.value = 0;
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.setVolume(0);
      this.messageSubscription = null;
    } else {
      console.log('cannot end audio output. Not started');
    }
  }
}
