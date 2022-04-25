import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventKeysDirective } from './prevent-keys.directive';
import { PipesModule } from '../pipes/pipes.module';
import { FormatNumberPipe } from '../pipes/format-number.pipe';

@NgModule({
  declarations: [
    PreventKeysDirective,
  ],
  imports: [CommonModule],
  exports: [
    PreventKeysDirective,
  ],
  providers: [
    FormatNumberPipe
  ]
})
export class DirectivesModule { }
