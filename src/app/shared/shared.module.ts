import { NgModule, ModuleWithProviders } from '@angular/core';
import {AzureService} from '../core/authentication/azure.service';
import {TranslateModule} from '@ngx-translate/core';
import { DialogHelper } from './helpers/dialog/dialog.helper';
import { RouterHelper } from './helpers/router/router.helper';
import { StorageHelper } from './helpers/storage/storage.helper';
import { AquachatAPIService } from '../core/services/aquachatAPI.service';
import {AuthenticationGuard} from '../core/guards/authentication.guard';
import {ToastHelper} from './helpers/toast/toast.helper';
// import {SignalRService} from '../core/services/signalR.service';
@NgModule({
    declarations: [],
    imports: [TranslateModule],
    exports: [TranslateModule],
    providers: [AzureService, ToastHelper, DialogHelper, RouterHelper,
      StorageHelper, AquachatAPIService, AuthenticationGuard]
  })

  export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [],
      };
    }
   }
