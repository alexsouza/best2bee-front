import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { OrdersComponent } from "./xyzapp/orders/orders.component";
import { ProductsComponent } from "./xyzapp/products/products.component";
import { ShoppingCartComponent } from "./xyzapp/shopping-cart/shopping-cart.component";
import { XyzappComponent } from "./xyzapp/xyzapp.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    XyzappComponent,
    ProductsComponent,
    OrdersComponent,
    ShoppingCartComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
