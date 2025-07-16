// auth.guard.ts
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const isLoggedIn = this.auth.isLoggedIn();
    const publicRoutes = ['login', 'register', '']; // rutas públicas que no requieren estar logueado

    const currentRoute = route.routeConfig?.path;

    if (isLoggedIn) {
      // Si ya está logueado:

      // Si intenta acceder a login o register, redirige al dashboard
      if (currentRoute && publicRoutes.includes(currentRoute)) {
        return this.router.createUrlTree(['/dashboard']);
      }

      // Si va a cualquier otra ruta, deja pasar
      return true;
    } else {
      // No está logueado:

      // Si va a ruta pública, deja pasar
      if (currentRoute && publicRoutes.includes(currentRoute)) {
        return true;
      }

      // Si va a ruta privada, redirige a login
      return this.router.createUrlTree(['/login']);
    }
  }
}
