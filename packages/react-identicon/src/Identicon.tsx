import React, { CSSProperties, useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import type { IconTheme, IdentityProps, IconProps } from './types.js';
import { decodeAddress, encodeAddress, isHex, isU8a, u8aToHex } from '@dedot/utils';
import { Empty, Jdenticon, Polkadot } from './icons/index.js';

const Fallback = Polkadot;

interface State {
  address: string;
  publicKey: string;
}

const DEFAULT_SIZE: number = 64;
const Components: Record<IconTheme, React.ComponentType<IconProps>> = {
  polkadot: Polkadot,
  substrate: Jdenticon,
};

type IBaseIcon<P> = React.FunctionComponent<P>;

const BaseIcon: IBaseIcon<IdentityProps> = (props) => {
  const [address, setAddress] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('0x');
  const { value, prefix, onCopy } = props;

  useEffect(() => {
    try {
      const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : value || '';
      const publicKey = u8aToHex(decodeAddress(address, false, prefix));

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

const InnerIcon: IInnerIcon<IdentityProps & State> = ({
  address,
  publicKey,
  theme = 'polkadot',
  Custom,
  size,
  className = '',
  style = {},
}) => {
  const Component = !address ? Empty : Custom || Components[theme] || Fallback;

  return (
    <div className={`ui--IdentityIcon  ${className}`} key={address} style={{ ...defaultIconStyle, ...style }}>
      <Component address={address} publicKey={publicKey} size={size || DEFAULT_SIZE} />
    </div>
  );
};

export const Identicon = React.memo(BaseIcon);

const defaultIconStyle: CSSProperties = { cursor: 'copy', display: 'inline-block', lineHeight: 0 };
