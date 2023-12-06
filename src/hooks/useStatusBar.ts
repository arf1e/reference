import { useEffect, useState } from 'react';

export const FORM_IDLE = 'IDLE';
export const FORM_LOADING = 'LOADING';
export const FORM_SUCCESS = 'SUCCESS';
export const FORM_ERROR = 'ERROR';

export type UseFormStateType =
  | typeof FORM_IDLE
  | typeof FORM_LOADING
  | typeof FORM_SUCCESS
  | typeof FORM_ERROR;

export default function useStatusBar() {
  const [formState, setFormState] = useState<UseFormStateType>(FORM_IDLE);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (formState === FORM_LOADING) {
      setMessage('Loading...');
    }
    if (![FORM_IDLE, FORM_LOADING].includes(formState)) {
      t = setTimeout(() => {
        setFormState(FORM_IDLE);
        setMessage(null);
      }, 2400);
    }
    return () => clearTimeout(t);
  }, [formState, setFormState, setMessage]);

  return { formState, message, setFormState, setMessage };
}
