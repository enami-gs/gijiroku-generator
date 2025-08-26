
import React from 'react';
import type { Remuneration } from '../types';

interface DirectorRemunerationInputsProps {
  remunerations: Remuneration[];
  setRemunerations: (remunerations: Remuneration[]) => void;
}

const DirectorRemunerationInputs: React.FC<DirectorRemunerationInputsProps> = ({ remunerations, setRemunerations }) => {
  const handleAdd = () => {
    setRemunerations([...remunerations, { id: crypto.randomUUID(), title: '取締役', name: '', amount: '' }]);
  };

  const handleRemove = (id: string) => {
    setRemunerations(remunerations.filter((r) => r.id !== id));
  };

  const handleChange = <T,>(id: string, field: keyof Remuneration, value: T) => {
    setRemunerations(
      remunerations.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">報酬詳細</label>
      {remunerations.map((remuneration, index) => (
        <div key={remuneration.id} className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-3">
            <input
              type="text"
              placeholder="肩書"
              value={remuneration.title}
              onChange={(e) => handleChange(remuneration.id, 'title', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-4">
            <input
              type="text"
              placeholder="氏名"
              value={remuneration.name}
              onChange={(e) => handleChange(remuneration.id, 'name', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-4 flex items-center">
            <span className="text-sm mr-2">月額</span>
            <input
              type="number"
              placeholder="報酬額"
              value={remuneration.amount}
              onChange={(e) => handleChange(remuneration.id, 'amount', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <span className="text-sm ml-2">円</span>
          </div>
          <div className="col-span-1">
            <button
              type="button"
              onClick={() => handleRemove(remuneration.id)}
              className="text-red-600 hover:text-red-800 font-medium text-sm w-full text-center"
            >
              削除
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-dashed border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        ＋ 報酬対象者を追加
      </button>
    </div>
  );
};

export default DirectorRemunerationInputs;