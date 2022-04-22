import { BaseService } from 'src/app/shared/services/base.service';
import { Inject, Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { eventEmitterService } from 'src/app/global';
import * as uuid from 'uuid';
import { HttpClient } from '@angular/common/http';


export class FileUploadController {
  file?: File;
  fileDataURL: string;
  progress: Promise<any>;
  uploading: Subscription;
  id: string;
  fileEventName: string;
  fileUrl: string;

  constructor(
    file: File, uploadProgress: Observable<any>, item: any
  ) {
    this.file = file;
    this.fileDataURL = URL.createObjectURL(file);

    this.fileEventName = `file_upload_${uuid.v4()}`;

    this.progress = new Promise((resolve, reject) => {
      eventEmitterService.on(this.fileEventName, (error) => {
        if (error) {
          reject(error);
        } else {
          this.progress = null ;
          this.uploading = null ;
          resolve(null);
        }
      });
    });
    this.uploading = uploadProgress.subscribe(
      (data) => {
        this.id = data.data.imageID;
        this.fileUrl = data.data.fileUrl;
        eventEmitterService.emit(this.fileEventName);
        item.onSuccess(item.file);
      },
      (error) => {
        item.onError('error', item.file);
        eventEmitterService.emit(this.fileEventName, error);
      }
    );
  }

  destroy() {
    if (this.uploading) {
      this.uploading.unsubscribe();
      this.uploading = null ;
    }
    if (this.progress) {
      this.progress = null ;
    }
    this.id = null ;
  }
}

@Injectable({
  providedIn: 'root',
})

export class FileService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  uploadImage(file: File): Observable<any> {
    const url = `api/Storage/images/upload`;
    const form = new FormData();
    form.append('file', file);
    return this.post<any>(url, form);
  }
}