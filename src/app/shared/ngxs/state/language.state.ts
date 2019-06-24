import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {LanguageStateModel } from './state.model.collection';
import {LanguageModel} from '../../models/language.model';
import {SetLanguage} from '../actions/language.action';
import {TranslateService} from '@ngx-translate/core';
import {languageList} from '../../../config/language.config';
import { StorageHelper } from '../../helpers/storage/storage.helper';

@State<LanguageStateModel>({
    name: 'LanguageState',
    defaults: {
        // Add or Remove Languages in the language.config file found in the config folder
        currentLanguage: languageList[0],
        languageOptions: languageList
    }
})


export class LanguageState implements NgxsOnInit {
    @Selector()
    static getLanguages(state: LanguageStateModel) {
        const languageArray = new Array<string>();
        for (let i = 0; i < state.languageOptions.length; i++) {
            languageArray.push(state.languageOptions[i].fullForm);
        }
        return languageArray;
    }

    constructor(private translate: TranslateService, private storage: StorageHelper) {

    }

    ngxsOnInit(state: StateContext<LanguageStateModel>) {
        const lang = this.getUserDefaultLanguage();
        this.translate.setDefaultLang(lang);
        state.dispatch(new SetLanguage(lang));
    }

    private getUserDefaultLanguage(): string {
       const language = this.storage.getDeviceLanguage();
       if (language) {
           let found = 'en';
         languageList.forEach((lang) => {
            if (lang.abbreviation === language) {
                found = lang.abbreviation;
            }
         });
         return found;
       } else {
        return languageList[0].abbreviation;
       }
    }


    @Action(SetLanguage)
         setLanguage({getState, patchState}: StateContext<LanguageStateModel>, {payload}: SetLanguage) {
            const state = getState();
            payload = payload.toLowerCase();
            payload = payload.trim();
            let langInList = false;
            let langModel: LanguageModel;
            state.languageOptions.forEach((lang) => {
                if (lang.abbreviation === payload || lang.fullForm === payload) {
                    langInList = true;
                    langModel = lang;
                }
            });

           if (langInList) {
            this.translate.use(langModel.abbreviation);
            this.storage.setVariable('lang', langModel.abbreviation);
            patchState({
                currentLanguage: langModel
            });
           }

        }
}
