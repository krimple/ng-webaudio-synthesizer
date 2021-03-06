/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from '../../synthesizer/synthesizer.module';
import * as import2 from '@angular/http';
import * as import3 from '../../synthesizer/synthesizer.service';
class SynthesizerModuleInjector extends import0.ɵNgModuleInjector<import1.SynthesizerModule> {
  _HttpModule_0:import2.HttpModule;
  _SynthesizerModule_1:import1.SynthesizerModule;
  __BrowserXhr_2:import2.BrowserXhr;
  __ResponseOptions_3:import2.BaseResponseOptions;
  __XSRFStrategy_4:any;
  __XHRBackend_5:import2.XHRBackend;
  __RequestOptions_6:import2.BaseRequestOptions;
  __Http_7:any;
  __SynthesizerService_8:import3.SynthesizerService;
  constructor(parent:import0.Injector) {
    super(parent,([] as any[]),([] as any[]));
  }
  get _BrowserXhr_2():import2.BrowserXhr {
    if ((this.__BrowserXhr_2 == null)) { (this.__BrowserXhr_2 = new import2.BrowserXhr()); }
    return this.__BrowserXhr_2;
  }
  get _ResponseOptions_3():import2.BaseResponseOptions {
    if ((this.__ResponseOptions_3 == null)) { (this.__ResponseOptions_3 = new import2.BaseResponseOptions()); }
    return this.__ResponseOptions_3;
  }
  get _XSRFStrategy_4():any {
    if ((this.__XSRFStrategy_4 == null)) { (this.__XSRFStrategy_4 = import2.ɵb()); }
    return this.__XSRFStrategy_4;
  }
  get _XHRBackend_5():import2.XHRBackend {
    if ((this.__XHRBackend_5 == null)) { (this.__XHRBackend_5 = new import2.XHRBackend(this._BrowserXhr_2,this._ResponseOptions_3,this._XSRFStrategy_4)); }
    return this.__XHRBackend_5;
  }
  get _RequestOptions_6():import2.BaseRequestOptions {
    if ((this.__RequestOptions_6 == null)) { (this.__RequestOptions_6 = new import2.BaseRequestOptions()); }
    return this.__RequestOptions_6;
  }
  get _Http_7():any {
    if ((this.__Http_7 == null)) { (this.__Http_7 = import2.ɵc(this._XHRBackend_5,this._RequestOptions_6)); }
    return this.__Http_7;
  }
  get _SynthesizerService_8():import3.SynthesizerService {
    if ((this.__SynthesizerService_8 == null)) { (this.__SynthesizerService_8 = new import3.SynthesizerService(this._Http_7,this.parent.get(import0.NgZone))); }
    return this.__SynthesizerService_8;
  }
  createInternal():import1.SynthesizerModule {
    this._HttpModule_0 = new import2.HttpModule();
    this._SynthesizerModule_1 = new import1.SynthesizerModule();
    return this._SynthesizerModule_1;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.HttpModule)) { return this._HttpModule_0; }
    if ((token === import1.SynthesizerModule)) { return this._SynthesizerModule_1; }
    if ((token === import2.BrowserXhr)) { return this._BrowserXhr_2; }
    if ((token === import2.ResponseOptions)) { return this._ResponseOptions_3; }
    if ((token === import2.XSRFStrategy)) { return this._XSRFStrategy_4; }
    if ((token === import2.XHRBackend)) { return this._XHRBackend_5; }
    if ((token === import2.RequestOptions)) { return this._RequestOptions_6; }
    if ((token === import2.Http)) { return this._Http_7; }
    if ((token === import3.SynthesizerService)) { return this._SynthesizerService_8; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const SynthesizerModuleNgFactory:import0.NgModuleFactory<import1.SynthesizerModule> = new import0.NgModuleFactory<any>(SynthesizerModuleInjector,import1.SynthesizerModule);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovVXNlcnMva2VucmkvcHJvamVjdHMvbmctd2ViYXVkaW8tc3ludGhlc2l6ZXIvc3JjL3N5bnRoZXNpemVyL3N5bnRoZXNpemVyLm1vZHVsZS5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9Vc2Vycy9rZW5yaS9wcm9qZWN0cy9uZy13ZWJhdWRpby1zeW50aGVzaXplci9zcmMvc3ludGhlc2l6ZXIvc3ludGhlc2l6ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
