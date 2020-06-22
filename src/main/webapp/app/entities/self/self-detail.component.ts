import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISelf } from 'app/shared/model/self.model';

@Component({
    selector: 'jhi-self-detail',
    templateUrl: './self-detail.component.html'
})
export class SelfDetailComponent implements OnInit {
    self: ISelf;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ self }) => {
            this.self = self;
        });
    }

    previousState() {
        window.history.back();
    }
}
