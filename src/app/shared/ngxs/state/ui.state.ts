import {State, Action, StateContext, NgxsOnInit} from '@ngxs/store';
import {UIStateModel } from './state.model.collection';
import { ToggleSideNav, SetCanGoBack, ToggleWorkspaces } from '../actions/ui.action';

@State<UIStateModel>({
    name: 'UIState',
    defaults: {
        sideNavOpen: false,
        canGoBack: false,
        showWorkspaces: false
    }
})


export class UIState implements NgxsOnInit {

    constructor() {}

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
}
