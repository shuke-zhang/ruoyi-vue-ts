import type { RouteConfigModel } from "@/model/menu";

export function getRouters() {
  return request.get<ResponseData<RouteConfigModel>>({
    url: '/getRouters',
  })
}
