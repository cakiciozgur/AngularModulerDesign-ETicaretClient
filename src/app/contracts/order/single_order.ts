//public class GetOrderByIdQueryResponse {
//  public string Id { get; set; }
//        public string OrderCode { get; set; }
//        public string Address { get; set; }
//        public string Description { get; set; }
//        public List < DTOs.Order.SingleOrderBasketItem > BasketItems { get; set; }
//        public DateTime CreatedDate { get; set; }
//    }


export class Single_Order {
  id: string;
  orderCode: string;
  address: string;
  description: string;
  basketItems: Basket_Item[];
  createdDate: Date;
}

export class Basket_Item {
  name: string;
  price: number;
  quantity: number;
}
