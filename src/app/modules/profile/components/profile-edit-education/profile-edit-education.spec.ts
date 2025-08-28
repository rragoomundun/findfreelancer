import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditEducation } from './profile-edit-education';

describe('ProfileEditEducation', () => {
  let component: ProfileEditEducation;
  let fixture: ComponentFixture<ProfileEditEducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditEducation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditEducation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
