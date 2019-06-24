import { Injectable, ViewContainerRef } from '@angular/core';
import {ModalDialogService} from 'nativescript-angular/modal-dialog';
import { Page } from 'tns-core-modules/ui/page/page';
// import { LoadingModal } from '../../../modules/mobileSpecific/modals/loading.modal.tns';
@Injectable()
export class DialogHelper {
    loadingDialog: any;
    constructor(private page: Page) {    }

    openLoadingDialog() {
        // this.modal.showModal(LoadingModal, {fullscreen: true, viewContainerRef: this.view });
      }

      closeLoadingDialog() {
        // Todo
      }

      openErrorDialog() {
          // Todo
      }

      openWorkspaceDialog(){
        
      }
}
