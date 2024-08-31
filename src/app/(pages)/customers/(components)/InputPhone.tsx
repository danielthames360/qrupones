import { memo, type Dispatch, type SetStateAction } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import 'react-phone-input-2/lib/style.css';

interface InputPhoneProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

const InputPhone = memo(function InputPhone({ input, setInput }: InputPhoneProps): JSX.Element {
  return (
    <PhoneInput
      dropdownStyle={{ textAlign: 'left' }}
      inputClass='inputPhone'
      dropdownClass='inputPhone'
      country={'bo'}
      localization={es}
      value={input}
      onChange={setInput}
    />
  );
});

export { InputPhone };
