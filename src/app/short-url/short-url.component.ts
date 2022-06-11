import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {

  constructor(
    private router: Router,
    private service: DataService,
    private activedRoute: ActivatedRoute
  ) { }


  ngOnInit() {

    let urlToRoute: string = this.activedRoute.snapshot.paramMap.get('shortUrl')!;
    this.service.updateClicks(urlToRoute);

    this.service.getFullUrl(urlToRoute).subscribe((response: any) => {
      this.router.navigate(['/'], {skipLocationChange: true}).then(
        result => {
          history.replaceState({}, '', response);
          window.location.href = response;
        }
      );
    });
  }


}
