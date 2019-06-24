import { Component, ViewChild, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable} from 'rxjs';
import { LanguageModel } from '../../../../shared/models/language.model';
import { SetLanguage } from '../../../../shared/ngxs/actions/language.action';

@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
  })
  export class LanguageSelectorComponent implements OnInit {
    @ViewChild('langselector') langSelector;
    @Select (state => state.LanguageState.currentLanguage) currentLang$: Observable<LanguageModel>;
    @Select(state => state.LanguageState.languageOptions) languageList$: Observable<LanguageModel[]>;
    language = new LanguageModel();
    langIcon = '../../../../assets/icons/langLogoIn.svg';
    langIconOpened = false;
    constructor(private store: Store) {
      this.currentLang$.subscribe((lang) => {
        this.language = lang;
      });
    }

    languageClicked(lang: LanguageModel) {
        this.language = lang;
        this.store.dispatch(new SetLanguage(this.language.abbreviation));
    }

    ngOnInit() {
        this.langSelector.openedChange.subscribe((open) => {
          if (!this.langIconOpened && open) {
            this.langIcon = '../../../../assets/icons/langLogoOut.svg' + this.preventCache();
          } else if (this.langIconOpened && !open) {
            this.langIcon = '../../../../assets/icons/langLogoIn.svg' + this.preventCache();
          }
          this.langIconOpened = open;
        }
        );
    }

    private preventCache(): string {
        return '?id=' + Math.floor((Math.random() * 1000) + 1).toString();
    }
  }
