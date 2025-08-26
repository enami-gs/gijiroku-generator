import React, { useState } from 'react';

// Inform TypeScript about the global variables from the CDN scripts in index.html
declare const html2canvas: any;
declare const jspdf: any;

const Header: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePdfExport = () => {
    const printArea = document.getElementById('print-area');
    if (!printArea) {
      console.error('Element with id "print-area" not found.');
      return;
    }

    setIsGenerating(true);

    html2canvas(printArea, {
      scale: 2, // Use higher scale for better image quality
      useCORS: true,
      // Ensure the canvas captures the full content, not just the visible part
      windowWidth: printArea.scrollWidth,
      windowHeight: printArea.scrollHeight,
    }).then(canvas => {
      try {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = jspdf;
        
        // A4 page dimensions in mm: 210 x 297
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        
        // Calculate the image dimensions to fit the PDF width
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;
        const imgHeight = pdfWidth / canvasAspectRatio;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        pdf.save('株主総会議事録.pdf');
      } catch (error) {
        console.error("Error creating PDF:", error);
      } finally {
        setIsGenerating(false);
      }
    }).catch(err => {
      console.error("Error with html2canvas:", err);
      setIsGenerating(false);
    });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            株主総会議事録ジェネレーター
          </h1>
          <button
            onClick={handlePdfExport}
            disabled={isGenerating}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            <PrinterIcon className="h-5 w-5 mr-2" />
            {isGenerating ? '生成中...' : '印刷 / PDF保存'}
          </button>
        </div>
      </div>
    </header>
  );
};

const PrinterIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125H8.625c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
    </svg>
);


export default Header;
