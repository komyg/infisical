import { Knex } from "knex";

export type TCreateWebsiteSecretDTO = {
  orgId: string;
  consumerSecretsId: string;
  url: string;
  username: string;
  password: string;
  tx?: Knex;
};

export type TListWebsiteSecretDTO = {
  consumerSecretsId: string;
  orgId: string;
  url: string;
  username: string;
  password: Buffer;
};

export type TUpdateWebsiteSecretDTO = {
  id: string;
  consumerSecretsId: string;
  orgId: string;
  url?: string;
  username?: string;
  password?: string;
  tx?: Knex;
};

export type TDeleteWebsiteSecretDTO = {
  id: string;
  tx?: Knex;
};
