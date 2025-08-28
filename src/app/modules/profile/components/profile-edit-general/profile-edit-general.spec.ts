import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditGeneral } from './profile-edit-general';

describe('ProfileEditGeneral', () => {
  let component: ProfileEditGeneral;
  let fixture: ComponentFixture<ProfileEditGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditGeneral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditGeneral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
