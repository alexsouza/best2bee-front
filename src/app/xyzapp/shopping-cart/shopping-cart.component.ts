import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { XyzService } from "../services/xyz.service";
import { OrderItems } from "../models/order-items.model";
import { Subscription } from "rxjs";
import { ProductOrder } from "../models/product-order.model";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  orderFinished: boolean;
  orders: OrderItems;
  total: number;
  sub: Subscription;

  @Output() onOrderFinished: EventEmitter<boolean>;

  constructor(private service: XyzService) {
    this.total = 0;
    this.orderFinished = false;
    this.onOrderFinished = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.orders = new OrderItems();
    this.loadCart();
    this.loadTotal();
  }

  private calculateTotal(products: ProductOrder[]): number {
    let sum = 0;
    products.forEach((value) => {
      sum += value.product.price * value.quantity;
    });
    return sum;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  finishOrder() {
    this.orderFinished = true;
    this.service.Total = this.total;
    this.onOrderFinished.emit(this.orderFinished);
  }

  loadTotal() {
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.total = this.calculateTotal(this.orders.orderItems);
    });
  }

  loadCart() {
    this.sub = this.service.ProductOrderChanged.subscribe(() => {
      let productOrder = this.service.SelectedProductOrder;
      if (productOrder) {
        this.orders.orderItems.push(
          new ProductOrder(productOrder.product, productOrder.quantity)
        );
      }
      this.service.OrderItems = this.orders;
      this.orders = this.service.OrderItems;
      this.total = this.calculateTotal(this.orders.orderItems);
    });
  }

  reset() {
    this.orderFinished = false;
    this.orders = new OrderItems();
    this.orders.orderItems = [];
    this.loadTotal();
    this.total = 0;
  }
}
