import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditExperiencesEdit } from './profile-edit-experiences-edit';

describe('ProfileEditExperiencesEdit', () => {
  let component: ProfileEditExperiencesEdit;
  let fixture: ComponentFixture<ProfileEditExperiencesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditExperiencesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditExperiencesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
