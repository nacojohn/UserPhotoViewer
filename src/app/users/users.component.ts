import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    allUsers: User[] = [];
    showDefaultMessage = true;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.route.data.subscribe(
            (data: Data) => {
                this.allUsers = data['users'];
            }
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    toggleDefaultMessage(state: boolean) {
        this.showDefaultMessage = state;
    }
}
