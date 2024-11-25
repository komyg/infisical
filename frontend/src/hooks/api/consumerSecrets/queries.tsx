import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { createNotification } from "@app/components/notifications";
import { apiRequest } from "@app/config/request";

export const listConsumerSecrets = async () => {
  const { data } = await apiRequest.get("/api/v1/consumer-secrets");
  return data;
};

export const useListConsumerSecrets = () => {
  return useQuery({
    queryFn: () => listConsumerSecrets(),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response?.data as { message: string };
        createNotification({
          title: "Error fetching consumer secrets",
          type: "error",
          text: serverResponse.message
        });
      }
    }
  });
};
