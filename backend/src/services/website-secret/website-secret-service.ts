import { TKmsServiceFactory } from "../kms/kms-service";
import { KmsDataKey } from "../kms/kms-types";
import { TWebsiteSecretDALFactory } from "./website-secret-dal";
import { TCreateWebsiteSecretDTO, TListWebsiteSecretDTO } from "./website-secret-types";

type TWebsiteSecretsServiceFactoryDep = {
  websiteSecretDAL: TWebsiteSecretDALFactory;
  kmsService: Pick<TKmsServiceFactory, "createCipherPairWithDataKey">;
};

export type TWebsiteSecretServiceFactory = ReturnType<typeof websiteSecretsServiceFactory>;

export const websiteSecretsServiceFactory = ({ websiteSecretDAL, kmsService }: TWebsiteSecretsServiceFactoryDep) => {
  const createWebsiteSecret = async ({
    orgId,
    consumerSecretsId,
    url,
    username,
    password
  }: TCreateWebsiteSecretDTO) => {
    const { encryptor } = await kmsService.createCipherPairWithDataKey({
      type: KmsDataKey.Organization,
      orgId // TODO: use a key per consumer secret instead of the general org key.
    });

    const encryptedPassword = password ? encryptor({ plainText: Buffer.from(password) }).cipherTextBlob : undefined;

    return websiteSecretDAL.create({ consumerSecretsId, url, username, encryptedPassword });
  };

  const listWebsiteSecrets = async ({ consumerSecretsId, orgId }: TListWebsiteSecretDTO) => {
    const { decryptor } = await kmsService.createCipherPairWithDataKey({
      type: KmsDataKey.Organization,
      orgId // TODO: use a key per consumer secret instead of the general org key.
    });

    const websiteSecrets = await websiteSecretDAL.find({ consumerSecretsId });
    return websiteSecrets.map((secret) => ({
      id: secret.id,
      consumerSecretsId: secret.consumerSecretsId,
      url: secret.url,
      username: secret.username,
      password: secret.encryptedPassword
        ? decryptor({ cipherTextBlob: secret.encryptedPassword }).toString()
        : undefined,
      createdAt: secret.createdAt,
      updatedAt: secret.updatedAt
    }));
  };

  return { createWebsiteSecret, listWebsiteSecrets };
};
