import { TDbClient } from "@app/db";
import { TableName } from "@app/db/schemas";
import { ormify } from "@app/lib/knex";

export type TConsumerSecretsDALFactory = ReturnType<typeof consumerSecretsDALFactory>;

export const consumerSecretsDALFactory = (db: TDbClient) => {
  const consumerSecretOrm = ormify(db, TableName.ConsumerSecrets);
  return consumerSecretOrm;
};
