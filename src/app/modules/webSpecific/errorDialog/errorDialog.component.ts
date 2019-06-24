import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'app-error-dialog',
    templateUrl: './errorDialog.component.html',
    styleUrls: ['./errorDialog.component.scss'],
  })
  export class ErrorDialogComponent implements OnInit {


    constructor(private dialogRef: MatDialogRef<ErrorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string) {}

    ngOnInit() {}

    onCancelClick(): void {
    this.dialogRef.close();
  }

}
