import { expect, test } from 'vitest';

import { Hkqr } from './hkqr.class';

test('static', () => {
  const hkqr = new Hkqr('Example');
  hkqr.setFpsId('123456');
  hkqr.setBillNumber('987654');
  hkqr.setPointOfInitiationMethod('static');
  hkqr.setMerchantCategoryCode(1234);
  hkqr.setMobileNumber('1234567890');

  const res = hkqr.generate();
  expect(res).toBe('00020101021126260012hk.com.hkicl02061234565204123453033445802HK5907Example6002HK62240106987654021012345678906304F2FF');
});

test('dynamic', () => {
  const hkqr = new Hkqr('Example');
  hkqr.setFpsId('123456');
  hkqr.setBillNumber('Hello');
  hkqr.setPointOfInitiationMethod('dynamic');
  hkqr.setMerchantCategoryCode(0);
  hkqr.setTransactionAmount(888.77);

  const res = hkqr.generate();
  expect(res).toBe('00020101021226260012hk.com.hkicl02061234565406888.775204000053033445802HK5907Example6002HK62090105Hello6304ED2B');
});

test('dynamicPhoneNo', () => {
  const hkqr = new Hkqr('Example');
  hkqr.setFpsPhoneNo('68889999');
  hkqr.setBillNumber('Hello');
  hkqr.setPointOfInitiationMethod('dynamic');
  hkqr.setMerchantCategoryCode(0);
  hkqr.setTransactionAmount(888.77);

  const res = hkqr.generate();
  expect(res).toBe('00020101021226330012hk.com.hkicl0313+852-688899995406888.775204000053033445802HK5907Example6002HK62090105Hello63049100');
});
