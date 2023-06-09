import { Box, styled } from '@mui/material';
import { MoreText } from 'components/common/MoreText';
import { POST_DESCRIPTION_COLLAPSED_SIZE } from 'consts';
import { useEffect, useRef, useState } from 'react';

import { PostCardDescriptionProps } from './interfaces';
import { PostCardDescriptionCollapse, PostCardDescriptionText } from './styles';

const BoxStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  flex-grow: 1;
`;

export const PostCardDescription = ({
  expanded,
  onExpand,
  description,
}: PostCardDescriptionProps) => {
  const collapseRef = useRef<HTMLDivElement>(null);

  const [isNeedMoreButton, setIsNeedMoreButton] = useState(false);

  useEffect(() => {
    if (collapseRef !== null && collapseRef.current !== null) {
      setIsNeedMoreButton(
        collapseRef.current.scrollHeight > collapseRef.current.clientHeight,
      );

      if (!expanded) {
        collapseRef.current.scrollTop = 0;
      }
    }
  }, [expanded]);

  return (
    <BoxStyled>
      {description && (
        <>
          <PostCardDescriptionCollapse
            ref={collapseRef}
            in={expanded}
            collapsedSize={POST_DESCRIPTION_COLLAPSED_SIZE}
          >
            <PostCardDescriptionText>{description}</PostCardDescriptionText>
          </PostCardDescriptionCollapse>
          {isNeedMoreButton && (
            <MoreText expanded={expanded} onExpand={onExpand} />
          )}
        </>
      )}
    </BoxStyled>
  );
};
