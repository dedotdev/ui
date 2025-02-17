import type { Props } from '../types.js';
import * as jdenticon from 'jdenticon';
import React, { useMemo } from 'react';

function Identicon({ className = '', publicKey, size, style = {} }: Props): React.ReactElement<Props> {
  const html = useMemo(() => ({ __html: jdenticon.toSvg(publicKey.substring(2), size) }), [publicKey, size]);

  return <div className={className} dangerouslySetInnerHTML={html} style={style} />;
}

export const Jdenticon = React.memo(Identicon);
