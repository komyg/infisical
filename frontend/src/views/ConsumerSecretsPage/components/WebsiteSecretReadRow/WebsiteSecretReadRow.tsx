import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconButton, Td, Tr } from "@app/components/v2";
import { useDeleteWebsiteSecret } from "@app/hooks/api/websiteSecrets";

type Props = {
  id: string;
  consumerSecretsId: string;
  url: string;
  username: string;
  password: string;
  toggleEdit: () => void;
};

export const WebsiteSecretReadRow = ({
  id,
  consumerSecretsId,
  url,
  username,
  password,
  toggleEdit
}: Props) => {
  const { mutateAsync: deleteWebsitSecret } = useDeleteWebsiteSecret({ consumerSecretsId });

  return (
    <Tr key={id}>
      <Td>{url}</Td>
      <Td>{username}</Td>
      <Td>{password}</Td>
      <Td>
        <div className="flex gap-2">
          <IconButton variant="plain" ariaLabel="edit" onClick={() => toggleEdit()}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
          <IconButton
            variant="plain"
            ariaLabel="delete"
            onClick={async () => {
              await deleteWebsitSecret({ id });
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </IconButton>
        </div>
      </Td>
    </Tr>
  );
};
