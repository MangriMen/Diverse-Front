import styled from '@emotion/styled';
import { Avatar, Box, SvgIcon } from '@mui/material';

export const StyledFileInput = styled(Box)`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
` as typeof Box;

export const CircleStyledFileInput = styled(Box)`
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
` as typeof Box;

export const StyledSvgIcon = styled(SvgIcon)`
  height: 100%;
  font-size: 256px;
`;

export const AvatarSetting = styled(Avatar)`
  display: flex;
  position: relative;
  width: 12.5rem;
  height: 12.5rem;
`;
