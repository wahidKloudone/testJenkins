/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestGithubjekinsTestModule } from '../../../test.module';
import { SelfUpdateComponent } from 'app/entities/self/self-update.component';
import { SelfService } from 'app/entities/self/self.service';
import { Self } from 'app/shared/model/self.model';

describe('Component Tests', () => {
    describe('Self Management Update Component', () => {
        let comp: SelfUpdateComponent;
        let fixture: ComponentFixture<SelfUpdateComponent>;
        let service: SelfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestGithubjekinsTestModule],
                declarations: [SelfUpdateComponent]
            })
                .overrideTemplate(SelfUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SelfUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelfService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Self(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.self = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Self();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.self = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
