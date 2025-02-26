import { inject, Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';


type ValueType = Parameters<DecimalPipe['transform']>[0];

@Pipe({
  name: 'ratingFormat',
  standalone: true,
})
export class RatingFormatPipe implements PipeTransform {
  private readonly defaultFormat = '1.1-1';
  private decimalPipe = inject(DecimalPipe);

  constructor() {}

  transform(value: ValueType, format = this.defaultFormat) {
    return this.decimalPipe.transform(value, format);
  }
}
