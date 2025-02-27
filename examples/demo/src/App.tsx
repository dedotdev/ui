import './App.css';
import { Identicon, IconTheme } from '@dedot/react-identicon';

export function App() {
  const themes: IconTheme[] = ['polkadot', 'substrate'];

  return (
    <>
      <h1>@dedot/identicon</h1>
      {themes.map((theme) => (
        <div key={theme} style={{ marginBottom: 16 }}>
          <Identicon
            style={{ marginRight: 8 }}
            size={12}
            theme={theme}
            value='121UnpkzUSnuyM48xmM8QrnNzYbwr494fUyky89qFQEFzDsf'
          />
          <Identicon
            style={{ marginRight: 8 }}
            size={20}
            theme={theme}
            value='5EytiMsxFWDYRykDkzuPyqHY9aWte6ZWfzX8MDxqewSu2V31'
          />
          <Identicon
            style={{ marginRight: 8 }}
            size={30}
            theme={theme}
            value='5EytiMsxFWDYRykDkzuPyqHY9aWte6ZWfzX8MDxqewSu2V31'
          />
          <Identicon
            style={{ marginRight: 8 }}
            size={42}
            theme={theme}
            value='5EM5cJza2k5485daEV2kqgTfpc8DgbGPwAZWWYz3anbDE2v1'
          />
          <Identicon
            style={{ marginRight: 8 }}
            size={60}
            theme={theme}
            value='5GqrnLA7eCp163Rj3XF1JR1CD636hfXwZmYoQkgDm1M1HpBA'
          />
        </div>
      ))}
    </>
  );
}

export default App;
