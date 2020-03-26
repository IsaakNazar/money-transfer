import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { UserPageComponent } from './components/user-page/user-page.component'


const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'user', component: UserPageComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
