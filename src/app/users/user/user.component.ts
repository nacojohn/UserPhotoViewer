import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    userData: User | null;
    subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private userService: UsersService) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (response: Params) => {
                this.userData = this.userService.getUser(response.id);
            }
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
