import { useListConsumerSecrets } from "@app/hooks/api/consumerSecrets";
import { ManageConsumerSecretsPage } from "@app/views/ConsumerSecretsPage";
import { EmptyConsumerSecretsPage } from "@app/views/EmptyConsumerSecretsPage";

const ConsumerSecretsPage = () => {
  const { data, isLoading } = useListConsumerSecrets();
  console.log(data, isLoading);

  return (
    <div className="flex h-full w-full justify-center bg-bunker-800 text-white">
      <div className="w-full max-w-7xl px-6">
        <div className="mt-6 text-3xl font-semibold text-gray-200">Consumer Secrets</div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && !data?.length && <EmptyConsumerSecretsPage />}
        {!isLoading && !!data?.length && (
          <ManageConsumerSecretsPage consumerSecretsId={data[0].id} />
        )}
      </div>
    </div>
  );
};

Object.assign(ConsumerSecretsPage, { requireAuth: true });
export default ConsumerSecretsPage;
