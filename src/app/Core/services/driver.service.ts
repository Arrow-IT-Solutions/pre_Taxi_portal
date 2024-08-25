import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { UserService } from './user.service';

import Axios from 'axios';
import { UserResponse } from 'src/app/modules/auth/auth.module';
import { DriverRequest, DriverResponse, DriverSearchRequest, DriverUpdateRequest } from 'src/app/modules/drivers/drivers.module';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  public SelectedData: DriverResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: DriverRequest) {
    const apiUrl = `/api/driver`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: DriverUpdateRequest) {

    const apiUrl = `/api/driver`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/driver/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: DriverSearchRequest) {

    const apiUrl = `/api/driver/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }
}
