import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api_url = 'https://st-api-url-shortener.herokuapp.com/api/v1/';

  // private api_url = 'http://localhost:5000/api/v1/';

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
  }

  private urls = this.getAllUrls();

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


  getShortUrl(fullUrl: string) {
    let tmpfullUrl = fullUrl.replace(/\//g, '|');
    return this.http.get(this.api_url + 'urls/' + tmpfullUrl + '/short-url');
  }

  getUrl(shortUrl: string) {
    return this.http.get(this.api_url + 'urls/' + shortUrl);
  }


  //create new url
  createUrl(fullUrl: string) {
    console.log("in service")
    console.log(fullUrl)
    return this.http.post<any>(this.api_url + 'createUrl', {"fullUrl": fullUrl})

  }

  //update clicks by shortUrl
  updateClicks(shortUrl: string): Observable<any> {
    return this.http.put(this.api_url + 'clicks/add/' + shortUrl, {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  isUrlAvailable(shortUrl: string): Observable<any> {
    return this.http.get(this.api_url + 'urls/' + shortUrl + '/isAvailable')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getFullUrl(shortUrl: string) {
    return this.http.get(this.api_url + 'urls/' + shortUrl + '/full-url');
  }
}


