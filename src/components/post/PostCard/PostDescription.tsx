import { Box, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { MoreButton } from '../MoreTextButton';
import { PostCardDescriptionProps } from '../interfaces';
import {
  PostCardDescriptionCollapse,
  PostCardDescriptionText,
} from '../styles';

export const PostCardDescription = styled(
  ({
    expanded,
    onExpand,
    size,
    description,
    ...props
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
      <Box {...props}>
        <PostCardDescriptionCollapse
          ref={collapseRef}
          in={expanded}
          collapsedSize={size === 'default' ? '6.5625rem' : '1rem'}
        >
          <PostCardDescriptionText
            textAlign="left"
            overflow={size === 'default' ? '' : 'hidden'}
            whiteSpace={size === 'default' ? 'normal' : 'nowrap'}
            textOverflow={size === 'default' ? '' : 'ellipsis'}
          >
            {description}
          </PostCardDescriptionText>
        </PostCardDescriptionCollapse>
        {isNeedMoreButton && size === 'default' && (
          <MoreButton expanded={expanded} onExpand={onExpand} />
        )}
      </Box>
    );
  },
)`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  flex-grow: 1;
`;
