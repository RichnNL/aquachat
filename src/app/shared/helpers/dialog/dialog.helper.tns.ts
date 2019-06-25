import { Injectable, OnDestroy, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { LoadingModal } from '../../../modules/mobileSpecific/modals/loadingModal/loading.modal.tns';
import { SelectWorkspaceModal } from '../../../modules/mobileSpecific/modals/selectWorkspace/selectWorkspace.modal.component.tns';
import { CreateWorkspaceModal } from '../../../modules/mobileSpecific/modals/createWorkspace/createWorkspace.modal.component.tns';
import { Select } from '@ngxs/store';
import { Subscription, Observable } from 'rxjs';
@Injectable()
export class DialogHelper implements OnDestroy {
  loadingDialog: any;
  isloadingSubscription: Subscription;
  @Select(state => state.StatusState.isLoading) isLoading$: Observable<number>;
    constructor( private _modalService: ModalDialogService) {
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
      }

      closeLoadingDialog() {

      }

      openErrorDialog() {
          // Todo
      }

      openWorkspaceDialog() {

      }

      openCreateWorkspaceDialog(viewContainerRef: ViewContainerRef) {
        this._modalService.showModal(CreateWorkspaceModal, this.getFullSizeOptions(viewContainerRef))
            .then((result: string) => {
                console.log(result);
            });
      }

      openSelectWorkspaceDialog(viewContainerRef: ViewContainerRef) {
        this._modalService.showModal(SelectWorkspaceModal, this.getFullSizeOptions(viewContainerRef))
        .then((result: string) => {
            console.log(result);
        });
      }

      private getFullSizeOptions(viewContainerRef: ViewContainerRef): ModalDialogOptions{
        const options: ModalDialogOptions = {
          viewContainerRef: viewContainerRef,
          context: {},
          fullscreen: true
        };
        return options;
      }

      ngOnDestroy(): void {
       this.isloadingSubscription.unsubscribe();
      }
}
