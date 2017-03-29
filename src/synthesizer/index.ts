export {NoteTranslationService} from './services/pipeline/processors/note-translation.service';
export {QuantizerService} from './services/pipeline/processors/quantizer.service';
export {SequencerService} from './services/pipeline/processors/sequencer.service';
export {AudioOutputService} from './services/pipeline/outputs/audio-output.service';
export {DrumPCMTriggeringService} from './services/pipeline/synthesis/drum-pcm-triggering.service';
export {PipelineService} from './services/pipeline/pipeline.service';
export {MidiInputService} from './services/pipeline/inputs/midi-input.service';
export {NoteInputService} from './services/pipeline/inputs/note-input.service';
export {DrumMachineInputService, DrumTrigger} from './services/pipeline/inputs/drum-machine-input.service';
export {TriggerSample, Sample, StreamEvent, SynthControlMessage,
        SynthNoteMessage, SynthNoteOn, SynthNoteOff, VolumeChange, WaveformChange} from './models';
export {SynthesizerModule } from './synthesizer.module';
export {SynthStreamWrapper} from './services/synth-stream-wrapper';

const ctxName = 'theAudioContext';

// hackity hack - get audio context outside of an Angular module
window['ctxName'] = new AudioContext();

// hackity hackity hack - make iOS happy by resuming the audio context on touch
// see https://gist.github.com/laziel/7aefabe99ee57b16081c

if (window[ctxName] && window[ctxName].state === 'suspended') {
    const resume = () => {
        window[ctxName].resume();
    };

    setTimeout(() => {
        if (window[ctxName].state === 'running') {
            document.body.removeEventListener('touchend', resume, false);
        }
    }, 0);

    document.body.addEventListener('touchend', resume, false);
}

// prevent right click
window.addEventListener('contextmenu',
  function(e) { e.preventDefault(); });

// end hackity hackity hack
