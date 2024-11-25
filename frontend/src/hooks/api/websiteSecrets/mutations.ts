import { MutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { createNotification } from "@app/components/notifications";
import { apiRequest } from "@app/config/request";

import { websiteSecretKey } from "./queries";
import { TCreateWebsiteSecretDTO } from "./types";

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
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response?.data as { message: string };
        createNotification({
          title: "Error creating Website Secret",
          type: "error",
          text: serverResponse.message
        });
      }
    },
    ...options
  });
};
