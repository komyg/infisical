import { TConsumerSecretsDALFactory } from "./consumer-secrets-dal";
import { TCreateConsumerSecretsDTO, TListConsumerSecretsDTO } from "./consumer-secrets-types";

type TConsumerSecretsServiceFactoryDep = {
  consumerSecretsDAL: TConsumerSecretsDALFactory;
};

export type TConsumerSecretsServiceFactory = ReturnType<typeof consumerSecretsServiceFactory>;

export const consumerSecretsServiceFactory = ({
  consumerSecretsDAL: consumerSecretDAL
}: TConsumerSecretsServiceFactoryDep) => {
  const createConsumerSecret = async ({ orgId, name, tx: trx }: TCreateConsumerSecretsDTO) => {
    return consumerSecretDAL.create({ orgId, name }, trx);
  };

  const listConsumerSecrets = async ({ orgId }: TListConsumerSecretsDTO) => {
    return consumerSecretDAL.find({ orgId });
  };

  return { createConsumerSecret, listConsumerSecrets };
};
