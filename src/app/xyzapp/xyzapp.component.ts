import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { OrdersComponent } from "./orders/orders.component";

@Component({
  selector: "app-xyzapp",
  templateUrl: "./xyzapp.component.html",
  styleUrls: ["./xyzapp.component.css"],
})
export class XyzappComponent implements OnInit {
  collapsed = true;
  orderFinished = false;

  @ViewChild("productsC")
  productsC: ProductsComponent;

  @ViewChild("shoppingCartC")
  shoppingCartC: ShoppingCartComponent;

  @ViewChild("ordersC")
  ordersC: OrdersComponent;

  constructor() {}

  ngOnInit(): void {}

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
    this.ordersC.unsubscribeEvents();
    this.ordersC.subscribeEvents();
  }
}
