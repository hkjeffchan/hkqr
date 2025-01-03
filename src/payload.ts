export enum PF {
  payloadFormat = '00',
  pointOfInitiation = '01',
  merchantAccountInfo = '26',
  merchantAccountInfoGloballyUniqueIdentifier = '00',
  merchantAccountInfoMerchantID = '02',
  merchantCategoryCode = '52',
  transactionCurrency = '53',
  transactionAmount = '54',
  country = '58',
  merchantName = '59',
  merchantCity = '60',
  postalCode = '61',
  additionalData = '62',
  additionalDataBillNumber = '01',
  additionalDataMobileNumber = '02',
  additionalDataStoreLabel = '03',
  additionalDataLoyaltyNumber = '04',
  additionalDataReferenceLabel = '05',
  additionalDataCustomerLabel = '06',
  additionalDataTerminalLabel = '07',
  additionalDataPurposeOfTransaction = '08',
  additionalDataCustomerDataRequest = '09',
  crcCheck = '63',
  merchantInfo = '64',
}

export function payload(id: string, val: string) {
  return val.length > 0 ? `${id}${val.length.toString().padStart(2, '0')}${val}` : '';
}
