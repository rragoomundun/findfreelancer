import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditLanguages } from './profile-edit-languages';

describe('ProfileEditLanguages', () => {
  let component: ProfileEditLanguages;
  let fixture: ComponentFixture<ProfileEditLanguages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditLanguages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditLanguages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
