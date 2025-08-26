
import React from 'react';
import DateInputs from './DateInputs';
import type { Bonus, DateObject } from '../types';

interface DirectorBonusInputsProps {
  bonuses: Bonus[];
  setBonuses: (bonuses: Bonus[]) => void;
}

const DirectorBonusInputs: React.FC<DirectorBonusInputsProps> = ({ bonuses, setBonuses }) => {
  const handleAdd = () => {
    const today = new Date();
    const twentyFifthOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 25);
    const bonusReiwaYear = twentyFifthOfNextMonth.getFullYear() - 2018;
    const bonusMonth = twentyFifthOfNextMonth.getMonth() + 1;
    
    setBonuses([
      ...bonuses,
      {
        id: crypto.randomUUID(),
        title: '取締役',
        name: '',
        amount: '',
        paymentDate: { year: `${bonusReiwaYear}`, month: `${bonusMonth}`, day: '25' },
      },
    ]);
  };

  const handleRemove = (id: string) => {
    setBonuses(bonuses.filter((b) => b.id !== id));
  };

  const handleChange = <T,>(id: string, field: keyof Bonus, value: T) => {
    setBonuses(
      bonuses.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleDateChange = (id: string, field: keyof DateObject, value: string) => {
    setBonuses(
        bonuses.map((b) => (b.id === id ? { ...b, paymentDate: {...b.paymentDate, [field]: value }} : b))
    )
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">賞与詳細</label>
      {bonuses.map((bonus) => (
        <div key={bonus.id} className="p-4 border border-gray-200 rounded-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="肩書"
              value={bonus.title}
              onChange={(e) => handleChange(bonus.id, 'title', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="氏名"
              value={bonus.name}
              onChange={(e) => handleChange(bonus.id, 'name', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div className="flex items-center">
              <input
                type="number"
                placeholder="賞与額"
                value={bonus.amount}
                onChange={(e) => handleChange(bonus.id, 'amount', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <span className="text-sm ml-2">円</span>
            </div>
          </div>
          <DateInputs
            idPrefix={`bonus-${bonus.id}`}
            date={bonus.paymentDate}
            onDateChange={(field, value) => handleDateChange(bonus.id, field, value)}
            label="支給日"
          />
           <p className="text-xs text-gray-500">ヒント: 決議した支給日に支払う義務があります。休日を避け、平日を設定するのが一般的です。</p>
          <button
            type="button"
            onClick={() => handleRemove(bonus.id)}
            className="text-red-600 hover:text-red-800 font-medium text-sm w-full text-right"
          >
            削除
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-dashed border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        ＋ 賞与対象者を追加
      </button>
    </div>
  );
};

export default DirectorBonusInputs;
