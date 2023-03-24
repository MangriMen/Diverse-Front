import { Box, Button, styled } from '@mui/material';
import diverseText from 'assets/images/diverseText.svg';
import { ROUTE } from 'consts';

export const StyledLogoImage = styled(Box)`
  max-height: 28px;
` as typeof Box;

export const StyledLogoButton = styled(Button)`
  padding: 0;
`;

export const Logo = () => {
  return (
    <StyledLogoButton href={ROUTE.HOME} variant="text">
      <StyledLogoImage
        height="1.5rem"
        component="img"
        src={diverseText}
        alt="Diverse"
      />
    </StyledLogoButton>
  );
};
