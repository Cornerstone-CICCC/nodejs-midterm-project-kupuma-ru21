import crypto from "crypto";

export const HMAC_SHA256 = (key: string, data: string) => {
  const hash = crypto.createHmac("sha256", key).update(data).digest("base64");
  const hashNoPadding = hash.replace(/={1,2}$/, "");
  return hashNoPadding;
};
