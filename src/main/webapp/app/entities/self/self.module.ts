import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestGithubjekinsSharedModule } from 'app/shared';
import {
    SelfComponent,
    SelfDetailComponent,
    SelfUpdateComponent,
    SelfDeletePopupComponent,
    SelfDeleteDialogComponent,
    selfRoute,
    selfPopupRoute
} from './';

const ENTITY_STATES = [...selfRoute, ...selfPopupRoute];

@NgModule({
    imports: [TestGithubjekinsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SelfComponent, SelfDetailComponent, SelfUpdateComponent, SelfDeleteDialogComponent, SelfDeletePopupComponent],
    entryComponents: [SelfComponent, SelfUpdateComponent, SelfDeleteDialogComponent, SelfDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestGithubjekinsSelfModule {}
