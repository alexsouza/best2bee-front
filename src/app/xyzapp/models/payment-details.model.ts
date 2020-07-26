export class PaymentDetails {
  city: string;
  creditCardNumber: string;
  currency: string;
  number: number;
  street: string;

  constructor(
    city: string,
    creditCardNumber: string,
    currency: string,
    number: number,
    street: string
  ) {
    this.city = city;
    this.creditCardNumber = creditCardNumber;
    this.currency = currency;
    this.number = number;
    this.street = street;
  }
}
