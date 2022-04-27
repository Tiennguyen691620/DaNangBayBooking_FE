import { VolumePipe } from './volume.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { NumberAreaPipe } from './number-area.pipe';
import { FormatNumberPipe } from './format-number.pipe';
import { SuffixNumbericalPipe } from './suffix-numberical.pipe';
@NgModule({
  declarations: [
    SafePipe,
    NumberAreaPipe,
    VolumePipe,
    FormatNumberPipe,
    SuffixNumbericalPipe
  ],
  exports: [
    SafePipe,
    NumberAreaPipe,
    VolumePipe,
    FormatNumberPipe,
    SuffixNumbericalPipe
  ],
  imports: [CommonModule]
})
export class PipesModule { }
