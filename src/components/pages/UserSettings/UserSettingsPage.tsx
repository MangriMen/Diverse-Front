import { StyledContainer } from '../styles';
import { SettingsView } from './SettingsView';
import { ButtonView } from './ButtonView';

export const UserSettingsPage = () => {
  return (
    <StyledContainer maxWidth="lg">
      <ButtonView />
      <SettingsView />
    </StyledContainer>
  );
};
