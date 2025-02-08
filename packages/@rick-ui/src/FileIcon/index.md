# FileIcon

This is an example component.

```jsx
import { Space, Card } from 'antd';
import { FileIcon } from '@rickzhou/react-ui';

const App = () => {
  return (
    <Space style={{ 'flex-wrap': 'wrap' }}>
      {Object.entries(FileIcon).map(([IconKey, Icon]) => (
        <Card title={IconKey} key={IconKey} hoverable>
          <Icon />
        </Card>
      ))}
    </Space>
  );
};

export default App;
```
