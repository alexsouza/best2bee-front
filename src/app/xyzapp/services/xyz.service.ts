import { OrderData } from "./../models/order-data.model";
import { Customer } from "./../models/customer.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ProductOrder } from "../models/product-order.model";
import { OrderItems } from "../models/order-items.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class XyzService {
  private productsUrl = "/api/products";
  private ordersUrl = "/api/order";

  private productOrder: ProductOrder;
  private orders: OrderItems = new OrderItems();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private fakeCustomer = new Customer(1, "Fulano", "fulano@email.com");

  private total: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.productsUrl);
  }

  saveOrder(orderData: OrderData) {
    return this.http.post(this.ordersUrl, orderData);
  }

  set SelectedProductOrder(value: ProductOrder) {
    this.productOrder = value;
    this.productOrderSubject.next();
  }

  get SelectedProductOrder() {
    return this.productOrder;
  }

  set OrderItems(value: OrderItems) {
    this.orders = value;
    this.ordersSubject.next();
  }

  get OrderItems() {
    return this.orders;
  }

  get Total() {
    return this.total;
  }

  set Total(value: number) {
    this.total = value;
    this.totalSubject.next();
  }

  getCustomer() {
    return this.fakeCustomer;
  }
}
