import { css } from '@emotion/react';
import { uniqueId } from 'lodash-es';
import { renderMsc } from 'mscgenjs';
import { useEffect, useRef } from 'react';

const SequenceChart: React.FC<{
  msc: string;
  onClick: (key: string) => void;
}> = ({ msc, onClick }) => {
  const id = useRef(uniqueId('msc_sequence_diagram_'));

  const bindEvents = (event: MouseEvent) => {
    event.preventDefault();
    const path = event.composedPath();
    for (const i in path) {
      const link = path[i] as HTMLElement;
      if ('getAttribute' in link && link.getAttribute('xlink:title')) {
        const key = link.getAttribute('xlink:title');
        if (key) {
          onClick(key);
        }

        break;
      }
    }
  };

  useEffect(() => {
    if (msc) {
      document.getElementById(id.current)!.innerHTML = '';
      renderMsc(
        msc,
        {
          additionalTemplate: 'fountainpen',
          mirrorEntitiesOnBottom: true,
          elementId: id.current,
          styleAdditions: 'backfround: red',
        },
        handleRenderMscResult,
      );
    }

    return () => {
      document
        // eslint-disable-next-line react-hooks/exhaustive-deps
        .getElementById(id.current)
        ?.removeEventListener('click', bindEvents);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msc]);

  function handleRenderMscResult(pError: Error, pSuccess: string) {
    if (pError) {
      console.error(pError);
      return;
    }

    if (pSuccess) {
      document.getElementById(id.current)?.addEventListener('click', bindEvents);
      return;
    }

    console.warn('Wat! Error nor success?');
  }

  return (
    <div
      id={id.current}
      css={css`
        .bglayer {
          fill: transparent !important;
        }
      `}></div>
  );
};

export default SequenceChart;
