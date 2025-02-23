import './App.css';
import { Identicon } from '@dedot/react-identicon';

export function App() {
  return (
    <>
      <h1>@dedot/identicon</h1>
      <Identicon size={60} theme='polkadot' value='121UnpkzUSnuyM48xmM8QrnNzYbwr494fUyky89qFQEFzDsf' />
      <Identicon size={42} theme='polkadot' value='121UnpkzUSnuyM48xmM8QrnNzYbwr494fUyky89qFQEFzDsf' />
      <Identicon size={20} theme='polkadot' value='121UnpkzUSnuyM48xmM8QrnNzYbwr494fUyky89qFQEFzDsf' />
      <Identicon size={12} theme='polkadot' value='121UnpkzUSnuyM48xmM8QrnNzYbwr494fUyky89qFQEFzDsf' />
      <Identicon size={30} theme='polkadot' value='121UnpkzUSnuyM48xmM8QrnNzYbwr494fUyky89qFQEFzDsf' />
    </>
  );
}

export default App;
