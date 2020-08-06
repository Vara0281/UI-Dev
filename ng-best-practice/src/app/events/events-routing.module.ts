import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { AdminAuthGuard } from 'app/auth/admin-auth.guard';

const routes: Routes = [
  { path: '', component: EventsComponent },
  {
    path: 'special', component: SpecialEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminEventsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
