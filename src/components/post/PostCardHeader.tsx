import {
  StyledAvatar,
  StyledPostCardHeaderBox,
  StyledTypography,
} from './styles';

export const PostCardHeader = () => {
  return (
    <StyledPostCardHeaderBox>
      <StyledAvatar src="src/assets/images/lucy.jpg" />
      <StyledTypography>{'Username'}</StyledTypography>
    </StyledPostCardHeaderBox>
  );
};
