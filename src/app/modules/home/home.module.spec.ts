import {TestBed, async} from '@angular/core/testing';
import { Store} from '@ngxs/store';
import {SplashComponent} from './components/splash/splash.component';
import { APP_BASE_HREF } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';



describe('ApplicationInitiation: ', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                declarations: [
                SplashComponent,
                DashboardComponent,
            ],
        imports: [],
        providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
    ]}).compileComponents();
        store = TestBed.get(Store);
    });

    it('HomeComponent Is Initialised', async(
        () => {
           const component = TestBed.createComponent(SplashComponent);
           const application = component.debugElement.componentInstance;
           expect(application).toBeTruthy();
        }
    ));

    // it('Language Set to English', async(
    //     () => {
    //         store.dispatch(new SetLanguage('en'));
    //     store.selectOnce(state => state.LanguageState.currentLanguage).subscribe(lang => {
    //             expect(lang.abbreviation).toEqual('en');
    //           });
    //     }
    // ));

    // it('Dutch Language Set By Entering nederlands', async(
    //     () => {
    //         store.dispatch(new SetLanguage('nederlands'));
    //     store.selectOnce(state => state.LanguageState.currentLanguage).subscribe(lang => {
    //             expect(lang.abbreviation).toEqual('nl');
    //           });
    //     }
    // ));

    // it('Dutch Language Set, then Set Language to German which does not exist, current language is set in Dutch', async(
    //     () => {
    //         store.dispatch(new SetLanguage('nl'));
    //         store.dispatch(new SetLanguage('de'));
    //         store.selectOnce(state => state.LanguageState.currentLanguage).subscribe(lang => {

    //             expect(lang.abbreviation).toEqual('nl');
    //           });
    //     }
    // ));

    // it('Sent request to mock http, request took too long and timed out ', async(
    //     () => {
    //         store.dispatch(new SetTimeoutLength(500));
    //         store.dispatch(new IsLoading(1));
    //         const isloading = store.select(state => state.StatusState.isLoading);
    //         const subscription = isloading.subscribe((result) => {
    //             if (result !== 1) {
    //                 subscription.unsubscribe();
    //                 expect(result).toBe(-1);
    //             }
    //         });
    //         setTimeout(() => {
    //             store.selectOnce(state => state.StatusState.isloading).subscribe(result => {
    //                 if (result && result !== 1) {
    //                     store.dispatch(new IsLoading(0));
    //                 }                });
    //         }, 1000);
    //     }
    // ));

    // it('Timeout set while loading, loading finishes and new timeout value set', async(
    //     () => {
    //     store.dispatch(new SetTimeoutLength(1000));
    //     store.dispatch(new IsLoading(1));
    //     store.dispatch(new SetTimeoutLength(1500));
    //     setTimeout(() => {
    //         const subscription = store.selectOnce(state => state.StatusState.timeout).subscribe(result => {
    //             if (subscription) {
    //                 subscription.unsubscribe();
    //                 expect(true).toBe(true);
    //             }
    //             expect(result).toBe(1500);
    //             });
    //     }, 1200);
    //     }
    // ));

});
