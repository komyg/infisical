import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { createNotification } from "@app/components/notifications";
import { apiRequest } from "@app/config/request";

export const consumerSecretsKeys = {
  all: () => ["consumer-secrets"] as const
};

const listConsumerSecrets = async () => {
  const { data } = await apiRequest.get("/api/v1/consumer-secrets");
  return data;
};

export const useListConsumerSecrets = () => {
  return useQuery({
    queryKey: consumerSecretsKeys.all(),
    queryFn: () => listConsumerSecrets(),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response?.data as { message: string };
        createNotification({
          title: "Error fetching user secrets",
          type: "error",
          text: serverResponse.message
        });
      }
    }
  });
};
