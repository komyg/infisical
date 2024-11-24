import { Knex } from "knex";

export type TCreateConsumerSecretDTO = {
  orgId: string;
  name: string;
  tx?: Knex;
};

export type TListConsumerSecretsDTO = {
  orgId: string;
};
