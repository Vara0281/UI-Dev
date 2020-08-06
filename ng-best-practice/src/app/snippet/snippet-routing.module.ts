import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SnippetsComponent } from './snippets.component';
import { BannerMessiComponent } from './banner-messi/banner-messi.component';

const routes: Routes = [
  { path: '', component: SnippetsComponent },
  { path: 'home-pages', component: HomePageComponent },
  { path: 'banner-messi', component: BannerMessiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetRoutingModule { }
