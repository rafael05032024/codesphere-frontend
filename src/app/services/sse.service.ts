import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

interface IEventDispatch {
  name: string;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class SSEService {
  private readonly _baseURL = 'https://codesphere-backend-npta.onrender.com';
  private readonly _events = ['SUBMISSION_EVENT'];
  private _map = {} as { [key: string]: Date };

  public connect(id: number): Observable<IEventDispatch> {
    return new Observable<IEventDispatch>((observer) => {
      const eventSource = new EventSource(`${this._baseURL}/events/${id}`);

      this._events.forEach((name: string) => {
        eventSource.addEventListener(name, (event: MessageEvent) => {
          if (
            !this._map[name] ||
            new Date().getTime() - this._map[name].getTime() > 500
          ) {
            observer.next({
              data: event.data,
              name: name,
            });

            this._map[name] = new Date();
          }
        });
      });

      eventSource.onerror = (error) => {
        console.error(error);
        observer.error(error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
