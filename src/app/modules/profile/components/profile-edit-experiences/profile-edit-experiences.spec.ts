import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditExperiences } from './profile-edit-experiences';

describe('ProfileEditExperiences', () => {
  let component: ProfileEditExperiences;
  let fixture: ComponentFixture<ProfileEditExperiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditExperiences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditExperiences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
