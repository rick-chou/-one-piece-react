import { ContentWrapper } from '@rickzhou/awesome/theme/content-wrapper';
import { useTheme } from '@rickzhou/react-ui';
import dayjs from 'dayjs';
import { memo, useEffect, useRef, useState } from 'react';
import { FlipDown } from './flipdown';
import { flipdownStyle } from './style';

const getYear = () => {
  const now = dayjs();
  const currentYear = now.year();
  const targetDate = dayjs(`${currentYear}-11-24`);

  if (now.isBefore(targetDate)) {
    return currentYear;
  } else {
    return currentYear + 1;
  }
};

const Countdown = () => {
  const instance = useRef<FlipDown>();
  const { getInverseTheme } = useTheme();
  const [nextYear] = useState(getYear);

  useEffect(() => {
    instance.current = new FlipDown(
      Number(new Date(`${nextYear}-11-24`)) / 1000,
    ).start();
  }, [nextYear]);

  return (
    <ContentWrapper>
      <div className="mb-8 text-4xl font-bold italic">
        The {nextYear - 2023} <sup>th</sup> anniversary of marriage in
      </div>
      <div css={flipdownStyle}>
        <div
          id="flipdown"
          className={`flipdown flipdown__theme-${getInverseTheme()}`}></div>
      </div>
    </ContentWrapper>
  );
};

export default memo(Countdown);
