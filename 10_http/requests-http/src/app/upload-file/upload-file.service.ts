import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file, file.name));
    //const request = new HttpRequest('POST', url, formData);

    //return this.http.request(request);
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
      //reportProgress
      // content-length
    });
  }

  handleFiles(res: any, filename: string) {
    const file = new Blob([res], {
      type: res.type,
    });

    //IE
    const isMicrosoftBrowser =
      !!window.navigator.userAgent.match(/(Trident|Edge)/);

    if (isMicrosoftBrowser) {
      const nav = window.navigator as any;
      if (nav && nav.msSaveOrOpenBlob) {
        nav.msSaveOrOpenBlob(file);
      }
    }
    //Fim IE
    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = filename;
    link.click();

    //link click()

    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // para firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    });
  }
}
