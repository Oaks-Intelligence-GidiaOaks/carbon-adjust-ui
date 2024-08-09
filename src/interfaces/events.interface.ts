export enum MonitoringEvent {
  NEW_PAGE_VIEW = "new-page-view",
  NEW_SUBLEVEL_EVENT = "new-sublevel-event",
  ERROR = "error",
  SUCCESS = "success",
}

export enum SubLevelEvent {
  LOGIN_USER_EVENT = "Log In User",
  LOGOUT_USER_EVENT = "Log Out User",
  ADD_TO_CART_EVENT = "Add to Basket",
  CANCEL_ADD_TO_CART_EVENT = "Cancel Add to Basket",
  ORDER_SUMMARY_EVENT = "Order Summary",
  INITIALIZE_ORDER_EVENT = "Initialize Order",
  ORDER_PAYMENT_EVENT = "Order Payment",
  ORDER_SUCCESS_EVENT = "Order Success",
  ORDER_FAILURE_EVENT = "Order Failure",
  ORDER_BOOKING_EVENT = "Order Booking",
}

// SUB-LEVEL EVENTS
export interface IAddToBasketEventPayload {
  packageId: string;
  packageName: string;
  pakageType: string;
  packageCategory: string;
  packagePrice: number;
  time: number;
  userId: string;
  eventName: SubLevelEvent;
}

export interface ICancelAddToBasketEventPayload
  extends IAddToBasketEventPayload {}

export interface IOrderSummaryEventPayload extends IAddToBasketEventPayload {}

export interface IInitializeEventPayload extends IAddToBasketEventPayload {
  country: string;
  city: string;
}

export interface IOrderEventPayload {
  orderId: string;
  userId: string;
  time: number;
  eventName: SubLevelEvent;
}

export interface IOrderPaymentEventPayload extends IOrderEventPayload {
  amount: number;
}

export interface IOrderPaymentSuccessEventPayload extends IOrderEventPayload {
  success: true;
}

export interface IOrderPaymentFailureEventPayload extends IOrderEventPayload {
  success: false;
}

export interface IOrderBookingEventPayload extends IOrderEventPayload {}

export interface ILoginEventPayload {
  userId: string;
  time: number;
  eventName: SubLevelEvent;
}

export interface ILoginOutPayload extends ILoginEventPayload {}
