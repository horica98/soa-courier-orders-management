import { DateTime } from 'luxon';

import { Product } from './product';

export interface Order {
  id: number;
  value: number;
  date: any;
  products: Product[];
  courierId?: number;
}
