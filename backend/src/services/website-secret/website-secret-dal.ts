import { TDbClient } from "@app/db";
import { TableName } from "@app/db/schemas";
import { ormify } from "@app/lib/knex";

export type TWebsiteSecretDALFactory = ReturnType<typeof websiteSecretDALFactory>;

export const websiteSecretDALFactory = (db: TDbClient) => {
  const websiteSecretsOrm = ormify(db, TableName.WebsitesSecrets);
  return websiteSecretsOrm;
};
