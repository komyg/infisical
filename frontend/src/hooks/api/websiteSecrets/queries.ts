import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { createNotification } from "@app/components/notifications";
import { apiRequest } from "@app/config/request";

import { TListWebsiteSecretDTO, WebsiteSecretsResponse } from "./types";

export const websiteSecretKey = {
  all: () => ["website-secret"] as const,
  listWebsiteSecrets: ({ consumerSecretsId }: TListWebsiteSecretDTO) =>
    ["website-secret", { consumerSecretsId }] as const
};

const listWebsiteSecrets = async ({
  consumerSecretsId
}: TListWebsiteSecretDTO): Promise<WebsiteSecretsResponse[]> => {
  const { data } = await apiRequest.get(
    `/api/v1/consumer-secrets/${consumerSecretsId}/website-secret`
  );
  return data;
};

export const useListWebsiteSecrets = (dto: TListWebsiteSecretDTO) => {
  return useQuery<{}, {}, WebsiteSecretsResponse[]>({
    queryKey: websiteSecretKey.listWebsiteSecrets(dto),
    queryFn: () => listWebsiteSecrets(dto),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response?.data as { message: string };
        createNotification({
          title: "Error fetching Website Secrets",
          type: "error",
          text: serverResponse.message
        });
      }
    }
  });
};
