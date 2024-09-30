import createClient from "openapi-fetch";
import type { paths } from "./strapi";
import qs from "qs";

const client = createClient<paths>({
  baseUrl: process.env.STRAPI_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.STRAPI_AUTHORIZATION_TOKEN}`,
  },
  querySerializer(params) {
    return qs.stringify(params, {
      encodeValuesOnly: true, // prettify URL
    });
  },
});
export { client };
