/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-for-in-array */
import { uniqueId } from 'lodash';
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
        .getElementById(id.current)
        ?.removeEventListener('click', bindEvents);
    };
  }, [msc]);

  function handleRenderMscResult(pError: Error, pSuccess: string) {
    if (pError) {
      console.error(pError);
      return;
    }

    if (pSuccess) {
      document
        .getElementById(id.current)
        ?.addEventListener('click', bindEvents);
      return;
    }

    console.log('Wat! Error nor success?');
  }

  return <div id={id.current}></div>;
};

export default SequenceChart;
