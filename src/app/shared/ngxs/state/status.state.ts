import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {IsLoading, SetTimeoutLength} from '../actions/appStatus.action';
import { ApplicationStatusStateModel } from './state.model.collection';
import { load } from '@angular/core/src/render3';


@State<ApplicationStatusStateModel>({
    name: 'StatusState',
    defaults: {
        isLoading: 0,
        timeout: 5000
    }
})


export class ApplicationStatusState implements NgxsOnInit {

    constructor() {}

    ngxsOnInit(state: StateContext<ApplicationStatusStateModel>) {}



    @Action(IsLoading)
        isloading({getState, patchState}: StateContext<ApplicationStatusStateModel>, {payload}: IsLoading) {
            const time = getState().timeout;
            patchState({
                isLoading: payload
            });
            if (payload) {
                setTimeout(() => {
                    const loading = getState().isLoading;
                    if (loading === 1)  {
                        patchState({
                            isLoading: -1
                        });
                    }
                }, time);
            }
        }
    @Action(SetTimeoutLength)
       async setTimeout({getState, patchState}: StateContext<ApplicationStatusStateModel>, {payload}: SetTimeoutLength) {
            const state = getState();
            if ( state.isLoading) {
                    setTimeout(() => {
                        patchState({
                            timeout: payload
                        });
                    }, state.timeout);
            } else {
                patchState({
                    timeout: payload
                });
            }
        }
}
