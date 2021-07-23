import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { DragBlockComponent } from './drag-block/drag-block.component';
import { StylesBlockComponent } from './styles-block/styles-block.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { TokenIterceptionService } from './token-iterception.service';

@NgModule({
  declarations: [
    AppComponent,
    DragBlockComponent,
    StylesBlockComponent,
    MainAppComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    DragDropModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIterceptionService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
