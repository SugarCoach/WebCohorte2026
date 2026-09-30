import { GraphQLClient } from "graphql-request";
import { env } from "../config/env.js";

export const strapiClient = new GraphQLClient(env.STRAPI_GRAPHQL_URL, {
  headers: { Authorization: `Bearer ${env.STRAPI_API_TOKEN}` },
});
