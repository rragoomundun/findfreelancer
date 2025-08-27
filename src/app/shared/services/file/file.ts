import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class File {
  private readonly API_PREFIX = 'file';

  private http = inject(HttpClient);

  deleteFile(params: { fileName: string }): Observable<null> {
    return this.http.delete<null>(this.API_PREFIX, {
      body: params,
      withCredentials: true,
    });
  }
}
