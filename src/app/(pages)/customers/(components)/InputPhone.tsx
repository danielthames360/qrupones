import { getLocaleCodeFromPhoneCode, validateOptionalPhoneNumber } from '@/utils';
import { memo, type Dispatch, type SetStateAction } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import 'react-phone-input-2/lib/style.css';

interface InputPhoneProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  setIsValidPhone: Dispatch<SetStateAction<boolean>>;
  setCountryCode: Dispatch<SetStateAction<string>>;
}

interface Country {
  name: string;
  regions: string[];
  iso2: string;
  countryCode: string;
  dialCode: string;
  format: string;
  priority: number;
  localName: string;
}

const InputPhone = memo(function InputPhone({ input, setInput, setIsValidPhone, setCountryCode }: InputPhoneProps): JSX.Element {
  return (
    <PhoneInput
      dropdownStyle={{ textAlign: 'left' }}
      inputClass='inputPhone'
      dropdownClass='inputPhone'
      country={'bo'}
      localization={es}
      value={input}
      onChange={setInput}
      enableLongNumbers={true}
      countryCodeEditable={true}
      isValid={(inputNumber, country) => {
        const isValid = validateOptionalPhoneNumber(inputNumber, getLocaleCodeFromPhoneCode((country as Country).countryCode));
        if (typeof isValid === 'string') {
          setIsValidPhone(false);
        } else {
          setIsValidPhone(true);
          setCountryCode((country as Country).countryCode);
        }
        return isValid;
      }}
    />
  );
});

export { InputPhone };
