import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './features/website/components/website/website.component';
import { WildCardComponent } from './core/components/wild-card/wild-card.component';
import { FaqComponent } from './features/faq/components/faq/faq.component';

const routes: Routes = [
  {path: '', component: FaqComponent},
  {path: 'website', component: WebsiteComponent},
  {path: '**', component: WildCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
