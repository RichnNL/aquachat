import {MatDialog} from '@angular/material';
import {LoadingDialogComponent} from '../../..//modules/webSpecific/loading/loadingDialog.component';
import { ErrorDialogComponent } from '../../../modules/webSpecific/errorDialog/errorDialog.component';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IsLoading } from '../../ngxs/actions/appStatus.action';
import { AddWorkspaceDialogComponent } from '../../..//modules/webSpecific/addWorkspace/addWorkspaceDialog.component';


@Injectable()
export class DialogHelper {
    loadingDialog: any;
    @Select(state => state.StatusState.isLoading) isLoading$: Observable<number>;
    constructor(private dialog: MatDialog, private store: Store) {
      this.isLoading$.subscribe((loading) => {
        if (loading === 1) {
          this.openLoadingDialog();
        } else if (loading === 0) {
          this.closeLoadingDialog();
        }  else if (loading === -1) {
          this.closeLoadingDialog();
          this.openErrorDialog();
        }
      });
    }

    openLoadingDialog() {
        this.loadingDialog = this.dialog.open(LoadingDialogComponent, { disableClose: true, height: '250px',
        width: '250px', panelClass: 'loadingpanel' });
      }

      closeLoadingDialog() {
          if (this.loadingDialog) {
              this.loadingDialog.close();
          }

      }

      openErrorDialog() {
        this.dialog.open(ErrorDialogComponent, { disableClose: false, height: '250px',
        width: '250px', panelClass: 'loadingpanel', data: 'Request Timeout' });
      }

      openWorkspaceDialog() {
        this.dialog.open(AddWorkspaceDialogComponent, { disableClose: false, height: '300px',
        width: '500px' });
      }
}

