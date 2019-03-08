import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { MakeHttpRequest } from '../services/http.service';
import { AppLoadingService } from '../services/app-loading.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {
    private allUsers: any = [];

    constructor(private makeHttpRequest: MakeHttpRequest,
                private appLoading: AppLoadingService,
                private router: Router) {  }

    getUsers() {
        let promise = new Promise(
            (resolve, reject) => {

                if (this.allUsers.length == 0) {
                    this.appLoading.appIsLoading.next(true);
                    this.makeHttpRequest.requestFromServer("users").subscribe(
                        (response: HttpResponse<JSON>) => {
                            if (response.type != 0) {
                                this.allUsers = response.body;
                                resolve(response.body);
                            }
                        },
                        (error) => {
                            this.appLoading.appIsLoading.next(false);
                            alert("Network failed, please reload browser");
                        }
                    );
                } else {
                    resolve(this.allUsers)
                }
            }
        )

        return promise;
    }

    getUser(id): User | null {
        let findUser = this.allUsers.filter((user: User) => user.id == id);

        return findUser.length === 0 ? null : findUser[0];
    }
}
