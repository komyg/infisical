import { useForm } from "react-hook-form";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FormControl, IconButton, Input, Td, Tr } from "@app/components/v2";
import { useUpdateWebsiteSecret } from "@app/hooks/api/websiteSecrets";

type Props = {
  id: string;
  consumerSecretsId: string;
  url: string;
  username: string;
  password: string;
  toggleRead: () => void;
};

type TFormSchema = {
  url: string;
  username: string;
  password: string;
};

export const WebsiteSecretEditRow = ({
  id,
  consumerSecretsId,
  url,
  username,
  password,
  toggleRead
}: Props) => {
  const { watch, register, reset } = useForm<TFormSchema>({
    defaultValues: {
      url,
      username,
      password
    }
  });
  const { mutateAsync } = useUpdateWebsiteSecret({ consumerSecretsId });

  const handleFormSubmit = async () => {
    const values = watch();
    console.log(values);
    await mutateAsync({
      id,
      url: values.url,
      username: values.username,
      password: values.password
    });
    reset();
    toggleRead();
  };

  return (
    <Tr key={id}>
      <Td>
        <FormControl>
          <Input {...register("url")} placeholder="" />
        </FormControl>
      </Td>
      <Td>
        <FormControl>
          <Input {...register("username")} placeholder="" />
        </FormControl>
      </Td>
      <Td>
        <FormControl>
          <Input {...register("password")} placeholder="" />
        </FormControl>
      </Td>
      <Td>
        <div className="flex gap-2">
          <IconButton variant="plain" ariaLabel="save" onClick={() => handleFormSubmit()}>
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
          <IconButton variant="plain" ariaLabel="cancel" onClick={() => toggleRead()}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </div>
      </Td>
    </Tr>
  );
};
