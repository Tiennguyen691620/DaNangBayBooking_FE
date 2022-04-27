import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suffixNumberical'
})
export class SuffixNumbericalPipe implements PipeTransform {
  transform(value: number): string {
    if (Math.floor(value / 10) === 1) {
      return value + 'th';
    }
    if (value % 10 === 1) {
      return value + 'st';
    }
    if (value % 10 === 2) {
      return value + 'nd';
    }
    if (value % 10 === 3) {
      return value + 'rd';
    }
    return value + 'th';
  }
}
