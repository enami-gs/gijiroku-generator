
import React from 'react';
import type { DateObject } from '../types';

interface DateInputsProps {
  idPrefix: string;
  date: DateObject;
  onDateChange: (field: keyof DateObject, value: string) => void;
  label: string;
}

const DateInputs: React.FC<DateInputsProps> = ({ idPrefix, date, onDateChange, label }) => {
  return (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 grid grid-cols-3 gap-3 items-center">
            <div className="flex items-center col-span-1">
                <span className="text-sm text-gray-500 mr-2">令和</span>
                <input
                    type="number"
                    id={`${idPrefix}-year`}
                    value={date.year}
                    onChange={(e) => onDateChange('year', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="年"
                />
                 <span className="text-sm text-gray-800 ml-2">年</span>
            </div>
            <div className="flex items-center col-span-1">
                <input
                    type="number"
                    id={`${idPrefix}-month`}
                    value={date.month}
                    onChange={(e) => onDateChange('month', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="月"
                />
                <span className="text-sm text-gray-800 ml-2">月</span>
            </div>
            <div className="flex items-center col-span-1">
                <input
                    type="number"
                    id={`${idPrefix}-day`}
                    value={date.day}
                    onChange={(e) => onDateChange('day', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="日"
                />
                <span className="text-sm text-gray-800 ml-2">日</span>
            </div>
        </div>
    </div>
  );
};

export default DateInputs;
