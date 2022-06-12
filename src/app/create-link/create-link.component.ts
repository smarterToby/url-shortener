import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

  url!: string;
  shortUrl: string | undefined = "https://link.tobiasreuss.tech/wwwwwwww";
  clicked: boolean = false;
  copiedToClipboard = false;

  constructor(
    private linkService: DataService,
    private _clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
  }

  createLink() {
    this.clicked = true;
    this.linkService.createUrl(this.url).subscribe(
      (response: any) => {
        this.shortUrl = "https://link.tobiasreuss.tech/" + response.short_url;
        this.clicked = false;
      }
    );
  }

  copyToClipboard() {
    this._clipboardService.copy(this.shortUrl!);
    this.copiedToClipboard = true;
    setTimeout(() => {
      this.copiedToClipboard = false;
    }, 5000);
  }

  reset() {
    this.url = "";
    this.shortUrl = undefined;
  }

}
