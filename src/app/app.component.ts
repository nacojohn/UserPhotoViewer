import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { AppLoadingService } from './services/app-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-task';
    appLoading: boolean;
    subscription: Subscription;
  
    constructor(private router: Router,
                private appLoadingService: AppLoadingService) {
        router.events.subscribe(
          (routerEvent: Event) => {
            this.checkRouterEvent(routerEvent)
          }
        )
    }
  
    ngOnInit() {
      this.subscription = this.appLoadingService.appIsLoading.subscribe(
        (resp: boolean) => {
          this.appLoading = resp;
        }
      )
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart){
            this.appLoadingService.appIsLoading.next(true);
        }
  
        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
              this.appLoadingService.appIsLoading.next(false);
        }
    }
}
