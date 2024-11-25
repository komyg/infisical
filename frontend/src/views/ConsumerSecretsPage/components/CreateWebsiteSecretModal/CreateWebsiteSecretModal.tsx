import { useForm } from "react-hook-form";

import { Button, FormControl, Input, Modal, ModalContent } from "@app/components/v2";
import { useCreateWebsiteSecret } from "@app/hooks/api/websiteSecrets/mutations";

type TFormSchema = {
  url: string;
  username: string;
  password: string;
};

type Props = {
  consumerSecretsId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateWebsiteSecretModal = ({ consumerSecretsId, isOpen, onClose }: Props) => {
  const { handleSubmit, register, reset } = useForm<TFormSchema>();
  const { mutateAsync } = useCreateWebsiteSecret({ consumerSecretsId });

  const handlerFormSubmit = async ({ url, username, password }: TFormSchema) => {
    await mutateAsync({ url, username, password });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent
        className="max-h-[80vh]"
        bodyClassName="overflow-visible"
        title="Create Secrets"
        subTitle="Create a secret across multiple environments"
        onClose={onClose}
      >
        <form noValidate onSubmit={handleSubmit(handlerFormSubmit)} className="flex flex-col gap-1">
          <FormControl label="Url" isRequired>
            <Input {...register("url")} placeholder="" />
          </FormControl>

          <FormControl label="Username" isRequired>
            <Input {...register("username")} placeholder="" />
          </FormControl>

          <FormControl label="Password" isRequired>
            <Input {...register("password")} placeholder="" />
          </FormControl>

          <div className="flex gap-4">
            <Button variant="solid" colorSchema="primary" type="submit" className="h-min py-2">
              Create Website Secret
            </Button>
            <Button variant="outline_bg" className="h-min py-2" onClick={() => onClose()}>
              Cancel
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};
