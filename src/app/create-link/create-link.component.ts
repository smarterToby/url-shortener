import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ClipboardService} from "ngx-clipboard";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

  url!: string;
  shortUrl: string | undefined;
  clicked: boolean = false;
  copiedToClipboard = false;
  urlGroup: FormGroup;


  constructor(
    private linkService: DataService,
    private _clipboardService: ClipboardService,
    fb: FormBuilder
  ) {
    this.urlGroup = fb.group({
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    })
  }


  get urlFormControl() {
    return this.urlGroup.controls;
  }


  ngOnInit(): void {
  }

  createLink() {
    if(this.urlGroup.valid) {
      this.clicked = true;
      this.linkService.createUrl(this.url).subscribe(
        (response: any) => {
          this.shortUrl = "https://link.tobiasreuss.tech/" + response.short_url;
          this.clicked = false;
        }
      );
    }

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
