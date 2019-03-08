import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from './users.service';

@Injectable()
export class UsersResolver implements Resolve<Object> {
    constructor(private userService: UsersService) { }

    resolve(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<Object> | Promise<Object> | Object {
        return this.userService.getUsers();
    }    
}