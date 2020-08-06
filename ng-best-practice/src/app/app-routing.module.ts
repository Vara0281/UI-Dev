import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { PreloadingStrategygyService } from './core/preloading-strategygy';
import { AccessDeniedComponent } from '@core/access-denied/access-denied.component';
import { LoginComponent } from '@core/login/login.component';
import { RegisterComponent } from '@core/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'no-access', component: AccessDeniedComponent },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule), data: { preload: true } },
  // { path: 'forms', loadChildren: './forms/form.module#FormModule' },
  { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
  { path: 'snippets', loadChildren: () => import('./snippet/snippet.module').then(m => m.SnippetModule), data: { preload: true } },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadingStrategygyService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
