export class Customer {
  email: string;
  id: number;
  name: string;

  constructor(id: number, name: string, email: string) {
    this.email = email;
    this.id = id;
    this.name = name;
  }
}
