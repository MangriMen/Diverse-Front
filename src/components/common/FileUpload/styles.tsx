import styled from '@emotion/styled';
import { Box, SvgIcon } from '@mui/material';

export const StyledFileInput = styled(Box)`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
` as typeof Box;

export const StyledSvgIcon = styled(SvgIcon)`
  height: 100%;
  font-size: 256px;
`;
