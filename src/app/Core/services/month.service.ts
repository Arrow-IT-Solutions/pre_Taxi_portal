import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { UserService } from './user.service';
import Axios from 'axios';
import { UserResponse } from 'src/app/modules/auth/auth.module';
import { MonthsRequest, MonthsSearchRequest, MonthsResponse, MonthsUpdateRequest } from 'src/app/modules/months/months.module';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  public SelectedData: PaymentResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: MonthsRequest) {
    const apiUrl = `/api/month`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: MonthsUpdateRequest) {

    const apiUrl = `/api/month`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/month/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: MonthsSearchRequest) {

    const apiUrl = `/api/month/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }
}
