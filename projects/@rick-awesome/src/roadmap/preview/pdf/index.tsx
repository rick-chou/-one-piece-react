import HttpPdf from '@rickzhou/awesome/assets/pdf/http.pdf';
import { ContentWrapper } from '@rickzhou/awesome/theme/content-wrapper';
import { useHover } from 'ahooks';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const width = screen.availWidth * 0.25;
const firstPageNum = 1;

const PdfPreview = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHover(ref);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(firstPageNum);
  }

  const btn = (type: 'left' | 'right') => {
    const invalidPage = type === 'left' ? firstPageNum : numPages;
    return (
      <button
        className="flex h-11 w-11 items-center justify-center rounded-xs border-0 text-xs hover:bg-slate-300"
        style={{
          background: pageNumber === invalidPage ? '#FFF' : '',
          color: pageNumber === invalidPage ? '#ccc' : 'inherit',
        }}
        disabled={pageNumber === invalidPage}
        onClick={() => {
          setPageNumber(pre => (type === 'left' ? pre - 1 : pre + 1));
        }}>
        {type === 'left' ? '‹' : '›'}
      </button>
    );
  };

  return (
    <ContentWrapper>
      <div style={{ width }} ref={ref}>
        <Document file={HttpPdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={width} />
          <div
            className="absolute right-1/2 bottom-4 z-50 flex translate-x-[50%] overflow-hidden rounded-sm bg-white shadow-2xl transition-opacity duration-500"
            style={{ opacity: isHovering ? 1 : 0 }}>
            {btn('left')}
            <span className="flex items-center justify-center px-2 font-serif text-xs font-thin">
              {pageNumber} of {numPages}
            </span>
            {btn('right')}
          </div>
        </Document>
      </div>
    </ContentWrapper>
  );
};

export default PdfPreview;
