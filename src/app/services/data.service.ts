import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api_url = 'https://st-api-url-shortener.herokuapp.com/api/v1/';

  constructor(private http: HttpClient) {
  }

  //handle error
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  //get all urls
  getAllUrls(): Observable<any> {
    return this.http.get(this.api_url + 'urls')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //get fullUrl by shortUrl
  getUrlDataByShortUrl(shortUrl: string): Observable<any> {
    return this.http.get(this.api_url + 'urls/' + shortUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //get clicks by shortUrl
  getClicks(shortUrl: string): Observable<any> {
    return this.http.get(this.api_url + 'urls/' + shortUrl + '/clicks')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //get fullUrl by shortUrl
  getFullUrl(shortUrl: string): Observable<any> {
    return this.http.get(this.api_url + 'urls/' + shortUrl + '/full-url')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //get shortUrl by fullUrl
  getShortUrl(fullUrl: string): Observable<any> {
    return this.http.get(this.api_url + 'urls/' + fullUrl + '/short-url')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //create new url
  createUrl(fullUrl: string): Observable<any> {
    return this.http.post(this.api_url + 'createUrl', {fullUrl: fullUrl})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //update clicks by shortUrl
  updateClicks(shortUrl: string): Observable<any> {
    return this.http.put(this.api_url + 'clicks/add' + shortUrl, {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

}
