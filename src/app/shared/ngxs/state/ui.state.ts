import {State, Action, StateContext, NgxsOnInit} from '@ngxs/store';
import {UIStateModel } from './state.model.collection';
import { ToggleSideNav, SetCanGoBack, ToggleWorkspaces, SetActionTitle, SetPreviousTitle } from '../actions/ui.action';

@State<UIStateModel>({
    name: 'UIState',
    defaults: {
        sideNavOpen: false,
        canGoBack: false,
        showWorkspaces: false,
        actionBarTitle: null
    }
})


export class UIState implements NgxsOnInit {

    constructor() {}
    private previousValue: string;
    ngxsOnInit(state: StateContext<UIStateModel>) {}


    @Action(ToggleSideNav)
         toggleSideNav({getState, patchState}: StateContext<UIStateModel>, {}: ToggleSideNav) {
            const state = getState();
            let open = state.sideNavOpen;
            open = !open;
            patchState({
                sideNavOpen: open
            });
           }
    @Action(SetCanGoBack)
    setCanGoBack({getState, patchState}: StateContext<UIStateModel>, {payload}: SetCanGoBack) {
        patchState({
            canGoBack: payload
        });
       }

       @Action(ToggleWorkspaces)
       toggleWorkspaces({getState, patchState}: StateContext<UIStateModel>, {}: ToggleWorkspaces) {
        const bol = !getState().showWorkspaces;
        patchState({
            showWorkspaces: bol
        });
       }

       @Action(SetActionTitle)
       setActionTitle({getState, patchState}: StateContext<UIStateModel>, {payload}: SetActionTitle) {
        const current = getState().actionBarTitle;
        if (current != null) {
            if (current.length > 0) {
                this.previousValue = current;
            }
        }

        patchState({
            actionBarTitle: payload
        });
       }

       @Action(SetPreviousTitle)
       setPreviousTitle({getState, patchState}: StateContext<UIStateModel>, {}: SetPreviousTitle) {
        if (this.previousValue != null) {
            patchState({
                actionBarTitle: this.previousValue
            });
        }
       }
}
