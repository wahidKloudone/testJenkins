/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestGithubjekinsTestModule } from '../../../test.module';
import { SelfDeleteDialogComponent } from 'app/entities/self/self-delete-dialog.component';
import { SelfService } from 'app/entities/self/self.service';

describe('Component Tests', () => {
    describe('Self Management Delete Component', () => {
        let comp: SelfDeleteDialogComponent;
        let fixture: ComponentFixture<SelfDeleteDialogComponent>;
        let service: SelfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestGithubjekinsTestModule],
                declarations: [SelfDeleteDialogComponent]
            })
                .overrideTemplate(SelfDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SelfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelfService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
