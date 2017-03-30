import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SynthesizerService } from './synthesizer.service';
var SynthesizerModule = (function () {
    function SynthesizerModule() {
    }
    return SynthesizerModule;
}());
export { SynthesizerModule };
SynthesizerModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    SynthesizerService
                ],
                imports: [
                    HttpModule
                ],
            },] },
];
/** @nocollapse */
SynthesizerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=synthesizer.module.js.map