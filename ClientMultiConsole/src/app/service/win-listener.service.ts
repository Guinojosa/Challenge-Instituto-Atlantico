import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WinListenerService {

  constructor(private http: HttpClient) { }

  getServerInfo(ip): Promise<any>{
    const url = `http://${ip}/Commands/GetServerInfo`;
    return this.http.get<any>(url)
    .toPromise()
    .then(res => res)
    .catch(err => Promise.reject(err.error || 'Server Error'));
  }

  getCommandByPath(ip, path, command): Promise<any>{
    const url = `http://${ip}/Commands/GetCommandByPath?path=${path}&command=${command}`;
    return this.http.get<any>(url)
    .toPromise()
    .then(res => res)
    .catch(err => Promise.reject(err.error || 'Server Error'));
  }
}
