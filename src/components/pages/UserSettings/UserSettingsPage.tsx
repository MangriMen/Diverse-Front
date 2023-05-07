import { StyledContainer } from '../styles';
import { ButtonView } from './ButtonView';
import { SettingsView } from './SettingsView';

export const UserSettingsPage = () => {
  return (
    <StyledContainer maxWidth="lg">
      <ButtonView />
      <SettingsView />
    </StyledContainer>
  );
};
