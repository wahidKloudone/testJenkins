import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISelf } from 'app/shared/model/self.model';
import { SelfService } from './self.service';

@Component({
    selector: 'jhi-self-delete-dialog',
    templateUrl: './self-delete-dialog.component.html'
})
export class SelfDeleteDialogComponent {
    self: ISelf;

    constructor(private selfService: SelfService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.selfService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'selfListModification',
                content: 'Deleted an self'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-self-delete-popup',
    template: ''
})
export class SelfDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ self }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SelfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.self = self;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
