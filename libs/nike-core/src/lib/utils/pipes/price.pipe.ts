import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(price: number, styled = true) {
    const [UNIT, FRACTION] = (price / 100).toFixed(2).split('.');
    return UNIT + `<sup>${FRACTION}</sup>`;
  }
}
