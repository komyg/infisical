import { MutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "@app/config/request";

import { websiteSecretKey } from "./queries";
import { TCreateWebsiteSecretDTO, TDeleteWebsiteSecretDTO, TUpdateWebsiteSecretDTO } from "./types";

const createWebsiteSecret = async ({
  consumerSecretsId,
  url,
  username,
  password
}: TCreateWebsiteSecretDTO) => {
  const { data } = await apiRequest.post(
    `/api/v1/consumer-secrets/${consumerSecretsId}/raw/website-secret`,
    { url, username, password }
  );
  return data;
};

export const useCreateWebsiteSecret = ({
  consumerSecretsId,
  options
}: {
  consumerSecretsId: string;
  options?: Omit<
    MutationOptions<{}, {}, Omit<TCreateWebsiteSecretDTO, "consumerSecretsId">>,
    "mutationFn"
  >;
}) => {
  const queryClient = useQueryClient();

  return useMutation<{}, {}, Omit<TCreateWebsiteSecretDTO, "consumerSecretsId">>({
    mutationFn: (dto) => createWebsiteSecret({ ...dto, consumerSecretsId }),
    onSuccess: () => {
      queryClient.invalidateQueries(websiteSecretKey.listWebsiteSecrets({ consumerSecretsId }));
    },
    onError: (error) => {
      console.error(error);
    },
    ...options
  });
};

const deleteWebsiteSecret = async ({ consumerSecretsId, id }: TDeleteWebsiteSecretDTO) => {
  return apiRequest.delete(
    `/api/v1/consumer-secrets/${consumerSecretsId}/raw/website-secret/${id}`
  );
};

export const useDeleteWebsiteSecret = ({
  consumerSecretsId,
  options
}: {
  consumerSecretsId: string;
  options?: Omit<
    MutationOptions<{}, {}, Omit<TDeleteWebsiteSecretDTO, "consumerSecretsId">>,
    "mutationFn"
  >;
}) => {
  const queryClient = useQueryClient();

  return useMutation<{}, {}, Omit<TDeleteWebsiteSecretDTO, "consumerSecretsId">>({
    mutationFn: async (dto) => deleteWebsiteSecret({ ...dto, consumerSecretsId }),
    onSuccess: () => {
      queryClient.invalidateQueries(websiteSecretKey.listWebsiteSecrets({ consumerSecretsId }));
    },
    onError: (error) => {
      console.error(error);
    },
    ...options
  });
};

const updateWebsiteSecret = async ({
  id,
  consumerSecretsId,
  url,
  username,
  password
}: TUpdateWebsiteSecretDTO) => {
  const { data } = await apiRequest.patch(
    `/api/v1/consumer-secrets/${consumerSecretsId}/raw/website-secret/${id}`,
    {
      url,
      username,
      password
    }
  );
  return data;
};

export const useUpdateWebsiteSecret = ({
  consumerSecretsId,
  options
}: {
  consumerSecretsId: string;
  options?: Omit<
    MutationOptions<{}, {}, Omit<TUpdateWebsiteSecretDTO, "consumerSecretsId">>,
    "mutationFn"
  >;
}) => {
  const queryClient = useQueryClient();

  return useMutation<{}, {}, Omit<TUpdateWebsiteSecretDTO, "consumerSecretsId">>({
    mutationFn: async (dto) => updateWebsiteSecret({ ...dto, consumerSecretsId }),
    onSuccess: () => {
      queryClient.invalidateQueries(websiteSecretKey.listWebsiteSecrets({ consumerSecretsId }));
    },
    onError: (error) => {
      console.error(error);
    },
    ...options
  });
};
