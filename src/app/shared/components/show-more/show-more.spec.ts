import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMore } from './show-more';

describe('ShowMore', () => {
  let component: ShowMore;
  let fixture: ComponentFixture<ShowMore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
