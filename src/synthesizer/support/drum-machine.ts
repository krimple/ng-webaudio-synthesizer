import {SynthNoteMessage, SynthMessage, TriggerSample} from '../models/synth-note-message';
import {Subject} from 'rxjs';
import {Sample} from '../models/sample';
import {BaseRequestOptions, ResponseContentType, Response, Http} from '@angular/http';
/**
 * Note, this helper class is NOT dependency injected. I had trouble with the factory
 * when trying to set up ngc to export the library for another Angular project to use,
 * so I gave up on trying. It's really not something I want exported from the main service anyway,
 * so consider it a helper class.
 */
export class DrumMachine {
  private samples: any;
  constructor(readonly synthStream$: Subject<SynthNoteMessage>,
              private audioContext: AudioContext,
              private audioBus: AudioNode,
              private http: Http) { }
  begin() {
    const self = this;
    this.samples = {
      bass: new Sample('assets/drums/bass-thud.wav'),
      hihat: new Sample('assets/drums/hi-hat-closed.wav'),
      hihatopen: new Sample('assets/drums/hi-hat-open.wav'),
      snare: new Sample('assets/drums/short-snare.wav'),
      flam: new Sample('assets/drums/snare-flam.wav'),
      rimshot: new Sample('assets/drums/snare-rimshot.wav'),
      htrimshot: new Sample('assets/drums/hi-tom-rimshot.wav'),
      tom1: new Sample('assets/drums/hi-tom-normal.wav'),
      tom2: new Sample('assets/drums/low-tom.wav'),
      crash: new Sample('assets/drums/crash-trash.wav'),
      ride: new Sample('assets/drums/ride-standard.wav'),
      ping: new Sample('assets/drums/ride-ping.wav')
    };
    self.loadSamples()
      .then(() => {
        self.subscribeToSampleTriggerMessages();
      });
  }

  loadSamples(): Promise<void> {
    const self = this;
    return new Promise<void>((resolve, reject) => {
     Promise.all([
       self.loadSample(this.samples.bass),
       self.loadSample(this.samples.crash),
       self.loadSample(this.samples.hihat),
       self.loadSample(this.samples.hihatopen),
       self.loadSample(this.samples.ride),
       self.loadSample(this.samples.snare),
       self.loadSample(this.samples.flam),
       self.loadSample(this.samples.rimshot),
       self.loadSample(this.samples.ping),
       self.loadSample(this.samples.htrimshot),
       self.loadSample(this.samples.tom1),
       self.loadSample(this.samples.tom2)
     ])
       .then(
         () => {
           console.log('samples loaded');
           resolve();
         },
         (error) => {
           console.log('samples not loaded', error);
           reject(error);
         });
    });
  }

  private loadSample(sample: Sample): Promise<void> {
    const self = this;
    const options = new BaseRequestOptions();
    options.responseType = ResponseContentType.ArrayBuffer;
    return new Promise<void>((resolve, reject) => {
      this.http.get(sample.fileName, options)
        .map((response: Response) => {
          return response.arrayBuffer();
        })
        .subscribe((rawBuffer: ArrayBuffer) => {
            sample.arrayBuffer = rawBuffer;
            self.audioContext.decodeAudioData(rawBuffer, (buffer: AudioBuffer) => {
              sample.audioBuffer = buffer;
              resolve();
            });
          },
          (error) => {
            console.dir(error);
            reject();
          });
    });
  }

  subscribeToSampleTriggerMessages() {
    const self = this;
    const gain = self.audioContext.createGain();
    gain.gain.value = 1;

    // now sip please, get what you want and play it!
    self.synthStream$
      .filter((synthMessage: SynthMessage) => {
        return synthMessage instanceof TriggerSample;
      })
      .subscribe((message: TriggerSample) => {
          const instrument = message.instrument;
          const sample: Sample = self.samples[instrument];
          if (sample) {
            const source = self.audioContext.createBufferSource();
            if (!sample.gain) {
              sample.gain = gain;
            }
            source.connect(sample.gain);
            sample.gain.connect(self.audioBus);
            source.buffer = sample.audioBuffer;
            source.start(0);
          }
        },
        (error) => {
          console.error('error in subscription', error);
        },
        () => {
          console.log('stream closed.');
        });
  }

}
