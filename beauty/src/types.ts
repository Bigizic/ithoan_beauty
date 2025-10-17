import serviceReducer from "./containers/Services/reducers";
import bookingReducer from "./containers/Booking/reducers";

export type SERVICETYPE = ReturnType<typeof serviceReducer>
export type BOOKINGTYPE = ReturnType<typeof bookingReducer>

export type SERVICEAVAILABILITY = {
  day: string,
  timeRanges: [{
    startHour: number
    startMinute: number
    endHour: number
    endMinute: number
  }]
}

export type SERVICEMENU = {
  _id: string;
  name: string;
  description: string;
  slug: string;

  price: number;
  discount: number;
  discountPrice: number;
  duration: number;

  imageUrl: string[]; 
  availability: SERVICEAVAILABILITY[];

  isActive: boolean;
  isDiscounted: boolean;

  created: string;
  updated: string;
};


export type SERVICESMENU = {
  _id: string,
  name: string,
  slug: string,
  imageUrl: string [] | string,
  description: string,
  title?: string,
  serviceArray: [SERVICEMENU]
}

export type ACTIONPROPS = {
  type: string
  payload?: any
}
