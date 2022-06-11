import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

  url!: string;
  shortUrl: string | undefined;

  constructor(
    private linkService: DataService
  ) { }

  ngOnInit(): void {
  }

  createLink() {
    this.linkService.createUrl(this.url).subscribe(
      (response: any) => {
        this.shortUrl = response.short_url;
      }
    );

  }

}
