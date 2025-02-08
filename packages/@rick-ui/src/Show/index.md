# Show

This is an example component.

```jsx
import { Show } from '@rickzhou/react-ui';
import { Button, Space } from 'antd';
import { useState } from 'react';

const App = () => {
  const [condition, setCondition] = useState(false);
  return (
    <Space direction="vertical">
      <Button onClick={() => setCondition(pre => !pre)}>
        Toggle Condition
      </Button>
      <Show when={condition} fallback={'hidden'}>
        show
      </Show>
    </Space>
  );
};

export default App;
```

<API id="Show"></API>
