import {
  Component,
  ElementRef,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ImageCropperComponent,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  imports: [TranslateModule, ImageCropperComponent],
  templateUrl: './image-cropper.html',
  styleUrl: './image-cropper.scss',
})
export class ImageCropper {
  private modalService = inject(NgbModal);
  private sanitizer = inject(DomSanitizer);

  modalEl = viewChild<ElementRef>('modal');
  newImage = output<Blob>();

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  blob: Blob | null = null;

  open(event: Event): void {
    this.imageChangedEvent = event;
    this.modalService.open(this.modalEl());
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      <string>event.objectUrl,
    );
    this.blob = <Blob>event.blob;

    console.log(this.croppedImage);
  }

  onCropClick(): void {
    this.newImage.emit(<Blob>this.blob);
    this.modalService.dismissAll();
  }
}
