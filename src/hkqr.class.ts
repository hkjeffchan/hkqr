import { CRC } from './crc.class';
import { payload, PF } from './payload';

export class Hkqr {
  private pointOfInitiationMethod: string = '11';
  private uuid = 'hk.com.hkicl';
  private fpsId = '';
  private fpsPhoneNo = '';
  private fpsEmail = '';
  private merchantCategoryCode: string = '0000';
  private countryCode: string = 'HK';
  private merchantName: string = '';
  private merchantCity: string = 'HK';
  private postalCode: string = '';

  private transactionCurrency: string = '344';
  private transcationAmount: string = '';

  private billNumber: string = '';
  private mobileNumber: string = '';
  private storeLabel: string = '';
  private loyaltyNumber: string = '';
  private referenceLabel: string = '';
  private customerLabel: string = '';
  private terminalLabel: string = '';
  private purposeOfTransaction: string = '';
  private additionalConsumerDataRequest: string = '';

  constructor(_merchantName: string) {
    this.merchantName = _merchantName;
  }

  setPointOfInitiationMethod(val: 'static' | 'dynamic') {
    this.pointOfInitiationMethod = val === 'static' ? '11' : '12';
  }

  setFpsId(val: string) {
    if (val.length > 25) {
      throw new Error('FPS ID must be 25 characters long or less');
    }
    this.fpsId = val;
    this.fpsEmail = '';
    this.fpsPhoneNo = '';
  }

  setFpsPhoneNo(val: string) {
    if (val.length !== 8) {
      throw new Error('FPS Phone number must be 8 characters long');
    }
    this.fpsPhoneNo = `+852-${val}`;
    this.fpsId = '';
    this.fpsEmail = '';
  }

  setFpsEmail(val: string) {
    if (val.length > 25) {
      throw new Error('FPS Email must be 25 characters long or less');
    }
    this.fpsEmail = val;
    this.fpsId = '';
    this.fpsPhoneNo = '';
  }

  setCountryCode(val: string) {
    if (val.length !== 2) {
      throw new Error('Country code must be 2 characters long');
    }
    this.countryCode = val;
  }

  setMerchantCategoryCode(val: number) {
    if (val > 9999 || val < 0) {
      throw new Error('Merchant category code must be between 0 and 9999');
    }

    this.merchantCategoryCode = val.toString().padStart(4, '0');
  }

  setMerchantCity(val: string) {
    if (val.length > 15) {
      throw new Error('Merchant city must be 15 characters long or less');
    }
    this.merchantCity = val;
  }

  setPostalCode(val: string) {
    if (val.length > 10) {
      throw new Error('Postal code must be 10 characters long or less');
    }
    this.postalCode = val;
  }

  setTransactionCurrency(val: string) {
    if (val.length !== 3) {
      throw new Error('Transaction currency must be 3 characters long');
    }
    this.transactionCurrency = val;
  }

  setTransactionAmount(val: number) {
    if (val < 0) {
      throw new Error('Transaction amount must be a positive number');
    }

    const amount = val.toFixed(2);

    if (amount.length > 13) {
      throw new Error('Transaction amount must be 13 characters long or less');
    }
    this.transcationAmount = amount;
  }

  setBillNumber(val: string) {
    if (val.length > 25) {
      throw new Error('Bill number must be 25 characters long or less');
    }
    this.billNumber = val;
  }

  setMobileNumber(val: string) {
    if (val.length > 25) {
      throw new Error('Mobile number must be 25 characters long or less');
    }
    this.mobileNumber = val;
  }

  setStoreLabel(val: string) {
    if (val.length > 25) {
      throw new Error('Store label must be 25 characters long or less');
    }
    this.storeLabel = val;
  }

  setLoyaltyNumber(val: string) {
    if (val.length > 25) {
      throw new Error('Loyalty number must be 25 characters long or less');
    }
    this.loyaltyNumber = val;
  }

  setReferenceLabel(val: string) {
    if (val.length > 25) {
      throw new Error('Reference label must be 25 characters long or less');
    }
    this.referenceLabel = val;
  }

  setCustomerLabel(val: string) {
    if (val.length > 25) {
      throw new Error('Customer label must be 25 characters long or less');
    }
    this.customerLabel = val;
  }

  setTerminalLabel(val: string) {
    if (val.length > 25) {
      throw new Error('Terminal label must be 25 characters long or less');
    }
    this.terminalLabel = val;
  }

  setPurposeOfTransaction(val: string) {
    if (val.length > 25) {
      throw new Error('Purpose of transaction must be 25 characters long or less');
    }
    this.purposeOfTransaction = val;
  }

  setAdditionalConsumerDataRequest(val: string) {
    if (val.length > 25) {
      throw new Error('Additional consumer data request must be 25 characters long or less');
    }
    this.additionalConsumerDataRequest = val;
  }

  addCheckSum(s: string) {
    var checkSum = this.getCheckSum(s + PF.crcCheck + '04');
    return payload(PF.crcCheck, checkSum);
  }

  getCheckSum(s: string) {
    const crc = new CRC();
    var input = Buffer.from(s, 'utf8');
    var output = crc.generate(input);
    return output.toString(16).toUpperCase();
  }

  private additionalData(): string {
    let res = '';
    res += payload(PF.additionalDataBillNumber, this.billNumber);
    res += payload(PF.additionalDataMobileNumber, this.mobileNumber);
    res += payload(PF.additionalDataStoreLabel, this.storeLabel);
    res += payload(PF.additionalDataLoyaltyNumber, this.loyaltyNumber);
    res += payload(PF.additionalDataReferenceLabel, this.referenceLabel);
    res += payload(PF.additionalDataCustomerLabel, this.customerLabel);
    res += payload(PF.additionalDataTerminalLabel, this.terminalLabel);
    res += payload(PF.additionalDataPurposeOfTransaction, this.purposeOfTransaction);
    res += payload(PF.additionalDataCustomerDataRequest, this.additionalConsumerDataRequest);
    return payload(PF.additionalData, res);
  }

  generate() {
    let res = '';
    res += payload(PF.payloadFormat, '01'); // Point of Initiation Method
    res += payload(PF.pointOfInitiation, this.pointOfInitiationMethod); // Point of Initiation Method
    res += payload(
      PF.merchantAccountInfo,
      payload(PF.merchantAccountInfoGloballyUniqueIdentifier, this.uuid) +
        payload(PF.fpsId, this.fpsId) +
        payload(PF.fpsPhoneNo, this.fpsPhoneNo) +
        payload(PF.fpsEmail, this.fpsEmail),
    ); // Merchant Account Information (Globally Unique Identifier + Merchant ID)

    if (this.pointOfInitiationMethod === '12') {
      res += payload(PF.transactionAmount, this.transcationAmount); // Transaction Amount
    }

    res += payload(PF.merchantCategoryCode, this.merchantCategoryCode); // Merchant Category Code
    res += payload(PF.transactionCurrency, this.transactionCurrency); // Transaction Currency
    res += payload(PF.country, this.countryCode); // Country Code
    res += payload(PF.merchantName, this.merchantName); // Merchant Name
    res += payload(PF.merchantCity, this.merchantCity); // Merchant City
    res += payload(PF.postalCode, this.postalCode); // Postal Code
    res += this.additionalData(); // Additional Data
    res += this.addCheckSum(res); // CRC Check
    return res;
  }
}
