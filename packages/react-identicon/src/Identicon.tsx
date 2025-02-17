import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import type { IdentityProps as Props, Props as ComponentProps } from './types.js';
import { decodeAddress, encodeAddress, isHex, isU8a, u8aToHex } from '@dedot/utils';
import { Empty, Beachball, Jdenticon, Polkadot } from './icons/index.js';
import { styled } from 'styled-components';

const DEFAULT_ICON = 'polkadot';

const Fallback = Beachball;

interface State {
  address: string;
  publicKey: string;
}

const DEFAULT_SIZE = 64;
const Components: Record<string, React.ComponentType<ComponentProps>> = {
  empty: Empty,
  beachball: Beachball,
  jdenticon: Jdenticon,
  polkadot: Polkadot,
  substrate: Jdenticon,
};

class BaseIcon extends React.PureComponent<Props, State> {
  public override state: State = {
    address: '',
    publicKey: '0x',
  };

  private static prefix?: number = undefined;

  public static setDefaultPrefix(prefix: number): void {
    BaseIcon.prefix = prefix;
  }

  public static getDerivedStateFromProps({ prefix = BaseIcon.prefix, value }: Props, prevState: State): State | null {
    try {
      const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : value || '';
      const publicKey = u8aToHex(decodeAddress(address, false, prefix));

      return address === prevState.address
        ? null
        : {
            address,
            publicKey,
          };
    } catch {
      return {
        address: '',
        publicKey: '0x',
      };
    }
  }

  public override render(): React.ReactNode {
    const { address } = this.state;
    const wrapped = this.getWrapped(this.state, this.props);

    return !address ? (
      wrapped
    ) : (
      // @ts-ignore
      <CopyToClipboard onCopy={this.onCopy} text={address}>
        {/* @ts-ignore */}
        {wrapped}
      </CopyToClipboard>
    );
  }

  private getWrapped({ address, publicKey }: State, { Custom }: Props): React.ReactNode {
    const {
      className = '',
      isAlternative,
      isHighlight,
      size = DEFAULT_SIZE,
      style = {},
      theme = 'default',
    } = this.props;
    const Component = !address ? Empty : Custom || Components[theme === 'default' ? DEFAULT_ICON : theme] || Fallback;

    return (
      <StyledDiv className={`ui--IdentityIcon  ${className}`} key={address} style={style}>
        <Component
          address={address}
          className={isHighlight ? 'highlight' : ''}
          isAlternative={isAlternative}
          publicKey={publicKey}
          size={size}
        />
      </StyledDiv>
    );
  }

  private onCopy = (): void => {
    const { onCopy } = this.props;
    const { address } = this.state;

    if (address && onCopy) {
      onCopy(address);
    }
  };
}

function Icon(props: Props): React.ReactElement<Props> {
  return <BaseIcon {...props} />;
}

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

export const Identicon = React.memo(Icon);
