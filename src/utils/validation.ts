// validation.ts

import { AccountFormData, AccountFormErrors } from "src/types";

const isValidEmail = (email: string): boolean =>
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(email);

const isValidServerAddress = (address: string): boolean =>
  /^([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(address);

const isValidServerPath = (path: string): boolean =>
  /^\/[a-zA-Z0-9\/_\-]*$/.test(path);

const isValidPort = (port: number | undefined): boolean =>
  port !== undefined && port >= 1 && port <= 65535;

export const validateAccountForm = (
  formData: AccountFormData
): AccountFormErrors => {
  let errors: AccountFormErrors = {};

  if (!isValidEmail(formData.username)) {
    errors.username = "Valid email is required.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }

  if (!isValidServerAddress(formData.serverAddress)) {
    errors.serverAddress = "Valid server address is required.";
  }

  if (formData.accountType === "Advanced") {
    if (!isValidServerPath(formData.serverPath || "")) {
      errors.serverPath = "Valid server path is required.";
    }

    if (!isValidPort(formData.port)) {
      errors.port = "Valid port between 1 and 65535 is required.";
    }
  }

  return errors;
};
