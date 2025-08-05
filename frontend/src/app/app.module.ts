import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/pages/index/index.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ItemsComponent } from './components/pages/items/items.component';
import { CardComponent } from './components/general/card/card.component';
import { ModalComponent } from './components/general/modal/modal.component';
import { HeaderComponent } from './components/pages/header/header.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ConteinerComponent } from './components/general/conteiner/conteiner.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContactComponent } from './components/pages/contact/contact.component';
import { MyPanelComponent } from './components/pages/my-panel/my-panel.component';
import { AddItemComponent } from './components/pages/items/add-item/add-item.component';
import { EditItemComponent } from './components/pages/items/edit-item/edit-item.component';
import { WarningModalComponent } from './components/general/warning-modal/warning-modal.component';
import { ViewItemComponent } from './components/pages/items/view-item/view-item.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AdminComponent,
    ProfileComponent,
    ItemsComponent,
    CardComponent,
    ModalComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ConteinerComponent,
    ContactComponent,
    MyPanelComponent,
    AddItemComponent,
    EditItemComponent,
    WarningModalComponent,
    ViewItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
