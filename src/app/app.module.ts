import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { PaymentComponent } from './payment/payment.component';
import { PagePrintOrderHistoryComponent } from './orders/page-print-order-history/page-print-order-history.component';
import { UserComponent } from './user/user.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { BrandComponent } from './brand/brand.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ReportProductComponent } from './report-product/report-product.component';
import { ReportSaleComponent } from './report-sale/report-sale.component';
import { PagePrintReportProductComponent } from './report-product/page-print-report-product/page-print-report-product.component';
import { PagePrintReportSaleComponent } from './report-sale/page-print-report-sale/page-print-report-sale.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule, MatLineModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ShopComponent,
    CartComponent,
    CheckoutComponent,
    AddressComponent,
    EditAddressComponent,
    ForgotPasswordComponent,
    OrdersComponent,
    ProductsingleComponent,
    ProfileDetailComponent,
    SignupComponent,
    SidebarComponent,
    ContactComponent,
    ProductComponent,
    ProductsComponent,
    PaymentComponent,
    PagePrintOrderHistoryComponent,
    UserComponent,
    AddProductComponent,
    EditProductComponent,
    BrandComponent,
    AddBrandComponent,
    EditBrandComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ReportProductComponent,
    ReportSaleComponent,
    PagePrintReportProductComponent,
    PagePrintReportSaleComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlickCarouselModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatRippleModule,
    MatLineModule,
    OverlayModule,
    CdkTreeModule,
    PortalModule,
    NgxPaginationModule,
    // NgxPrintModule,
    CommonModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
