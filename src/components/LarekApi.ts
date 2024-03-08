import { ILarekApi, IOrder, IProduct } from "../types";
import { Api, ApiListResponse } from "./base/Api";

export class LarekApi extends Api implements ILarekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProducts(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }))
    );
  }

  makeOrder(value: IOrder): Promise<IOrder> {
    return this.post('/order', value).then(
      (data: IOrder) => data
    );
  }
}