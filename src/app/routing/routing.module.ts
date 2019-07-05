import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { DocsComponent } from '../docs/docs.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { MainhomeComponent } from '../mainhome.component';

const routes: Routes = [
  { path: 'start', component: MainhomeComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/start/home', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'documentation', component: DocsComponent },
    { path: '404', component: NotFoundComponent }
  ] },
  { path: '', redirectTo: '/start/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/start/404', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
