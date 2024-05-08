import {ApplicationApi, BaseApi} from "@/services/base.service";
import {ICartItem} from "@/models";
import {IPaymentIntentResponse} from "@/models/stripe.models";

export const StripeApi = {
  CreatePaymentIntent: (items: ICartItem[]): Promise<IPaymentIntentResponse> =>
    ApplicationApi.post('/api/create-payment-intent', {items}),
}