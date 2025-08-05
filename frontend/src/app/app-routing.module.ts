import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./components/pages/index/index.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {ItemsComponent} from "./components/pages/items/items.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./components/pages/register/register.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {ContactComponent} from "./components/pages/contact/contact.component";
import {MyPanelComponent} from "./components/pages/my-panel/my-panel.component";

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
  {path: 'my-panel', component: MyPanelComponent, canActivate: [AuthGuard]},
  {
    path: 'inventory',
    component: ItemsComponent,
   // canActivate: [AuthGuard]  // Protegida con guard
  },
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
