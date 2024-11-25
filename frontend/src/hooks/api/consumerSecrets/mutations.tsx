import { MutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "@app/config/request";

import { consumerSecretsKeys } from "./queries";
import { CreateConsumerSecretsDTO } from "./types";

const createCustomerSecrets = async (name: string) => {
  const { data } = await apiRequest.post("/api/v1/consumer-secrets", { name });
  return data;
};

export const useCreateConsumerSecrets = ({
  options
}: {
  options?: Omit<MutationOptions<{}, {}, CreateConsumerSecretsDTO>, "mutationFn">;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation<{}, {}, CreateConsumerSecretsDTO>({
    mutationFn: (dto) => createCustomerSecrets(dto.name),
    onSuccess: () => {
      queryClient.invalidateQueries(consumerSecretsKeys.all());
    },
    ...options
  });
};
