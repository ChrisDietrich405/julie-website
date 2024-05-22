import {ApplicationApi, BaseApi} from "@/services/base.service";
import {ICartResponse} from "@/models";

const baseUrl = 'https://nominatim.openstreetmap.org/search'

export const StreetMapApi = {
  get: (search: string, format: string = 'json'): Promise<ICartResponse> =>
    BaseApi.get(`${baseUrl}`, { params: { q: search, format} }),
  getCity: ({lat, lon}: {lat: string, lon: string}, format: string = 'json'): Promise<ICartResponse> =>
    ApplicationApi.get(`${baseUrl}`, { params: { lat, lon, format} }),
}
