import { Component, OnInit } from "@angular/core";
import { XyzService } from "../services/xyz.service";
import { OrderItems } from "../models/order-items.model";
import { Subscription } from "rxjs";
import { OrderData } from "../models/order-data.model";
import { PaymentDetails } from "../models/payment-details.model";
import { SseService } from "../services/sse-service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  orders: OrderItems;
  total: number;
  paid: boolean;
  sub: Subscription;
  errors: String[] = [];
  orderData: OrderData;
  paymentDetails: PaymentDetails;
  status: string;

  subscription: Subscription;

  constructor(private service: XyzService, private sseService: SseService) {
    this.orders = this.service.OrderItems;
  }

  ngOnInit(): void {
    console.log("Init page");
    this.paid = false;
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.orders = this.service.OrderItems;
    });
    this.paymentDetails = new PaymentDetails(
      "Rio de Janeiro",
      "4916466081637652",
      "BRL",
      34,
      "Rua Nova"
    );
    this.subscribeEvents();
    this.loadTotal();
  }

  pay() {
    this.paid = true;
    this.orderData = this.populateOrderData();
    this.service.saveOrder(this.orderData).subscribe(
      (data) => {
        console.log("success", data);
      },
      (error) => {
        console.log("oops", error.error.errors);
        error.error.errors.forEach((element) => {
          console.log(element.message);
          this.errors.push(element.message);
        });

        this.paid = false;
      }
    );
  }

  loadTotal() {
    this.sub = this.service.TotalChanged.subscribe(() => {
      this.total = this.service.Total;
    });
  }

  ngOnDestroy(): void {
    console.log("Destroing page");
    this.unsubscribeEvents();
  }

  unsubscribeEvents() {
    this.subscription.unsubscribe();
  }

  subscribeEvents() {
    this.subscription = this.sseService
      .getServerSentEvent()
      .subscribe((data) => {
        console.log(data);
        this.status = data.data;
      });
  }

  private populateOrderData() {
    return new OrderData(
      this.service.getCustomer(),
      this.orders.orderItems,
      this.paymentDetails
    );
  }
}
