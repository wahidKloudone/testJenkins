import { NgModule } from '@angular/core';

import { TestGithubjekinsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TestGithubjekinsSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TestGithubjekinsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TestGithubjekinsSharedCommonModule {}
