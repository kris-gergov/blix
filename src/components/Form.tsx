import React, { useCallback, useState } from "react";
import { InputField } from "./InputField";
import SelectInput from "./SelectInput";
import { Checkbox } from "./Checkbox";
import { AccountFormData, AccountFormErrors, AccountType } from "../types";
import { validateAccountForm } from "../utils/validation";

const initialState: AccountFormData = {
  accountType: "Advanced",
  username: "",
  password: "",
  serverAddress: "",
  serverPath: "",
  port: 1,
  useSSL: false,
};

export const AccountForm: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<AccountFormErrors>({});
  const [payload, setPayload] = useState<string>("");

  const handleInputChange = useCallback(
    (field: keyof AccountFormErrors, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleAccountTypeChange = useCallback(
    (value: string) => {
      setFormData((prev) => ({
        ...prev,
        port: undefined,
        serverPath: undefined,
        useSSL: undefined,
        accountType: value as AccountType,
      }));
    },
    [setFormData]
  );

  const validate = () => {
    const newErrors = validateAccountForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPayload("");

      if (validate()) {
        console.log(formData);
        setPayload(JSON.stringify(formData, null, 2));
      }
    },
    [formData]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <SelectInput
        id="accountType"
        label="Account type"
        name="accountType"
        value={formData.accountType}
        options={[
          { label: "Advanced", value: "Advanced" },
          { label: "Manual", value: "Manual" },
        ]}
        onChange={(value) =>
          handleAccountTypeChange(value as AccountFormData["accountType"])
        }
        className="col-span-1"
      />

      <InputField
        id="username"
        label="Username"
        type="email"
        placeholder="example@example.com"
        value={formData.username}
        onChange={(value) => handleInputChange("username", value)}
        error={errors.username}
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="****"
        value={formData.password}
        onChange={(value) => handleInputChange("password", value)}
        error={errors.password}
      />

      <InputField
        id="serverAddress"
        label="Server address"
        type="text"
        placeholder="example.com"
        value={formData.serverAddress}
        onChange={(value) => handleInputChange("serverAddress", value)}
        error={errors.serverAddress}
      />

      {formData.accountType === "Advanced" && (
        <>
          <div className="col-span-1">
            <InputField
              id="serverPath"
              label="Server path"
              type="text"
              placeholder="/"
              value={formData.serverPath || ""}
              onChange={(value) => handleInputChange("serverPath", value)}
              error={errors.serverPath}
            />
          </div>
          <div className="col-span-1">
            <InputField
              id="port"
              label="Port"
              type="number"
              placeholder="993"
              value={formData.port || ""}
              onChange={(value) => handleInputChange("port", value)}
              error={errors.port}
            />
          </div>
          <div className="col-span-1">
            <Checkbox
              id="useSSL"
              label="Use SSL"
              checked={formData.useSSL}
              onChange={(checked) => handleInputChange("useSSL", checked)}
            />
          </div>
        </>
      )}

      <div className="col-span-1 md:col-span-2 mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 rounded"
          aria-label="Submit"
        >
          Submit
        </button>
      </div>

      {payload && (
        <div className="col-span-1 md:col-span-2 mt-4">
          <pre className="p-4 bg-gray-100 rounded">{payload}</pre>
        </div>
      )}
    </form>
  );
};
