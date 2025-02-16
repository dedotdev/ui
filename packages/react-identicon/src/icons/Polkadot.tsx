import type { Props, Circle } from '../types.js';

import React, { useMemo } from 'react';

import { polkadotIcon } from '../shared.js';

function renderCircle({ cx, cy, fill, r }: Circle, key: number): React.ReactNode {
  return <circle cx={cx} cy={cy} fill={fill} key={key} r={r} />;
}

function Identicon({
  address,
  className = '',
  isAlternative = false,
  size,
  style = {},
}: Props): React.ReactElement<Props> {
  const circles = useMemo(() => polkadotIcon(address, { isAlternative }), [address, isAlternative]);

  return (
    <svg className={className} height={size} id={address} name={address} style={style} viewBox='0 0 64 64' width={size}>
      {circles.map(renderCircle)}
    </svg>
  );
}

export const Polkadot = React.memo(Identicon);
