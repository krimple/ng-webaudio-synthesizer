"use strict";
var note_translation_service_1 = require('./services/pipeline/processors/note-translation.service');
exports.NoteTranslationService = note_translation_service_1.NoteTranslationService;
var quantizer_service_1 = require('./services/pipeline/processors/quantizer.service');
exports.QuantizerService = quantizer_service_1.QuantizerService;
var sequencer_service_1 = require('./services/pipeline/processors/sequencer.service');
exports.SequencerService = sequencer_service_1.SequencerService;
var audio_output_service_1 = require('./services/pipeline/outputs/audio-output.service');
exports.AudioOutputService = audio_output_service_1.AudioOutputService;
var drum_pcm_triggering_service_1 = require('./services/pipeline/synthesis/drum-pcm-triggering.service');
exports.DrumPCMTriggeringService = drum_pcm_triggering_service_1.DrumPCMTriggeringService;
var synthesis_service_1 = require('./services/pipeline/synthesis/synthesis.service');
exports.SynthesisService = synthesis_service_1.SynthesisService;
var pipeline_service_1 = require('./services/pipeline/pipeline.service');
exports.PipelineService = pipeline_service_1.PipelineService;
var improved_midi_input_service_1 = require('./services/pipeline/inputs/improved-midi-input.service');
exports.ImprovedMidiInputService = improved_midi_input_service_1.ImprovedMidiInputService;
var synthesizer_module_1 = require('./synthesizer.module');
exports.SynthesizerModule = synthesizer_module_1.SynthesizerModule;
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