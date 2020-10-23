import crypto from "crypto";
export const hash = (string: string) => {
  //   let hash = 0;
  //   for (let i = 0; i < string.length; i++) {
  //     const chr = string.charCodeAt(i);
  //     hash = (hash << 5) - hash + chr;
  //     hash |= 0; // Convert to 32bit integer
  //   }
  //   return hash;

  return crypto.createHash("sha256").update(string).digest("hex").toString();
};
