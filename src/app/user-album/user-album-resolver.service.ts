import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserAlbumService } from './user-album.service';

@Injectable()
export class UserAlbumResolver implements Resolve<Object> {
    constructor(private userAlbumService: UserAlbumService) { }

    resolve(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<Object> | Promise<Object> | Object {
        return this.userAlbumService.getAlbums(route.params.id);
    }    
}