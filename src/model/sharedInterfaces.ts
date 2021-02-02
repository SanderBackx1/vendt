export interface ILocation {
  street: string;
  number: number;
  city: string;
  zip: number;
  country: string;
}
export interface ILayout {
  title: string;
  motd: string;
  errQrNotValid: string;
  errExceededMaxItems: string;
  okTakeOutNow: string;
  okTakeOutSuccessful: string;
  errGeneralFailure: string;
}

export function isILocation(object: any): object is ILocation {
  return (
    "street" in object &&
    "number" in object &&
    "city" in object &&
    "zip" in object &&
    "country" in object
  );
}
export function isILayout(object: any): object is ILayout {
  return (
    "title" in object &&
    "motd" in object &&
    "errQrNotValid" in object &&
    "errExceededMaxItems" in object &&
    "okTakeOutNow" in object &&
    "okTakeOutSuccessful" in object &&
    "errGeneralFailure" in object
  );
}
export interface TokenInterface {
  uid: string;
  company: string;
  iat: number;
}
export type Urgency = "OK"|"low"|"medium"|"high"
