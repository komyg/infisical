import { Knex } from "knex";

export type TCreateConsumerSecretsDTO = {
  orgId: string;
  name: string;
  tx?: Knex;
};

export type TListConsumerSecretsDTO = {
  orgId: string;
};
