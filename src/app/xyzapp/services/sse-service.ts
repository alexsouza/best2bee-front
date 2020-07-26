import { Injectable, NgZone } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SseService {
  private eventsUrl = "api/emitter/order";

  constructor(private _zone: NgZone) {}

  getServerSentEvent(): Observable<any> {
    return Observable.create((observer) => {
      const eventSource = this.getEventSource(this.eventsUrl);

      eventSource.onmessage = (event) => {
        console.log(event);
        this._zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = (error) => {
        this._zone.run(() => {
          console.log(error);
          // observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
