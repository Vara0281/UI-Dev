import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetRoutingModule } from './snippet-routing.module';
import { SnippetsComponent } from './snippets.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BannerMessiComponent } from './banner-messi/banner-messi.component';

@NgModule({
  declarations: [
    SnippetsComponent,
    HomePageComponent,
    BannerMessiComponent,
  ],
  imports: [
    CommonModule,
    SnippetRoutingModule
  ],
})
export class SnippetModule { }
