export { NoteTranslationService } from './services/pipeline/processors/note-translation.service';
export { QuantizerService } from './services/pipeline/processors/quantizer.service';
export { SequencerService } from './services/pipeline/processors/sequencer.service';
export { AudioOutputService } from './services/pipeline/outputs/audio-output.service';
export { DrumPCMTriggeringService } from './services/pipeline/synthesis/drum-pcm-triggering.service';
export { SynthesisService } from './services/pipeline/synthesis/synthesis.service';
export { PipelineService } from './services/pipeline/pipeline.service';
export { MidiInputService } from './services/pipeline/inputs/midi-input.service';
export { NoteInputService } from './services/pipeline/inputs/note-input.service';
export { DrumMachineInputService, DrumTrigger } from './services/pipeline/inputs/drum-machine-input.service';
export { TriggerSample, Sample, StreamEvent, SynthControlMessage, SynthNoteMessage, SynthNoteOn, SynthNoteOff, VolumeChange, WaveformChange } from './models';
export { SynthesizerModule } from './synthesizer.module';
export { SynthStreamWrapper } from './services/synth-stream-wrapper';
var ctxName = 'theAudioContext';
// hackity hack - get audio context outside of an Angular module
window['ctxName'] = new AudioContext();
// hackity hackity hack - make iOS happy by resuming the audio context on touch
// see https://gist.github.com/laziel/7aefabe99ee57b16081c
if (window[ctxName] && window[ctxName].state === 'suspended') {
    var resume_1 = function () {
        window[ctxName].resume();
    };
    setTimeout(function () {
        if (window[ctxName].state === 'running') {
            document.body.removeEventListener('touchend', resume_1, false);
        }
    }, 0);
    document.body.addEventListener('touchend', resume_1, false);
}
// prevent right click
window.addEventListener('contextmenu', function (e) { e.preventDefault(); });
// end hackity hackity hack
//# sourceMappingURL=index.js.map