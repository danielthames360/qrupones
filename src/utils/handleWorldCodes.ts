import { type CountryProperty, findOne } from 'country-codes-list';

export const getCallingCodeFromISO2 = (iso2: string = 'BO'): string => {
  const country = findOne('countryCode' as CountryProperty.countryCode, iso2);
  return country !== undefined ? country.countryCallingCode : '591';
};

export const getLocaleCodeFromISO2 = (iso2: string = 'BO'): string => {
  const country = findOne('countryCode' as CountryProperty.countryCode, iso2);
  return country !== undefined
    ? `${country.officialLanguageCode}-${iso2}`
    : 'es-BO';
};

export const getLocaleCodeFromPhoneCode = (
  phoneCode: string = '591'
): string => {
  const country = findOne(
    'countryCallingCode' as CountryProperty.countryCallingCode,
    phoneCode
  );

  return country !== undefined
    ? `${country.officialLanguageCode}-${country.countryCode}`
    : 'es-BO';
};
