import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';

import { selectFreelancer } from '../../../../shared/store/freelancer/freelancer.selectors';
import * as FreelancerActions from '../../../../shared/store/freelancer/freelancer.actions';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { ImageCropper as ImageCropperComponent } from '../../../../shared/components/image-cropper/image-cropper';

import { Countries as CountriesService } from '../../../../shared/services/countries/countries';
import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';
import { FileService } from '../../../../shared/services/file/file';

import { Freelancer } from '../../../../shared/models/Freelancer';
import { FreelancerGeneralInformation } from '../../../../shared/models/FreelancerGeneralInformation';

@Component({
  selector: 'app-profile-edit-general',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    InputComponent,
    ImageCropperComponent,
  ],
  templateUrl: './profile-edit-general.html',
  styleUrl: './profile-edit-general.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditGeneral {
  private store = inject(Store<AppState>);
  private freelancerService = inject(FreelancerService);
  private fileService = inject(FileService);

  countriesService = inject(CountriesService);

  imageCropperComponent = viewChild<ImageCropperComponent>('imageCropper');

  freelancer$: Observable<Freelancer | null | undefined>;
  image = signal<string | ArrayBuffer | Blob | null | undefined>(null);
  imageFile = signal<Blob | null>(null);
  formGroup = signal(
    new FormGroup({
      image: new FormControl(),
      town: new FormControl(),
      countryCode: new FormControl(),
      hourlyRate: new FormControl(),
    }),
  );
  formErrors = signal({
    hourlyRate: '',
  });
  onUpdate = signal('false');

  get isFileSizeInvalid(): boolean {
    return (
      this.imageFile() !== null && this.imageFile()!.size > 5 * 1024 * 1024
    );
  }

  constructor() {
    this.freelancer$ = this.store.select(selectFreelancer);

    this.freelancerService.getGeneralInformation().subscribe({
      next: (generalInformation: FreelancerGeneralInformation) => {
        this.image.set(generalInformation.image);
        this.formGroup().controls.image.setValue(generalInformation.image);
        this.formGroup().controls.town.setValue(generalInformation.town);
        this.formGroup().controls.countryCode.setValue(
          generalInformation.countryCode,
        );
        this.formGroup().controls.hourlyRate.setValue(
          generalInformation.hourlyRate,
        );
      },
    });
  }

  updateData(): void {
    const params: FreelancerGeneralInformation = {
      image: this.formGroup().controls.image.value,
      town: this.formGroup().controls.town.value,
      countryCode: this.formGroup().controls.countryCode.value,
      hourlyRate: this.formGroup().controls.hourlyRate.value,
    };

    this.freelancerService.updateGeneralInformation(params).subscribe({
      complete: () => {
        this.onUpdate.set('success');
      },
    });
  }

  onFileSelected(event: Event): void {
    this.imageCropperComponent()?.open(event);
  }

  onNewImage(blob: Blob): void {
    const reader = new FileReader();

    this.imageFile.set(blob);

    reader.onload = (e) => this.image.set(e.target?.result);

    reader.readAsDataURL(blob);

    this.image.set(blob);
  }

  onDeleteImageClick(): void {
    this.image.set('');
    this.imageFile.set(null);
  }

  onSubmit(): void {
    const originalImage = this.formGroup().controls.image.value.split(
      'findfreelancer.com/',
    )[1];

    this.onUpdate.set('true');

    if ((this.image() && originalImage) || (!this.image() && originalImage)) {
      this.formGroup().controls.image.setValue('');
      this.fileService.deleteFile({ fileName: originalImage }).subscribe();
    }

    if (!this.image() && originalImage) {
      this.store.dispatch(
        FreelancerActions.updateFreelancerImage({ image: '' }),
      );
    }

    if (this.imageFile()) {
      this.fileService.uploadFile({ file: <File>this.imageFile() }).subscribe({
        next: (value) => {
          this.image.set(value.link);
          this.formGroup().controls.image.setValue(value.link);
          this.store.dispatch(
            FreelancerActions.updateFreelancerImage({ image: value.link }),
          );

          this.updateData();
        },
      });
    } else {
      this.updateData();
    }
  }
}
