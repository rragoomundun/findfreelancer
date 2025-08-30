import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';

@Component({
  selector: 'app-profile-edit-skills',
  imports: [ReactiveFormsModule, TranslateModule, DragDropModule],
  templateUrl: './profile-edit-skills.html',
  styleUrl: './profile-edit-skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditSkills implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private freelancerService = inject(FreelancerService);

  formGroup = signal(
    new FormGroup({
      skills: new FormArray<FormControl<string | null>>([]),
    }),
  );
  onUpdate = signal('false');

  constructor() {}

  ngOnInit(): void {
    this.freelancerService.getSkills().subscribe({
      next: (value: { skills: string[] }) => {
        for (const skill of value.skills) {
          this.formGroup().controls.skills.push(new FormControl(skill));
        }

        this.changeDetectorRef.markForCheck();
      },
    });
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(
      this.formGroup().controls.skills.controls,
      event.previousIndex,
      event.currentIndex,
    );
  }

  onDeleteSkillClick(index: number): void {
    this.formGroup().controls.skills.removeAt(index);
  }

  onAddNewSkillClick(): void {
    this.formGroup().controls.skills.push(new FormControl(''));
  }

  onSubmit(): void {
    const skills = [];

    this.onUpdate.set('true');

    for (const control of this.formGroup().controls.skills.controls) {
      if (control.value) {
        skills.push(control.value);
      }
    }

    this.freelancerService
      .updateSKills({ skills: <string[]>skills })
      .subscribe({
        complete: () => {
          this.onUpdate.set('success');
        },
      });
  }
}
