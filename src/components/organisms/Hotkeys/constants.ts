import { IHotkey } from 'components/organisms/Hotkeys/types';

export const HOT_KEYS: IHotkey[] = [
  {
    value: 'ctrl+b',
    name: 'Ban Account',
  },
  {
    value: 'ctrl+e',
    name: 'Escalate',
  },
];

export const SHOW_HOT_KEYS: IHotkey = {
  value: 'ctrl+h',
  name: 'Show / hide hot keys',
};
