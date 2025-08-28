
import React, { useState } from 'react';
import Form from './components/Form';
import Preview from './components/Preview';
import Header from './components/Header';
import type { FormData } from './types';

const App: React.FC = () => {
  const today = new Date();
  
  // Today's date for meeting and minutes creation
  const reiwaYear = today.getFullYear() - 2018;
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // Remuneration start date: 1st of next month
  const firstOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const remunerationReiwaYear = firstOfNextMonth.getFullYear() - 2018;
  const remunerationMonth = firstOfNextMonth.getMonth() + 1;

  // Bonus payment date: 25th of next month
  const twentyFifthOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 25);
  const bonusReiwaYear = twentyFifthOfNextMonth.getFullYear() - 2018;
  const bonusMonth = twentyFifthOfNextMonth.getMonth() + 1;

  const [formData, setFormData] = useState<FormData>({
    meetingDate: { year: `${reiwaYear}`, month: `${month}`, day: `${day}` },
    meetingTime: '10:00',
    companyName: 'サンプル株式会社',
    totalShareholders: '10',
    totalIssuedShares: '1000',
    votingShareholders: '10',
    totalVotingRights: '1000',
    attendingShareholders: '8',
    attendingVotingRights: '800',
    representativeDirector: '山田 太郎',
    attendingDirectors: [
      { id: crypto.randomUUID(), name: '山田 太郎' },
      { id: crypto.randomUUID(), name: '鈴木 一郎' },
    ],
    remunerationStartDate: { year: `${remunerationReiwaYear}`, month: `${remunerationMonth}`, day: '1' },
    remunerations: [
      { id: crypto.randomUUID(), title: '代表取締役', name: '山田 太郎', amount: '500000' },
      { id: crypto.randomUUID(), title: '取締役', name: '鈴木 一郎', amount: '400000' },
    ],
    includeBonusAgenda: true,
    bonuses: [
      { 
        id: crypto.randomUUID(), 
        title: '代表取締役',
        name: '山田 太郎', 
        amount: '1000000', 
        paymentDate: { year: `${bonusReiwaYear}`, month: `${bonusMonth}`, day: '25' } 
      },
    ],
    closingTime: '10:30',
    minutesCreationDate: { year: `${reiwaYear}`, month: `${month}`, day: `${day}` },
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="no-print">
            <Form formData={formData} setFormData={setFormData} />
          </div>
          <div id="print-area">
            <Preview formData={formData} />
          </div>
        </div>
      </main>
      <footer className="text-center text-sm text-gray-500 py-4 bg-gray-100 no-print">
        ＠GS共同会計事務所
      </footer>
    </div>
  );
};

export default App;
