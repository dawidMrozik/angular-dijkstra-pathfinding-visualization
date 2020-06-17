import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NodeComponent } from './components/node/node.component';
import { GridComponent } from './components/grid/grid.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    GridComponent,
    ToolbarComponent,
    SideMenuComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
