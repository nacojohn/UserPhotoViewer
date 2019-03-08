import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { MakeHttpRequest } from 'src/app/services/http.service';
import { AppLoadingService } from 'src/app/services/app-loading.service';

@Injectable()
export class PhotoService {
    constructor(private makeHttpRequest: MakeHttpRequest,
                private appLoading: AppLoadingService) {  }

    getPhotos(albumID: number) {
        let promise = new Promise(
            (resolve, reject) => {
                this.appLoading.appIsLoading.next(true);
                this.makeHttpRequest.requestFromServer("photos?albumId=" + albumID).subscribe(
                    (response: HttpResponse<JSON>) => {
                        if (response.type != 0) {
                            resolve(response.body);
                        }
                    },
                    (error) => {
                        this.appLoading.appIsLoading.next(false);
                        alert("Network failed, please reload browser");
                    }
                )
            }
        )

        return promise;
    }
}
