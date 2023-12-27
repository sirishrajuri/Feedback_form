import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/UI/dropdown/dropdown.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ButtonComponent } from './components/UI/button/button.component';
import { FeedbackItemComponent } from './components/feedback-item/feedback-item.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { environment } from 'src/environment/environment';
import { CapitalizeFirstLetterPipe } from './pipe/capitalize-first-letter.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddFeedbackPageComponent } from './pages/add-feedback-page/add-feedback-page.component';
import { GoBackComponent } from './components/UI/go-back/go-back.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { EllipsisPipe } from './pipe/ellipsis.pipe';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    MainPageComponent,
    ButtonComponent,
    FeedbackItemComponent,
    FeedbackListComponent,
    CapitalizeFirstLetterPipe,
    SidebarComponent,
    AddFeedbackPageComponent,
    GoBackComponent,
    EllipsisPipe,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule 
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
