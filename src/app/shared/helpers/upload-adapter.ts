import { FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";
import { FileService } from "../services/file.service";

export class UploadAdapter {
    loader;
    url;
    xhr;
    fileService;
    fomControl: FormControl;
    constructor(
        loader,
        fileService,
        fomControl
    ) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;
        this.fileService = fileService;
        this.fomControl = fomControl;
        // URL where to send files.
        this.url = environment.API_ENDPOINT + 'api/storage/image';
    }
    // Starts the upload process.
    upload(): any {
        // server.onUploadProgress( data => {
        //     loader.uploadTotal = data.total;
        //     loader.uploaded = data.uploaded;
        // } );
        return this.loader.file.then(f => this.fileService.uploadImage(f).subscribe(res => {
            this.fomControl.patchValue(this.fomControl.value.replace('<img>', `<img src="${res.data.fileUrl}"`));
        }));
        // this.fileService.uploadImage(this.loader.file).subscribe();
        // return new Promise((resolve, reject) => {
        //     this._initRequest();
        //     this._initListeners(resolve, reject);
        //     this._sendRequest();
        // });
    }

    // Aborts the upload process.
    abort(): void {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest(): void {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject): any {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest(): void {
        const data = new FormData();

        data.append('file', this.loader.file);

        this.xhr.send(data);
    }
}