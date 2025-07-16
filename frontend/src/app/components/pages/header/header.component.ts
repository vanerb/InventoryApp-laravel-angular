import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {UsersService} from "../../../services/users.service";
import {UtilitiesService} from "../../../services/utilities.service";
import {Header} from "../../../interfaces/header";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menu: Header[] = []
  selected: string = ""

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly userService: UsersService,
    private readonly utilitiesService: UtilitiesService
  ) {

  }


  async ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.menu = [
        {
          key: "init",
          name: "Inicio",
          position: "left",
          action: async () => {
            await this.router.navigate(['/']);
            await this.selectionMenu();
          }
        },
        {
          key: "inventory",
          name: "Inventario",
          position: "left",
          action: async () => {
            await this.router.navigate(['/items']);
            await this.selectionMenu();
          }
        },
        {
          key: "contact",
          name: "Contacto",
          position: "left",
          action: async () => {
            await this.router.navigate(['/contact']);
            await this.selectionMenu();
          }
        },
        {
          key: "profile",
          name: "Mi perfil",
          position: "right",
          action: async () => {
            await this.router.navigate(['/my-panel']);
            await this.selectionMenu();
          },
          children: [
            {
              key: "my-panel",
              name: "Administración",
              position: "right",
              action: async () => {
                await this.router.navigate(['/my-panel/']);
                await this.selectionMenu();
              }
            },
            {
              key: "logout",
              name: "Cerrar sesión",
              position: "right",
              action: async () => {
                await this.authService.logout();
                await this.router.navigate(['/login']);
                await this.selectionMenu();
              }
            }
          ]
        }
      ];
    }


    this.selectionMenu()


  }

  getMenu(pos: string) {
    if (pos === "right") {
      return this.menu.filter(el => el.position === "right")
    } else {
      return this.menu.filter(el => el.position === "left")
    }

  }


  async selectionMenu() {
    await this.utilitiesService.sleep(0)
    let item = this.router.url.split("/")[1]

    console.log(item)
    switch (item) {
      case "recipes":
        this.selected = this.menu.find(el => el.key === "recipes")?.name ?? ""
        return

      case "register":
        this.selected = this.menu.find(el => el.key === "register")?.name ?? ""
        return
      case "contact":
        this.selected = this.menu.find(el => el.key === "contact")?.name ?? ""
        return
      case "profile":
        this.selected = this.menu.find(el => el.key === "profile")?.name ?? ""
        return
      case "management":
        this.selected = this.menu.find(el => el.key === "profile")?.name ?? ""
        return
      case "categories":
        this.selected = this.menu.find(el => el.key === "profile")?.name ?? ""
        return
      case "my-panel":
        this.selected = this.menu.find(el => el.key === "profile")?.name ?? ""
        return
      case "":
        this.selected = this.menu.find(el => el.key === "init")?.name ?? ""
        return

      case "login":
        this.selected = this.menu.find(el => el.key === "login")?.name ?? ""
        return
      case "logout":
        this.selected = this.menu.find(el => el.key === "login")?.name ?? ""
        return

    }
  }



}
