import { useState } from "react";

import { WebsiteSecretEditRow } from "../WebsiteSecretEditRow/WebsiteSecretEditRow";
import { WebsiteSecretReadRow } from "../WebsiteSecretReadRow/WebsiteSecretReadRow";

type Props = {
  id: string;
  consumerSecretsId: string;
  url: string;
  username: string;
  password: string;
};

export const WebsiteSecretRow = (props: Props) => {
  const [isRead, setIsRead] = useState(true);
  return isRead ? (
    <WebsiteSecretReadRow toggleEdit={() => setIsRead(false)} {...props} />
  ) : (
    <WebsiteSecretEditRow toggleRead={() => setIsRead(true)} {...props} />
  );
};
