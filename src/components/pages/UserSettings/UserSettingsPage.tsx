import { SettingsContainerStyled } from '../styles';
import { ButtonView } from './ButtonView';
import { SettingsView } from './SettingsView';

export const UserSettingsPage = () => {
  return (
    <SettingsContainerStyled maxWidth="lg">
      <ButtonView />
      <SettingsView />
    </SettingsContainerStyled>
  );
};
