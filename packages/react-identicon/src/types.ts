import type React from 'react';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface Props extends BaseProps {
  address: string;
  isAlternative?: boolean | undefined;
  publicKey: string;
  size: number;
}

export interface IdentityProps extends BaseProps {
  Custom?: React.ComponentType<Props>;
  isAlternative?: boolean;
  isHighlight?: boolean;
  onCopy?: (value: string) => void;
  prefix?: number;
  size?: number;
  theme?: IconTheme;
  value?: string | Uint8Array | null;
}

export type IconTheme = 'beachball' | 'empty' | 'ethereum' | 'jdenticon' | 'polkadot' | 'substrate';

export interface Circle {
  cx: number;
  cy: number;
  fill: string;
  r: number;
}

export interface Options {
  isAlternative?: boolean;
  size?: number;
}

