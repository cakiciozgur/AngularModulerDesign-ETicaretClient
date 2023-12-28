import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { request } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private getUrl(requestParameter: Partial<RequestParameters>): string {

    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  private checkFullEndpoint(requestParameter: Partial<RequestParameters>): string {
    let url: string = "";

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.getUrl(requestParameter)}`;

    return url;
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {

    let url: string = this.checkFullEndpoint(requestParameter);

    url = `${url}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.get<T>(url, { headers: requestParameter.headers })

  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {

    let url: string = `${this.checkFullEndpoint(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers });

  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {

    let url: string = `${this.checkFullEndpoint(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.put<T>(url, body, { headers: requestParameter.headers });
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<T> {

    let url: string = `${this.checkFullEndpoint(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    url = `${url}/${id}`;

    return this.httpClient.delete<T>(url, { headers: requestParameter.headers });
  }

}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint? : string;
  queryString?: string;
}
