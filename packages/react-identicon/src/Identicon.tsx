import React, { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import type { IdentityProps as Props, Props as ComponentProps } from './types.js';
import { decodeAddress, encodeAddress, isHex, isU8a, u8aToHex } from '@dedot/utils';
import { Empty, Beachball, Jdenticon, Polkadot } from './icons/index.js';
import { styled } from 'styled-components';

const DEFAULT_ICON: string = 'polkadot';
const DEFAULT_PREFIX: number = 42;

const Fallback = Beachball;

interface State {
  address: string;
  publicKey: string;
}

const DEFAULT_SIZE: number = 64;
const Components: Record<string, React.ComponentType<ComponentProps>> = {
  empty: Empty,
  beachball: Beachball,
  jdenticon: Jdenticon,
  polkadot: Polkadot,
  substrate: Jdenticon,
};

type IBaseIcon<P> = React.FunctionComponent<P>;

const BaseIcon: IBaseIcon<Props> = (props) => {
  const [address, setAddress] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('0x');
  const { value, prefix = DEFAULT_PREFIX, onCopy } = props;

  useEffect(() => {
    try {
      const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : value || '';
      const publicKey = u8aToHex(decodeAddress(address, false));

      setAddress(address);
      setPublicKey(publicKey);
    } catch {
      setAddress('');
      setPublicKey('0x');
    }
  }, [value?.toString(), prefix]);

  const doCopy = (): void => {
    copy(address);

    if (address && onCopy) {
      onCopy(address);
    }
  };

  return (
    <span onClick={doCopy}>
      <InnerIcon publicKey={publicKey} address={address} {...props} />
    </span>
  );
};

type IInnerIcon<P> = React.FunctionComponent<P>;

const InnerIcon: IInnerIcon<Props & State> = ({
  address,
  publicKey,
  theme,
  Custom,
  size,
  className,
  style,
  isAlternative,
  isHighlight,
}) => {
  const Component = !address ? Empty : Custom || Components[theme || DEFAULT_ICON] || Fallback;

  return (
    <StyledDiv className={`ui--IdentityIcon  ${className}`} key={address} style={style}>
      <Component
        address={address}
        className={isHighlight ? 'highlight' : ''}
        isAlternative={isAlternative}
        publicKey={publicKey}
        size={size || DEFAULT_SIZE}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  cursor: copy;
  display: inline-block;
  line-height: 0;

  > .container {
    position: relative;

    > div,
    > svg {
      position: relative;
    }

    &.highlight:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      box-shadow: 0 0 5px 2px #aaa;
      content: '';
    }
  }
`;

export const Identicon = React.memo(BaseIcon);
