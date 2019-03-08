import { Subject } from "rxjs";

export class AppLoadingService {
    public appIsLoading = new Subject<boolean>();
    public newOrder = new Subject<boolean>();
    public loggedInUser = new Subject<object>();

    constructor() {
        this.appIsLoading.next(false);
        this.newOrder.next(false);
    }
}