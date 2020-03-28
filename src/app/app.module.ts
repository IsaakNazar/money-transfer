import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ApiService } from './services/api.service'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { StartPageComponent } from './components/start-page/start-page.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { TokenInterceptor } from './helpers/token.interceptor';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserInfoComponent } from './components/user-page/user-info/user-info.component';
import { CreateTransactionComponent } from './components/user-page/create-transaction/create-transaction.component';
import { TransactionHistoryComponent } from './components/user-page/transaction-history/transaction-history.component'
import { MatTableModule } from '@angular/material/table'
import { UserService } from './services/user.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    StartPageComponent,
    NotFoundComponent,
    UserPageComponent,
    UserInfoComponent,
    CreateTransactionComponent,
    TransactionHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers: [
    ApiService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
