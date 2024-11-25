export type TCreateWebsiteSecretDTO = {
  consumerSecretsId: string;
  url: string;
  username: string;
  password: string;
};

export type TListWebsiteSecretDTO = {
  consumerSecretsId: string;
};

export type TUpdateWebsiteSecretDTO = {
  id: string;
  url?: string;
  username?: string;
  password?: string;
};

export type TDeleteWebsiteSecretDTO = {
  id: string;
  consumerSecretsId: string;
};

export type WebsiteSecretsResponse = {
  id: string;
  consumerSecretsId: string;
  url: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
