import serviceReducer from "./containers/Services/reducers";

export type SERVICETYPE = ReturnType<typeof serviceReducer>
export type SERVICEMENU = {

}
export type SERVICESMENU = {
  id: string,
  name: string,
  slug: string,
  service: [SERVICEMENU],
  imageUrl: string [] | string,
  description: string,
  title: string,
}

