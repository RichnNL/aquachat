import {HttpClient} from '@angular/common/http';
import * as English from '../../assets/lang/en.json';
import * as Dutch from '../../assets/lang/nl.json';
import { LanguageModel } from '../shared/models/language.model.js';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const englishLanguageModel = new LanguageModel();
englishLanguageModel.abbreviation = 'en';
englishLanguageModel.fullForm = 'english';
englishLanguageModel.file = English;
englishLanguageModel.flag = '../../assets/flags/enFlag.svg';

const dutchLanguageModel = new LanguageModel();
dutchLanguageModel.abbreviation = 'nl';
dutchLanguageModel.fullForm = 'nederlands';
dutchLanguageModel.file = Dutch;
dutchLanguageModel.flag = '../../assets/flags/nlFlag.svg';

export const languageList = [englishLanguageModel, dutchLanguageModel];

export function HttpLoaderFactory(httpClient: HttpClient)  {
    return new TranslateHttpLoader(httpClient, '../../assets/lang/');
}

