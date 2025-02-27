import type React from 'react';

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface IconProps extends BaseProps {
  address: string;
  publicKey: string;
  size: number;
}

export interface IdentityProps extends BaseProps {
  Custom?: React.ComponentType<IconProps>;
  onCopy?: (value: string) => void;
  prefix?: number;
  size?: number;
  theme?: IconTheme;
  value?: string | Uint8Array | null;
}

export type IconTheme = 'polkadot' | 'jdenticon';

export interface PolkadotCircle {
  cx: number;
  cy: number;
  fill: string;
  r: number;
}
