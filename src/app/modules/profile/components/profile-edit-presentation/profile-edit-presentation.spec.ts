import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPresentation } from './profile-edit-presentation';

describe('ProfileEditPresentation', () => {
  let component: ProfileEditPresentation;
  let fixture: ComponentFixture<ProfileEditPresentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditPresentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
