import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditContact } from './profile-edit-contact';

describe('ProfileEditContact', () => {
  let component: ProfileEditContact;
  let fixture: ComponentFixture<ProfileEditContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
