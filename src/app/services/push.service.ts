import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class PushService {
  BASE_URL: string = "https://onesignal.com/api/v1/";
  REST_API_KEY: string = environment.ONESIGNAL_REST_API_KEY;
  headers: any = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: "Basic " + this.REST_API_KEY
  };
  constructor(private httpClient: HttpClient) { }

  getDevices() {
    return this.httpClient.get(
      this.BASE_URL +
      "players?app_id=" + environment.ONESIGNAL_APP_ID + "&limit=300&offset=0",
      { headers: this.headers }
    );
  }

  getNotifications() {
    return this.httpClient.get(
      this.BASE_URL + "notifications?app_id=" + environment.ONESIGNAL_APP_ID,
      { headers: this.headers }
    );
  }

  newNotifications(header: string, content: string) {
    let data = {
      app_id: environment.ONESIGNAL_APP_ID,
      included_segments: ["All"],
      data: { foo: "bar" },
      headings: { en: header },
      contents: { en: content }
    };

    this.httpClient
      .post(this.BASE_URL + "notifications", data, { headers: this.headers })
      .subscribe(response => {
        console.log(response);
      });
  }
}
