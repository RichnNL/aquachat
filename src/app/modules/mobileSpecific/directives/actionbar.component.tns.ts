import {Directive, Input} from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterHelper } from '../../../shared/helpers/router/router.helper';
import { Store, Select } from '@ngxs/store';
import { ToggleSideNav } from '../../../shared/ngxs/actions/ui.action';
import { ActionBar, ActionItem, NavigationButton } from 'tns-core-modules/ui/action-bar/action-bar';
import {isAndroid} from 'tns-core-modules/platform';
import { Observable } from 'rxjs';
import {UIState} from '../../../shared/ngxs/state/ui.state';

@Directive({
    selector:'[action-bar]'
})

export class ActionBarDirective{
      @Input('Title')
      set title(value: string) {
          if (value) {
            this.page.actionBar.title = value;
          }
        }

      private navigationBack: ActionItem;
      constructor(private page: Page, private router: RouterHelper, private store: Store) {
        this.page.actionBar = this.createActionBar();
      }
      onBack() {
         this.router.back();
      }

      onMenuToggle() {
          this.store.dispatch(new ToggleSideNav());
      }

      private createActionBar(): ActionBar {
          const bar = new ActionBar();
          bar.title = '';
          const canGoBack = this.store.selectSnapshot(UIState).canGoBack;
          if (isAndroid && canGoBack) {
              bar.navigationButton = this.getNavigationButton();
          }
          bar.actionItems.addItem(this.getMenuButton());
          bar.addCss('.action {background: #a1a0a0; color: white; text-align: center;  font-weight: bold;}');
          bar.className = 'action';
          bar.flat = true;
          return bar;
      }

      private getNavigationButton(): NavigationButton {
          const navButton = new NavigationButton();
          navButton.icon = 'res://back_red';
          navButton.on('tap', this.onBack.bind(this));
          if (isAndroid) {
              navButton.android.position = 'actionBarIfRoom';
          }
          navButton.className = 'item';
          return navButton;
      }

      private getMenuButton(): ActionItem {
          const navButton = new ActionItem();
          navButton.icon = 'res://menu_red';
          navButton.on('tap', this.onMenuToggle.bind(this));
          if (isAndroid) {
            navButton.android.position = 'actionBar';
        }
        navButton.alignSelf = 'flex-end';
          return navButton;
      }
}