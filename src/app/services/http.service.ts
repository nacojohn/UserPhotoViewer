import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MakeHttpRequest {
  private url: string = "https://jsonplaceholder.typicode.com/";

  constructor(private http: HttpClient) {  }

  requestFromServer(queryParam: string, userAuthorization?) {
    let headers: HttpHeaders;

    if (userAuthorization) {
      headers = new HttpHeaders()
                    .set("Accept","application/json")
                    .append("Authorization", "Bearer " + userAuthorization);
    } else {
      headers = new HttpHeaders()
                    .set("Accept","application/json");
    }

    const req = new HttpRequest('GET', this.url + queryParam, {
        observe: 'json',
        headers: headers
    });

    return this.http.request(req);
  }

  postToServer(queryParam: string, postValue: object, userAuthorization?) {
    let headers: HttpHeaders;

    if (userAuthorization) {
        headers = new HttpHeaders()
                      .set("Accept","application/json")
                      .append("Authorization", "Bearer " + userAuthorization);
    } else {
        headers = new HttpHeaders()
                    .set("Accept","application/json");
    }

    return this.http.post(this.url + queryParam, postValue, {
      responseType: 'json',
      headers: headers
    })
  }
}
