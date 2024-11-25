import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Table, TableContainer, TBody, Td, Th, THead, Tr } from "@app/components/v2";
import { usePopUp } from "@app/hooks";
import { useListWebsiteSecrets } from "@app/hooks/api/websiteSecrets";
import { useDeleteWebsiteSecret } from "@app/hooks/api/websiteSecrets/mutations";

import { CreateWebsiteSecretModal } from "./components/CreateWebsiteSecretModal/CreateWebsiteSecretModal";

type Props = {
  consumerSecretsId: string;
};

export const ManageConsumerSecretsPage = ({ consumerSecretsId }: Props) => {
  const { data, isLoading } = useListWebsiteSecrets({ consumerSecretsId });
  const { mutateAsync: deleteWebsitSecret } = useDeleteWebsiteSecret({ consumerSecretsId });
  const { popUp, handlePopUpToggle } = usePopUp(["addWebsiteSecret"] as const);

  const heading = <p className="text-md mb-6 text-bunker-300">Manage your consumer secrets here</p>;
  if (isLoading) {
    return (
      <>
        {heading}
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      {heading}
      <div className="flex flex-col">
        <div>
          <Button
            variant="outline_bg"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            className="h-10 rounded-r-none"
            onClick={() => handlePopUpToggle("addWebsiteSecret", true)}
          >
            Add Website Secret
          </Button>
        </div>
        <div className="thin-scrollbar mt-4">
          <TableContainer className="thin-scrollbar rounded-b-none">
            <Table>
              <THead>
                <Tr>
                  <Th>URL</Th>
                  <Th>Username</Th>
                  <Th>Password</Th>
                  <Th>Actions</Th>
                </Tr>
              </THead>
              <TBody>
                {data?.map((secret) => (
                  <Tr key={secret.id}>
                    <Td>{secret.url}</Td>
                    <Td>{secret.username}</Td>
                    <Td>{secret.password}</Td>
                    <Td>
                      <div className="flex gap-2">
                        <Button
                          variant="outline_bg"
                          aria-label="edit"
                          onClick={() => console.log("Click")}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                          variant="outline_bg"
                          aria-label="delete"
                          onClick={async () => {
                            await deleteWebsitSecret({ id: secret.id });
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <CreateWebsiteSecretModal
        consumerSecretsId={consumerSecretsId}
        isOpen={popUp.addWebsiteSecret.isOpen}
        onClose={() => handlePopUpToggle("addWebsiteSecret", false)}
      />
    </>
  );
};
