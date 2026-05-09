import * as migration_20260508_185242_initial from './20260508_185242_initial';
import * as migration_20260508_191115_commerce from './20260508_191115_commerce';
import * as migration_20260508_194034_orders_fulfillment from './20260508_194034_orders_fulfillment';
import * as migration_20260508_211147_product_details from './20260508_211147_product_details';
import * as migration_20260508_213702_demand_architecture from './20260508_213702_demand_architecture';
import * as migration_20260508_215030_product_inquiries from './20260508_215030_product_inquiries';

export const migrations = [
  {
    up: migration_20260508_185242_initial.up,
    down: migration_20260508_185242_initial.down,
    name: '20260508_185242_initial',
  },
  {
    up: migration_20260508_191115_commerce.up,
    down: migration_20260508_191115_commerce.down,
    name: '20260508_191115_commerce',
  },
  {
    up: migration_20260508_194034_orders_fulfillment.up,
    down: migration_20260508_194034_orders_fulfillment.down,
    name: '20260508_194034_orders_fulfillment',
  },
  {
    up: migration_20260508_211147_product_details.up,
    down: migration_20260508_211147_product_details.down,
    name: '20260508_211147_product_details',
  },
  {
    up: migration_20260508_213702_demand_architecture.up,
    down: migration_20260508_213702_demand_architecture.down,
    name: '20260508_213702_demand_architecture',
  },
  {
    up: migration_20260508_215030_product_inquiries.up,
    down: migration_20260508_215030_product_inquiries.down,
    name: '20260508_215030_product_inquiries'
  },
];
