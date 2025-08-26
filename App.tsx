
import React, { useState } from 'react';
import Form from './components/Form';
import Preview from './components/Preview';
import Header from './components/Header';
import type { FormData } from './types';

const App: React.FC = () => {
  const today = new Date();
  const reiwaYear = today.getFullYear() - 2018;

  const [formData, setFormData] = useState<FormData>({
    meetingDate: { year: `${reiwaYear}`, month: '6', day: '20' },
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
    remunerationStartDate: { year: `${reiwaYear}`, month: '7', day: '1' },
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
        paymentDate: { year: `${reiwaYear}`, month: '7', day: '25' } 
      },
    ],
    closingTime: '10:30',
    minutesCreationDate: { year: `${reiwaYear}`, month: '6', day: '20' },
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="no-print">
            <Form formData={formData} setFormData={setFormData} />
          </div>
          <div id="print-area">
            <Preview formData={formData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;