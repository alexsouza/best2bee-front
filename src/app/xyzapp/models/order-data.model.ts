import { Customer } from "./customer.model";
import { PaymentDetails } from "./payment-details.model";
import { ProductOrder } from "./product-order.model";

export class OrderData {
  customer: Customer;
  orderItems: ProductOrder[];
  paymentDetails: PaymentDetails;

  constructor(
    customer: Customer,
    orderItems: ProductOrder[],
    paymentDetails?: PaymentDetails
  ) {
    this.customer = customer;
    this.orderItems = orderItems;
    this.paymentDetails = paymentDetails;
  }
}
