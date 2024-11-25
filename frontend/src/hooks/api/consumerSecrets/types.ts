export type ConsumerSecretsResponse = {
  id: string;
  name: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
};

export type ListConsumerSecretsDTO = ConsumerSecretsResponse[];

export type CreateConsumerSecretsDTO = {
  name: string;
};
