import { FlexBox, IconButton } from '@codecademy/gamut';
import {
  ArrowChevronLeftIcon,
  ArrowChevronRightIcon,
} from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const DrawerLabel = styled.span`
  padding: 0.875rem 0.5rem;
`;

const LeftDrawerIcon = styled(ArrowChevronLeftIcon)<{ open?: boolean }>`
  transition: transform 0.2s ease-in-out;
`;
const RightDrawerIcon = LeftDrawerIcon.withComponent(ArrowChevronRightIcon);

const Drawer = styled(FlexBox)<{ open?: boolean; hideOnClose?: boolean }>`
  position: relative;
  ${({ open, hideOnClose }) => `
    flex-basis: ${open ? '100%' : '0%'};
    visibility: ${!open && hideOnClose ? 'hidden' : 'visible'};
    transition: flex-basis 0.2s ${
      open ? 'ease-out' : 'ease-in, visibility 0s 0.2s'
    };

    ${LeftDrawerIcon}, ${RightDrawerIcon} {
      transform: rotateZ(${open ? '0' : '180'}deg)};
    }
  `}
`;

export type DrawersProps = {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
};

export const Drawers: React.FC<DrawersProps> = ({ leftChild, rightChild }) => {
  const [open, setOpen] = useState<'left' | 'right' | 'both'>('both');

  let ariaLabelCodeButton = 'hide code';
  let ariaLabelOutputButton = 'hide output';
  let isLeftOpen = false;
  let isRightOpen = false;

  if (open === 'left') {
    ariaLabelCodeButton = ariaLabelOutputButton = 'show output';
    isLeftOpen = true;
  } else if (open === 'right') {
    ariaLabelCodeButton = ariaLabelOutputButton = 'show code';
    isRightOpen = true;
  }

  return (
    <>
      <FlexBox>
        <Drawer
          open={!isRightOpen}
          alignItems="center"
          flexWrap="nowrap"
          textAlign="left"
          borderRight={1}
          borderColor="gray-900"
          px={8}
        >
          <IconButton
            icon={LeftDrawerIcon}
            variant="secondary"
            size="small"
            onClick={() =>
              setOpen((state) => (state === 'both' ? 'right' : 'both'))
            }
            aria-label={ariaLabelCodeButton}
            aria-controls="code-drawer"
            aria-expanded={!isRightOpen}
          />
          <DrawerLabel id="code-drawer-label">Code</DrawerLabel>
        </Drawer>
        <Drawer
          open={!isLeftOpen}
          alignItems="center"
          flexWrap="nowrap"
          justifyContent="flex-end"
          px={8}
        >
          <DrawerLabel id="output-drawer-label">Output</DrawerLabel>
          <IconButton
            icon={RightDrawerIcon}
            variant="secondary"
            size="small"
            onClick={() =>
              setOpen((state) => (state === 'both' ? 'left' : 'both'))
            }
            aria-label={ariaLabelOutputButton}
            aria-controls="output-drawer"
            aria-expanded={!isLeftOpen}
          />
        </Drawer>
      </FlexBox>
      <FlexBox
        flexGrow={1}
        borderY={1}
        borderColor="gray-900"
        alignItems="stretch"
        overflow="hidden"
      >
        <Drawer
          hideOnClose
          id="code-drawer"
          aria-labelledby="code-drawer-label"
          open={!isRightOpen}
          flexGrow={0}
          overflow="hidden"
          borderColor="gray-900"
          borderStyleRight="solid"
          borderWidthRight="thin"
        >
          {leftChild}
        </Drawer>
        <Drawer
          hideOnClose
          id="output-drawer"
          open={!isLeftOpen}
          overflow="hidden"
        >
          {rightChild}
        </Drawer>
      </FlexBox>
    </>
  );
};
