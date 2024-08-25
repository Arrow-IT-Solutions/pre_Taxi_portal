import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { UserService } from './user.service';
import Axios from 'axios';
import { UserResponse } from 'src/app/modules/auth/auth.module';
import { PaymentRequest, PaymentResponse, PaymentSearchRequest, PaymentUpdateRequest } from 'src/app/modules/payments/payments.module';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public SelectedData: PaymentResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: PaymentRequest) {
    const apiUrl = `/api/payment`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: PaymentUpdateRequest) {

    const apiUrl = `/api/payment`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/payment/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: PaymentSearchRequest) {

    const apiUrl = `/api/payment/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }
}
