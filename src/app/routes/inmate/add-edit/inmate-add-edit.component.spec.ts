import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InmateAddEditComponent } from './inmate-add-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('InmateAddEditComponent', () => {
  let component: InmateAddEditComponent;
  let fixture: ComponentFixture<InmateAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ InmateAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
