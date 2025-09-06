import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditEducationEdit } from './profile-edit-education-edit';

describe('ProfileEditEducationEdit', () => {
  let component: ProfileEditEducationEdit;
  let fixture: ComponentFixture<ProfileEditEducationEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditEducationEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditEducationEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
