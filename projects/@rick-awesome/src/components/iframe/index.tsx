import { ContentWrapper } from '@rickzhou/awesome/theme/content-wrapper';
import { type FC } from 'react';

type IframeProps = {
  path: string;
};

const Iframe: FC<IframeProps> = ({ path }) => {
  return (
    <ContentWrapper>
      <div className="w-full overflow-hidden rounded-2xl">
        <iframe src={path} width={'100%'} height={screen.height * 0.5} />
      </div>
    </ContentWrapper>
  );
};

export default Iframe;
