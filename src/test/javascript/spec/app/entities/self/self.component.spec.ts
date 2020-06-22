/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestGithubjekinsTestModule } from '../../../test.module';
import { SelfComponent } from 'app/entities/self/self.component';
import { SelfService } from 'app/entities/self/self.service';
import { Self } from 'app/shared/model/self.model';

describe('Component Tests', () => {
    describe('Self Management Component', () => {
        let comp: SelfComponent;
        let fixture: ComponentFixture<SelfComponent>;
        let service: SelfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestGithubjekinsTestModule],
                declarations: [SelfComponent],
                providers: []
            })
                .overrideTemplate(SelfComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SelfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelfService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Self(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.selves[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
