import { NotFoundError } from "@app/lib/errors";

import { TKmsServiceFactory } from "../kms/kms-service";
import { KmsDataKey } from "../kms/kms-types";
import { TWebsiteSecretDALFactory } from "./website-secret-dal";
import {
  TCreateWebsiteSecretDTO,
  TDeleteWebsiteSecretDTO,
  TListWebsiteSecretDTO,
  TUpdateWebsiteSecretDTO
} from "./website-secret-types";

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
    password,
    tx
  }: TCreateWebsiteSecretDTO) => {
    const { encryptor } = await kmsService.createCipherPairWithDataKey({
      type: KmsDataKey.Organization,
      orgId // TODO: use a key per consumer secret instead of the general org key.
    });

    const encryptedPassword = password ? encryptor({ plainText: Buffer.from(password) }).cipherTextBlob : undefined;

    return websiteSecretDAL.create({ consumerSecretsId, url, username, encryptedPassword }, tx);
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

  const updateWebsiteSecret = async ({ id, orgId, url, username, password, tx }: TUpdateWebsiteSecretDTO) => {
    const { encryptor, decryptor } = await kmsService.createCipherPairWithDataKey({
      type: KmsDataKey.Organization,
      orgId // TODO: use a key per consumer secret instead of the general org key.
    });

    const updateData = {
      url,
      username,
      encryptedPassword: password ? encryptor({ plainText: Buffer.from(password) }).cipherTextBlob : undefined
    };
    const filteredUpdateData = Object.fromEntries(Object.entries(updateData).filter(([, value]) => !!value));

    const updatedSecret = await websiteSecretDAL.update({ id }, { ...filteredUpdateData }, tx);
    if (!updatedSecret.length) {
      throw new NotFoundError({
        name: "website_secret_update_error",
        message: `Website secret with id ${id} not found`
      });
    }

    return {
      id: updatedSecret[0].id,
      consumerSecretsId: updatedSecret[0].consumerSecretsId,
      url: updatedSecret[0].url,
      username: updatedSecret[0].username,
      password: updatedSecret[0].encryptedPassword
        ? decryptor({ cipherTextBlob: updatedSecret[0].encryptedPassword }).toString()
        : undefined,
      createdAt: updatedSecret[0].createdAt,
      updatedAt: updatedSecret[0].updatedAt
    };
  };

  const deleteWebsiteSecret = async ({ id, tx }: TDeleteWebsiteSecretDTO) => {
    return websiteSecretDAL.delete({ id }, tx);
  };

  return { createWebsiteSecret, listWebsiteSecrets, updateWebsiteSecret, deleteWebsiteSecret };
};
