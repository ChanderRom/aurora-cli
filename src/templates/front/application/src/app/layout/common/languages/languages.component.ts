import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

// ---- customizations ----
import { NavigationService as AuroraNavigationService } from '@aurora/components/navigation/navigation.service';


@Component({
    selector       : 'languages',
    templateUrl    : './languages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'languages',
})
export class LanguagesComponent implements OnInit, OnDestroy
{
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private fuseNavigationService: FuseNavigationService,
        private auroraNavigationService: AuroraNavigationService,
        private translocoService: TranslocoService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the available languages from transloco
        this.availableLangs = this.translocoService.getAvailableLangs();

        // Subscribe to language changes
        this.translocoService.langChanges$.subscribe(activeLang =>
        {

            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            en: 'us',
            es: 'es',
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void { /**/ }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void
    {
        // Set the active lang
        this.translocoService.setActiveLang(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void
    {
        // Get the component -> navigation data -> item
        const navComponent = this.fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if (!navComponent) return null;

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get all translations from navigation translations files
        // this files are stored in src/assets/i18n/navigation
        this.translocoService
            .selectTranslation('navigation')
            .pipe(take(1))
            .subscribe(navigationTranslations =>
            {
                const flatNavigation = this.auroraNavigationService.getAllFlatNavigation(navigation);

                for (const flatNavigationItem of flatNavigation)
                {
                    // match translation navigation by id of item
                    if (navigationTranslations[flatNavigationItem.id])
                    {
                        flatNavigationItem.title = navigationTranslations[flatNavigationItem.id];
                    }
                }

                // Refresh the navigation component
                navComponent.refresh();

            });
    }
}
