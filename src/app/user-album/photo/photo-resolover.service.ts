import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PhotoService } from './photo.service';

@Injectable()
export class PhotoResolver implements Resolve<Object> {
    constructor(private photoService: PhotoService) { }

    resolve(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<Object> | Promise<Object> | Object {
        return this.photoService.getPhotos(route.params.album_id);
    }    
}