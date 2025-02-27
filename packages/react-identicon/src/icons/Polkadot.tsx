import type { IconProps, PolkadotCircle } from '../types.js';
import React, { useMemo } from 'react';
import { polkadotIcon } from '../shared/index.js';

function renderCircle({ cx, cy, fill, r }: PolkadotCircle, key: number): React.ReactNode {
  return <circle cx={cx} cy={cy} fill={fill} key={key} r={r} />;
}

function Identicon({ address, className = '', size, style = {} }: IconProps): React.ReactElement<IconProps> {
  const circles = useMemo(() => polkadotIcon(address, { isAlternative: false }), [address]);

  return (
    <svg className={className} height={size} id={address} name={address} style={style} viewBox='0 0 64 64' width={size}>
      {circles.map(renderCircle)}
    </svg>
  );
}

export const Polkadot = React.memo(Identicon);
