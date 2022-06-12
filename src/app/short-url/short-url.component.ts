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
    private activedRoute: ActivatedRoute,
    private document: Document
  ) { }


  ngOnInit() {

    let urlToRoute: string = this.activedRoute.snapshot.paramMap.get('shortUrl')!;
    this.service.updateClicks(urlToRoute);

    this.service.getFullUrl(urlToRoute).subscribe((response: any) => {

      if (response.error ===  'Url not found') {
        this.router.navigate(['/404/' + urlToRoute]);
      }else {
        document.location = response.toString();
      }
    });
  }


}
