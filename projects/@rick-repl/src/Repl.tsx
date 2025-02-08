import '@rickzhou/react-repl/setup/index';
import { App, Spin, Splitter } from 'antd';
import { SideInitWidth } from './config/const';
import Editor from './editor';
import { useInit } from './hooks/useInit';
import Preview from './preview';

const Repl = () => {
  const { loading, compiler, formatter, linter } = useInit();

  if (loading) {
    return (
      <Spin tip="Init Editor" className="max-h-none!">
        <div className="h-screen" />
      </Spin>
    );
  }

  return (
    <App className="h-screen">
      <Splitter>
        <Splitter.Panel defaultSize={SideInitWidth}>
          <Editor compiler={compiler} formatter={formatter} linter={linter} />
        </Splitter.Panel>

        <Splitter.Panel>
          <Preview compiler={compiler} />
        </Splitter.Panel>
      </Splitter>
    </App>
  );
};

export default Repl;
