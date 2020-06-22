import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Self } from 'app/shared/model/self.model';
import { SelfService } from './self.service';
import { SelfComponent } from './self.component';
import { SelfDetailComponent } from './self-detail.component';
import { SelfUpdateComponent } from './self-update.component';
import { SelfDeletePopupComponent } from './self-delete-dialog.component';
import { ISelf } from 'app/shared/model/self.model';

@Injectable({ providedIn: 'root' })
export class SelfResolve implements Resolve<ISelf> {
    constructor(private service: SelfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((self: HttpResponse<Self>) => self.body));
        }
        return of(new Self());
    }
}

export const selfRoute: Routes = [
    {
        path: 'self',
        component: SelfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Selves'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'self/:id/view',
        component: SelfDetailComponent,
        resolve: {
            self: SelfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Selves'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'self/new',
        component: SelfUpdateComponent,
        resolve: {
            self: SelfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Selves'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'self/:id/edit',
        component: SelfUpdateComponent,
        resolve: {
            self: SelfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Selves'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const selfPopupRoute: Routes = [
    {
        path: 'self/:id/delete',
        component: SelfDeletePopupComponent,
        resolve: {
            self: SelfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Selves'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
