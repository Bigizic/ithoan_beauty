import serviceReducer from "./containers/Services/reducers";

export type SERVICETYPE = ReturnType<typeof serviceReducer>

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
  id?: string,
  name: string,
  slug: string,
  imageUrl: string [] | string,
  description: string,
  title?: string,
  serviceArray: [SERVICEMENU]
}

