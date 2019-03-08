import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DEV_STATUS, API_URL } from './app-config';

@Injectable()
export class MakeHttpRequest {
//   private url: string = API_URL;
  private url: string = DEV_STATUS == "production" ? API_URL : "/api/";

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
                    //   .append("X-Requested-With","XMLHttpRequest")
                    //   .append("Content-Type", "text/plain")
                      .append("Authorization", "Bearer " + userAuthorization);
    } else {
    headers = new HttpHeaders()
                    .set("Accept","application/json")
                    // .append("Content-Type", "text/plain")
                    // .append("X-Requested-With","XMLHttpRequest");
    }

    return this.http.post(this.url + queryParam, postValue, {
      responseType: 'json',
      headers: headers
    })
  }

  updateRequest(queryParam: string, postValue: object, userAuthorization?) {
    let headers: HttpHeaders;

    if (userAuthorization) {
        headers = new HttpHeaders()
                      .set("Accept","application/json")
                    //   .append("X-Requested-With","XMLHttpRequest")
                    //   .append("Content-Type", "text/plain")
                      .append("Authorization", "Bearer " + userAuthorization);
    } else {
    headers = new HttpHeaders()
                    .set("Accept","application/json")
                    // .append("Content-Type", "text/plain")
                    // .append("X-Requested-With","XMLHttpRequest");
    }

    return this.http.patch(this.url + queryParam, postValue, {
      responseType: 'json',
      headers: headers
    })
  }

  deleteRequest(queryParam: string, postValue: object, userAuthorization?) {
    let headers: HttpHeaders;

    if (userAuthorization) {
        headers = new HttpHeaders()
                      .set("Accept","application/json")
                    //   .append("X-Requested-With","XMLHttpRequest")
                    //   .append("Content-Type", "text/plain")
                      .append("Authorization", "Bearer " + userAuthorization);
    } else {
    headers = new HttpHeaders()
                    .set("Accept","application/json")
                    // .append("Content-Type", "text/plain")
                    // .append("X-Requested-With","XMLHttpRequest");
    }

    return this.http.delete(this.url + queryParam, {
      responseType: 'json',
      headers: headers
    })
  }

  createFormData(object: Object, form?: FormData, namespace?: string): FormData {
      const formData = form || new FormData();
      for (let property in object) {
          if (!object.hasOwnProperty(property) || !object[property]) {
              continue;
          }
          const formKey = namespace ? `${namespace}[${property}]` : property;
          if (object[property] instanceof Date) {
              formData.append(formKey, object[property].toISOString());
          } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
              this.createFormData(object[property], formData, formKey);
          } else {
              formData.append(formKey, object[property]);
          }
      }
      return formData;
  }

  fileUpload(parameter: string, fileItem: File[] | File, extraData:object, userAuthorization): any {
    let headers: HttpHeaders = new HttpHeaders()
                  .append("Authorization", "Bearer " + userAuthorization);

      let apiCreateEndPoint = `${this.url}${parameter}`;
      let formData: FormData = new FormData();

      if (Array.isArray(fileItem)) {
        for (let i = 0; i < fileItem.length; i++) {
            if (fileItem[i]) {
                formData.append('image' + i, fileItem[i], fileItem[i].name);
            }
        }
      } else {
          console.log(fileItem)
        formData.append('image', fileItem, fileItem.name);
      }

      // formData.append('fileItem', fileItem, fileItem.name);
      if (extraData) {
          formData = this.createFormData(extraData, formData)
      }

      const req = new HttpRequest('POST', apiCreateEndPoint, formData, {
          reportProgress: true,
          responseType: 'json',
          headers: headers
      });

      return this.http.request(req);
  }

  list(): Observable<any>{
      const listEndpoint = `${this.url}files/`
      return this.http.get(listEndpoint)
  }
}
