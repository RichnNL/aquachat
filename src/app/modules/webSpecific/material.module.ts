import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip'; 
@NgModule({
    declarations: [
    ],
    imports: [
        MatTooltipModule,
        MatBadgeModule,
        ScrollingModule,
        MatExpansionModule,
        MatStepperModule,
        MatInputModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule
    ],
    exports: [
        MatTooltipModule,
        MatBadgeModule,
        ScrollingModule,
        MatExpansionModule,
        MatStepperModule,
        MatInputModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: []
  })
  export class MaterialModule { }
