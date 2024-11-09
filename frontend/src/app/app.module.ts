// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this import
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodaysMedicationComponent } from './todays-medication/todays-medication.component';
import { MyInventoryComponent } from './my-inventory/my-inventory.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodaysMedicationComponent,
    MyInventoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule ,
    HttpClientModule// Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
