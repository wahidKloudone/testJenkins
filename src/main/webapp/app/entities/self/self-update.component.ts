import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISelf } from 'app/shared/model/self.model';
import { SelfService } from './self.service';

@Component({
    selector: 'jhi-self-update',
    templateUrl: './self-update.component.html'
})
export class SelfUpdateComponent implements OnInit {
    private _self: ISelf;
    isSaving: boolean;

    constructor(private selfService: SelfService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ self }) => {
            this.self = self;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.self.id !== undefined) {
            this.subscribeToSaveResponse(this.selfService.update(this.self));
        } else {
            this.subscribeToSaveResponse(this.selfService.create(this.self));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISelf>>) {
        result.subscribe((res: HttpResponse<ISelf>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get self() {
        return this._self;
    }

    set self(self: ISelf) {
        this._self = self;
    }
}
