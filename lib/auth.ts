export function getBetaCredentials() {
  return {
    username: process.env.RW_BETA_USERNAME?.trim() || "",
    password: process.env.RW_BETA_PASSWORD?.trim() || "",
  };
}

export function isBetaAuthConfigured() {
  const credentials = getBetaCredentials();
  return Boolean(credentials.username && credentials.password);
}
