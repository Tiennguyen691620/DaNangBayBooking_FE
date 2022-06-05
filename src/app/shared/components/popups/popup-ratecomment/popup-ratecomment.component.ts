import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popup-ratecomment',
  templateUrl: './popup-ratecomment.component.html',
  styleUrls: ['./popup-ratecomment.component.scss'],
})
export class PopupRatecommentComponent implements OnInit {
  form: FormGroup;
  tooltips = ['Tệ', 'Không tốt', 'Bình thường', 'Hoàn hảo', 'Tuyệt vời'];
  value = 5;
  constructor(private fb: FormBuilder, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      description: [null, [Validators.required]],
      rating: [null, [Validators.required]],
      title: null,
    });
  }

  acceptModal(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.modal.destroy({
        description: formValue.description,
        rating: formValue.rating,
        title: formValue.title,
      });
    }
  }

  closeModal(): void {
    this.modal.destroy(null);
  }
}
