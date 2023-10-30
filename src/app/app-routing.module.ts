import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { WebsiteComponent } from './components/website/website.component';
import { WildCardComponent } from './components/wild-card/wild-card.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'website', component: WebsiteComponent},
  {path: '**', component: WildCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
