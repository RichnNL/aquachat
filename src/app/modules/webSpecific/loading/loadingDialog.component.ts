import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
    selector: 'app-loading-dialog',
    templateUrl: './loadingDialog.component.html',
    styleUrls: ['./loadingDialog.component.scss'],
  })
  export class LoadingDialogComponent implements OnInit {


    constructor(private dialogRef: MatDialogRef<LoadingDialogComponent>) {}


    ngOnInit() {}

    onCancelClick(): void {
    this.dialogRef.close();
  }

}

