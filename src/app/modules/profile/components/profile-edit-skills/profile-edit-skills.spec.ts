import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditSkills } from './profile-edit-skills';

describe('ProfileEditSkills', () => {
  let component: ProfileEditSkills;
  let fixture: ComponentFixture<ProfileEditSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
