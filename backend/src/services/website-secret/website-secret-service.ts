import { TKmsServiceFactory } from "../kms/kms-service";
import { KmsDataKey } from "../kms/kms-types";
import { TWebsiteSecretDALFactory } from "./website-secret-dal";
import { TCreateWebsiteSecretDTO } from "./website-secret-types";

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
    const { encryptor: secretManagerEncryptor } = await kmsService.createCipherPairWithDataKey({
      type: KmsDataKey.Organization,
      orgId // TODO: use a key per consumer secret instead of the general org key.
    });

    const encryptedPassword = password
      ? secretManagerEncryptor({ plainText: Buffer.from(password) }).cipherTextBlob
      : undefined;

    return websiteSecretDAL.create({ consumerSecretsId, url, username, encryptedPassword });
  };

  return { createWebsiteSecret };
};
