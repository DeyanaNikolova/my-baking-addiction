import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit{

  @Input()initialText: string = '';
  @Input() submitLabel: string = '';
  @Input() hasCancelButton: boolean = false;

  fb = inject(FormBuilder);

  titleCtrl = new FormControl(this.initialText, [Validators.required, Validators.maxLength(350)]);

  commentForm: FormGroup = new FormGroup({title: this.titleCtrl});

  @Output() handleSubmit = new EventEmitter<string>();

   ngOnInit(): void {
    this.commentForm;
   }

   submit(){
    if(this.commentForm.value){
      this.handleSubmit.emit(this.commentForm.value.title);
      this.commentForm.reset();
    }
   }
}
