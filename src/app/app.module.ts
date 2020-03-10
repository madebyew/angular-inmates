import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './routes/login/login.module';
import { InmateModule } from './routes/inmate/inmate.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { WrapperModule } from './components/wrapper/wrapper.module';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoginModule,
    InmateModule,
    MatButtonModule,
    RouterModule,
    WrapperModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
