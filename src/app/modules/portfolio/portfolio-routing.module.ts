import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ExperienceComponent} from "./components/experience/experience.component";
import {AchievmentsComponent} from "./components/achievments/achievments.component";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/portfolio-context/portfolio-context.component').then(c => c.PortfolioContextComponent),
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'experience', component: ExperienceComponent},
      {path: 'achievement', component: AchievmentsComponent},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {
}
