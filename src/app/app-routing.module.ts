import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { SignupComponent } from './signup/signup.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'address', component: AddressComponent, canActivate: [AuthGuard]  },
  { path: 'edit-address', component: EditAddressComponent, canActivate: [AuthGuard]  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'order', component: OrdersComponent, canActivate: [AuthGuard]  },
  { path: 'product-single/:id/:title', component: ProductsingleComponent },
  { path: 'profile-details', component: ProfileDetailComponent, canActivate: [AuthGuard]  },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard]  },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
