import { TConsumerSecretDALFactory } from "./consumer-secret-dal";
import { TCreateConsumerSecretDTO, TListConsumerSecretsDTO } from "./consumer-secret-types";

type TConsumerSecretServiceFactoryDep = {
  consumerSecretDAL: TConsumerSecretDALFactory;
};

export type TConsumerSecretServiceFactory = ReturnType<typeof consumerSecretServiceFactory>;

export const consumerSecretServiceFactory = ({ consumerSecretDAL }: TConsumerSecretServiceFactoryDep) => {
  const createConsumerSecret = async ({ orgId, name, tx: trx }: TCreateConsumerSecretDTO) => {
    return consumerSecretDAL.create({ orgId, name }, trx);
  };

  const listConsumerSecrets = async ({ orgId }: TListConsumerSecretsDTO) => {
    return consumerSecretDAL.find({ orgId });
  };

  return { createConsumerSecret, listConsumerSecrets };
};
