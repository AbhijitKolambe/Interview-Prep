import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChildComponent } from './components/home/child/child.component';
import { PipesDemoComponent } from './components/home/pipes-demo/pipes-demo.component';
import { DirectivesDemoComponent } from './components/home/directives-demo/directives-demo.component';
import { IoDemoComponent } from './components/home/io-demo/io-demo.component';
import { ViewChildDemoComponent } from './components/home/view-child-demo/view-child-demo.component';
import { TodosDemoComponent } from './components/home/todos-demo/todos-demo.component';
import { ReusableDemoComponent } from './components/home/reusable-demo/reusable-demo.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ReusableCardComponent } from './components/reusable-card/reusable-card.component';
import { CommunicationDemoComponent } from './components/home/communication-demo/communication-demo.component';
import { SenderComponent } from './components/home/communication-demo/sender/sender.component';
import { ReceiverComponent } from './components/home/communication-demo/receiver/receiver.component';
import { CategoryChildComponent } from './components/home/category-child/category-child.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { AgGridDemoComponent } from './components/ag-grid-demo/ag-grid-demo.component';
import { StatusFilterComponent } from './components/ag-grid-demo/status-filter/status-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChildComponent,
    PipesDemoComponent,
    DirectivesDemoComponent,
    IoDemoComponent,
    ViewChildDemoComponent,
    TodosDemoComponent,
    ReusableDemoComponent,
    ReversePipe,
    HighlightDirective,
    ReusableCardComponent,
    CommunicationDemoComponent,
    SenderComponent,
    ReceiverComponent,
    CategoryChildComponent,
    StocksComponent,
    AgGridDemoComponent,
    StatusFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([StatusFilterComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
