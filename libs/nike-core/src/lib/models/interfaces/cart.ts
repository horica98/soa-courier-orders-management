import { PackageProduct } from '@nike-core';
import { DateTime } from 'luxon';

export interface Cart {
  products: PackageProduct[],
  deliveryAddress: string,
  deliveryCost: number,
  estimatedDateTime: DateTime
}
