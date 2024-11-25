import { useListConsumerSecrets } from "@app/hooks/api/consumerSecrets";

const ConsumerSecretsPage = () => {
  const { data, isLoading } = useListConsumerSecrets();
  console.log(data, isLoading);

  return (
    <div className="mb-4 flex flex-col items-start justify-start px-6 py-6 pb-0 text-3xl">
      <div className="flex w-full justify-between">
        <p className="mr-4 font-semibold text-white">Consumer Secrets</p>
      </div>
    </div>
  );
};

Object.assign(ConsumerSecretsPage, { requireAuth: true });
export default ConsumerSecretsPage;
