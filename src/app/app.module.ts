import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { GridComponent } from './components/grid/grid.component';
import { PageService, ToolbarService, EditService, CommandColumnService } from '@syncfusion/ej2-angular-grids';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    GridModule,
    PagerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PageService, ToolbarService, EditService, CommandColumnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
