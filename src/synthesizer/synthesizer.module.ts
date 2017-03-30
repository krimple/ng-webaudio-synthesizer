import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SynthesizerService } from './synthesizer.service';
@NgModule({
  providers: [
    SynthesizerService
  ],
  imports: [
   HttpModule
 ],
})
export class SynthesizerModule { }
