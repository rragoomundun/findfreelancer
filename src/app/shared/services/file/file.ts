import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly API_PREFIX = 'file';

  private http = inject(HttpClient);

  uploadFile(params: {
    file: File;
  }): Observable<{ link: string; key: string }> {
    const formData = new FormData();

    formData.append('file', params.file);

    return this.http.post<{ link: string; key: string }>(
      `${this.API_PREFIX}`,
      formData,
      { withCredentials: true },
    );
  }

  deleteFile(params: { fileName: string }): Observable<null> {
    return this.http.delete<null>(this.API_PREFIX, {
      body: params,
      withCredentials: true,
    });
  }
}
