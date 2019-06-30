import {State, Action, StateContext, NgxsOnInit} from '@ngxs/store';
import {UIStateModel } from './state.model.collection';
import { ToggleSideNav, SetCanGoBack, ToggleWorkspaces, SetActionTitle,
     SetPreviousTitle, SetIconColor, SetSideSelection } from '../actions/ui.action';

@State<UIStateModel>({
    name: 'UIState',
    defaults: {
        sideNavOpen: false,
        canGoBack: false,
        showWorkspaces: false,
        actionBarTitle: null,
        iconColor: Math.floor((Math.random() * 10) + 1),
        sideSelection: 0
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

       @Action(SetIconColor)
       setIconColor({getState, patchState}: StateContext<UIStateModel>, {}: SetIconColor) {
        let icon = getState().iconColor;
        icon++;
        if (icon > 10) {
            icon = 1;
        }
        patchState({
            iconColor: icon
            });
       }

       @Action(SetSideSelection)
       setSideSelection({getState, patchState}: StateContext<UIStateModel>, {payload}: SetSideSelection) {
        const current = getState().sideSelection;
        if (current === payload) {
            payload = 0;
        }
        if (payload > 2 ) {
            payload = 0;
        }
        patchState({
            sideSelection: payload
            });
       }


}
