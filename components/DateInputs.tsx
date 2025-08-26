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
        <div className="mt-1 flex items-baseline space-x-2">
            <div className="flex items-baseline gap-x-1">
                <span className="text-sm text-gray-500">令和</span>
                <input
                    type="number"
                    id={`${idPrefix}-year`}
                    value={date.year}
                    onChange={(e) => onDateChange('year', e.target.value)}
                    className="block w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="7"
                />
                <label htmlFor={`${idPrefix}-year`} className="text-sm text-gray-800">年</label>
            </div>
            <div className="flex items-baseline gap-x-1">
                <input
                    type="number"
                    id={`${idPrefix}-month`}
                    value={date.month}
                    onChange={(e) => onDateChange('month', e.target.value)}
                    className="block w-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="6"
                />
                <label htmlFor={`${idPrefix}-month`} className="text-sm text-gray-800">月</label>
            </div>
            <div className="flex items-baseline gap-x-1">
                <input
                    type="number"
                    id={`${idPrefix}-day`}
                    value={date.day}
                    onChange={(e) => onDateChange('day', e.target.value)}
                    className="block w-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="20"
                />
                <label htmlFor={`${idPrefix}-day`} className="text-sm text-gray-800">日</label>
            </div>
        </div>
    </div>
  );
};

export default DateInputs;