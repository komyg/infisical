import { useForm } from "react-hook-form";

import { Button, FormControl, Input } from "@app/components/v2";
import { useCreateConsumerSecrets } from "@app/hooks/api/consumerSecrets/mutations";

type TFormSchema = {
  name: string;
};

export const EmptyConsumerSecretsPage = () => {
  const { handleSubmit, register } = useForm<TFormSchema>();
  const { mutateAsync: createConsumerSecrets } = useCreateConsumerSecrets();

  const handlerFormSubmit = async ({ name }: TFormSchema) => {
    await createConsumerSecrets({ name });
  };

  return (
    <>
      <div className="mb-6 text-lg text-mineshaft-300">
        Consumer Secrets allow you to securely store and manage secrets for your applications.
      </div>
      <div className="relative mb-6 flex justify-between rounded-md border border-mineshaft-600 bg-mineshaft-800 p-6">
        <div className="flex flex-col items-start gap-4">
          <div className="mb-1">You do not have any consumer secrets yet: </div>
          <form
            onSubmit={handleSubmit(handlerFormSubmit)}
            className="flex items-center gap-4"
            noValidate
          >
            <FormControl label="name" isRequired>
              <Input {...register("name")} placeholder="" />
            </FormControl>

            <div className="mt-1 flex h-[3.25rem] items-center">
              <Button variant="solid" colorSchema="primary" type="submit" className="h-min py-2">
                + Create Consumer Secrets
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
