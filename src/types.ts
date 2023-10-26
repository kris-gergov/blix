export type AccountType = "Advanced" | "Manual";

export type AccountFormData = {
  accountType: AccountType;
  username: string;
  password: string;
  serverAddress: string;
  serverPath?: string;
  port?: number;
  useSSL?: boolean;
};

export type AccountFormErrors = {
  [K in keyof AccountFormData]?: string;
};
