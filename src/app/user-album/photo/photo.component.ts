import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/user.model';
import { UserAlbum } from '../user-album';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { Photo } from './photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
    userData: User;
    album: UserAlbum | null;
    photos: Photo[] | null;
    subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private userService: UsersService) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (response: Params) => {
                this.userData = this.userService.getUser(response.id);
            }
        );

        this.photos =  this.route.snapshot.data.photos;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
