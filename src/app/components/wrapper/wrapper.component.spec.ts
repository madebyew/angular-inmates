import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperComponent } from './wrapper.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('WrapperComponent', () => {

   let component: WrapperComponent;
   let fixture: ComponentFixture<WrapperComponent>;
   let rootElement: any;
   let nativeElement: any;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [
            RouterTestingModule
         ],
         declarations: [WrapperComponent]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(WrapperComponent);
      component = fixture.componentInstance;
      // Get the test's root element in the DOM (<div id="root0"></div>)
      rootElement = fixture.debugElement.nativeElement;
      // Get the component's root element in the DOM (in this case, <div class="star-rating"></div>)
      nativeElement = fixture.debugElement.nativeElement.children[0];
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should render .wrapper', () => {
      const elementByClass = rootElement.querySelector('.wrapper');
      expect(elementByClass).toBeTruthy();
   });

   it('should render .wrapper-main', () => {
      const elementByClass = rootElement.querySelector('.wrapper-main');
      expect(elementByClass).toBeTruthy();
   });

   it('should render .wrapper-main-nav', () => {
      const elementByClass = rootElement.querySelector('.wrapper-main-nav');
      expect(elementByClass).toBeTruthy();
   });

   it('should render .wrapper-main-outlet', () => {
      const elementByClass = rootElement.querySelector('.wrapper-main-outlet');
      expect(elementByClass).toBeTruthy();
   });

   it('should render .wrapper-main-nav-route-item for each route item', () => {
      component.navRoutes = [
         {
            label: '1',
            route: ['1']
         },
         {
            label: '2',
            route: ['2']
         }
      ];
      fixture.detectChanges();
      const elementsByClass = rootElement.querySelectorAll('.wrapper-main-nav-route-item');
      expect(elementsByClass.length).toEqual(2);
   });

   it('should render .wrapper-main-nav-action-item for each action item', () => {
      component.navActions = [
         {
            label: '1',
            onClick: () => {}
         },
         {
            label: '2',
            onClick: () => {}
         },
         {
            label: '3',
            onClick: () => {}
         }
      ];
      fixture.detectChanges();
      const elementsByClass = rootElement.querySelectorAll('.wrapper-main-nav-action-item');
      expect(elementsByClass.length).toEqual(3);
   });







});
