import { Component, input, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-more',
  imports: [TranslateModule],
  templateUrl: './show-more.html',
  styleUrl: './show-more.scss',
})
export class ShowMore implements OnInit {
  readonly CROP_SIZE = 280;

  text = input<string>();

  textMin = signal('');
  show = signal(false);

  get paragraphs(): string[] {
    if (this.show()) {
      return <string[]>this.text()?.split('\n');
    }

    return <string[]>this.textMin()?.split('\n');
  }

  ngOnInit(): void {
    if (this.text()!.length > this.CROP_SIZE) {
      this.textMin.set(`${this.text()?.substring(0, 280)}...`);
    } else {
      this.textMin.set(this.text()!);
    }
  }

  toggleShow(): void {
    this.show.set(!this.show());
  }
}
