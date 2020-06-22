import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISelf } from 'app/shared/model/self.model';
import { Principal } from 'app/core';
import { SelfService } from './self.service';

@Component({
    selector: 'jhi-self',
    templateUrl: './self.component.html'
})
export class SelfComponent implements OnInit, OnDestroy {
    selves: ISelf[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private selfService: SelfService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.selfService.query().subscribe(
            (res: HttpResponse<ISelf[]>) => {
                this.selves = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSelves();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISelf) {
        return item.id;
    }

    registerChangeInSelves() {
        this.eventSubscriber = this.eventManager.subscribe('selfListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
