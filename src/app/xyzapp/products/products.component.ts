import { Component, OnInit } from "@angular/core";
import { XyzService } from "../services/xyz.service";
import { ProductOrder } from "../models/product-order.model";
import { Product } from "../models/product.model";
import { OrderItems } from "../models/order-items.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: OrderItems;
  sub: Subscription;
  productSelected: boolean = false;

  constructor(private service: XyzService) {}

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
  }

  addToCart(order: ProductOrder) {
    this.service.SelectedProductOrder = order;
    this.selectedProductOrder = this.service.SelectedProductOrder;
    this.productSelected = true;
  }

  removeFromCart(productOrder: ProductOrder) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.orderItems.splice(
        this.getProductIndex(productOrder.product),
        1
      );
    }
    this.service.OrderItems = this.shoppingCartOrders;
    this.shoppingCartOrders = this.service.OrderItems;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.service.OrderItems.orderItems.findIndex(
      (value) => value.product === product
    );
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  loadProducts() {
    this.service.getAllProducts().subscribe(
      (products: any[]) => {
        this.products = products;
        this.products.forEach((product) => {
          this.productOrders.push(new ProductOrder(product, 0));
        });
      },
      (error) => console.log(error)
    );
  }

  loadOrders() {
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.service.OrderItems;
    });
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.service.OrderItems.orderItems = [];
    this.loadOrders();
    this.productSelected = false;
  }
}
