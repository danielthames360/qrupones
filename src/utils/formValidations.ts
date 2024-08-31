import isEmpty from 'validator/lib/isEmpty';
import isMobilePhone, {
  type MobilePhoneLocale
} from 'validator/lib/isMobilePhone';

export const validateNoSpaces = (value: string): boolean | string => {
  if (typeof value !== 'string') return true;
  if (isEmpty(value, { ignore_whitespace: true })) {
    return 'No se permiten espacios en blanco';
  }
  return true;
};

export const validateNoSpacesWithMiddle = (value: string): boolean | string => {
  if (typeof value !== 'string') return true;
  if (isEmpty(value, { ignore_whitespace: true }) || value.includes(' ')) {
    return 'No se permiten espacios en blanco';
  }
  return true;
};

export const validatePhoneNumber = (
  value: string,
  localeCode: string
): boolean | string => {
  try {
    if (!isMobilePhone(value, localeCode as MobilePhoneLocale)) {
      return 'No es un número válido';
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const validateOptionalPhoneNumber = (
  value: string,
  localeCode: string = 'es-BO'
): boolean | string => {
  if (value.length === 0) return true;
  if (typeof validateNoSpaces(value) === 'string')
    return validateNoSpaces(value);
  return validatePhoneNumber(value, localeCode);
};
