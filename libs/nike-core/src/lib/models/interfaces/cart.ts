import { DateTime } from 'luxon';

import { PackageProduct } from '@nike-core';

export interface Cart {
  products: PackageProduct[],
  deliveryAddress: string,
  deliveryCost: number,
  estimatedDateTime: DateTime,
  value: number,

}
