import SequenceChart from '@rickzhou/awesome/blog/components/sequence-chart';
import { message } from 'antd';
import { msc } from './msc';

const Sequence = () => {
  return (
    <div className="flex w-full items-end justify-center overflow-hidden rounded-lg bg-white py-2 shadow-md dark:shadow-stone-100">
      <SequenceChart
        msc={msc}
        onClick={async (key: string) => {
          await message.info(key);
        }}
      />
    </div>
  );
};

export default Sequence;
