/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestGithubjekinsTestModule } from '../../../test.module';
import { SelfDetailComponent } from 'app/entities/self/self-detail.component';
import { Self } from 'app/shared/model/self.model';

describe('Component Tests', () => {
    describe('Self Management Detail Component', () => {
        let comp: SelfDetailComponent;
        let fixture: ComponentFixture<SelfDetailComponent>;
        const route = ({ data: of({ self: new Self(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestGithubjekinsTestModule],
                declarations: [SelfDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SelfDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SelfDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.self).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
