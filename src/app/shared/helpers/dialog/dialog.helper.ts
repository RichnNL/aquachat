import {MatDialog} from '@angular/material';
import {LoadingDialogComponent} from '../../..//modules/webSpecific/loading/loadingDialog.component';
import { ErrorDialogComponent } from '../../../modules/webSpecific/errorDialog/errorDialog.component';
import { Injectable, OnDestroy, ViewContainerRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AddWorkspaceDialogComponent } from '../../..//modules/webSpecific/addWorkspace/addWorkspaceDialog.component';


@Injectable()
export class DialogHelper implements OnDestroy {

    loadingDialog: any;
    isloadingSubscription: Subscription;
    @Select(state => state.StatusState.isLoading) isLoading$: Observable<number>;
    constructor(private dialog: MatDialog, private store: Store) {
     this.isloadingSubscription = this.isLoading$.subscribe((loading) => {
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

      
      openSelectWorkspaceDialog(viewContainerRef: ViewContainerRef) {
        this.openWorkspaceDialog();
      }

      openCreateWorkspaceDialog(viewContainerRef: ViewContainerRef) {
        this.openWorkspaceDialog();
      }

      openErrorDialog() {
        this.dialog.open(ErrorDialogComponent, { disableClose: false, height: '250px',
        width: '250px', panelClass: 'loadingpanel', data: 'Request Timeout' });
      }

      openWorkspaceDialog() {
        this.dialog.open(AddWorkspaceDialogComponent, { disableClose: false, height: '500px',
        width: '350px'  });
      }

      ngOnDestroy(): void {
        this.isloadingSubscription.unsubscribe();
      }
}

