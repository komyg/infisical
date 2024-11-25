import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Table, TableContainer, TBody, Td, Th, THead, Tr } from "@app/components/v2";
import { useListWebsiteSecrets } from "@app/hooks/api/websiteSecrets";

type Props = {
  consumerSecretsId: string;
};

export const ManageConsumerSecretsPage = ({ consumerSecretsId }: Props) => {
  const { data, isLoading } = useListWebsiteSecrets({ consumerSecretsId });

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
                </Tr>
              </THead>
              <TBody>
                {data?.map((secret) => (
                  <Tr key={secret.id}>
                    <Td>{secret.url}</Td>
                    <Td>{secret.username}</Td>
                    <Td>{secret.password}</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
