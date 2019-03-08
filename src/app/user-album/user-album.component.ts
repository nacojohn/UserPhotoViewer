import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from '../users/users.service';
import { UserAlbumService } from './user-album.service';

import { UserAlbum } from './user-album';

@Component({
  selector: 'app-user-album',
  templateUrl: './user-album.component.html',
  styleUrls: ['./user-album.component.css']
})
export class UserAlbumComponent implements OnInit {
    userData: User;
    userAlbums: UserAlbum[] | null;
    subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private userService: UsersService) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (response: Params) => {
                this.userData = this.userService.getUser(response.id);
            }
        );

        this.userAlbums =  this.route.snapshot.data.albums;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
