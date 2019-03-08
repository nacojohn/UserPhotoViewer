import { Injectable } from '@angular/core';

import { MakeHttpRequest } from '../services/http.service';
import { AppLoadingService } from '../services/app-loading.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserAlbumService {
    constructor(private makeHttpRequest: MakeHttpRequest,
                private appLoading: AppLoadingService,
                private router: Router) {  }

    getAlbums(userID: number) {
        let promise = new Promise(
            (resolve, reject) => {
                this.appLoading.appIsLoading.next(true);
                this.makeHttpRequest.requestFromServer("albums?userId=" + userID).subscribe(
                    (response: HttpResponse<JSON>) => {
                        if (response.type != 0) {
                            resolve(response.body);
                        }
                    },
                    (error) => {
                        this.appLoading.appIsLoading.next(false);
                        alert("Network failed, please reload browser");
                    }
                );
            }
        )

        return promise;
    }
}
