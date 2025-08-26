import React from 'react';
import type { FormData, Director, DateObject, Remuneration, Bonus } from '../types';
import FormSection from './FormSection';
import InputGroup from './InputGroup';
import DateInputs from './DateInputs';
import DirectorRemunerationInputs from './DirectorRemunerationInputs';
import DirectorBonusInputs from './DirectorBonusInputs';

interface FormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Form: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = <T,>(
    group: keyof FormData,
    field: keyof DateObject,
    value: T
  ) => {
    setFormData((prev) => ({
      ...prev,
      [group]: { ...(prev[group] as DateObject), [field]: value },
    }));
  };
  
  const handleDirectorChange = (index: number, value: string) => {
    const newDirectors = [...formData.attendingDirectors];
    newDirectors[index] = { ...newDirectors[index], name: value};
    setFormData(prev => ({...prev, attendingDirectors: newDirectors}));
  }

  const addDirector = () => {
    setFormData(prev => ({...prev, attendingDirectors: [...prev.attendingDirectors, {id: crypto.randomUUID(), name: ''}]}));
  }
  
  const removeDirector = (id: string) => {
    setFormData(prev => ({...prev, attendingDirectors: prev.attendingDirectors.filter(d => d.id !== id)}));
  }

  return (
    <form className="space-y-8">
      <FormSection title="基本情報">
        <InputGroup
          label="会社名"
          id="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        <DateInputs
          idPrefix="minutesCreationDate"
          date={formData.minutesCreationDate}
          onDateChange={(field, value) => handleDateChange('minutesCreationDate', field, value)}
          label="議事録作成日"
        />
      </FormSection>

      <FormSection title="総会開催情報">
        <DateInputs
            idPrefix="meeting-date"
            date={formData.meetingDate}
            onDateChange={(field, value) => handleDateChange('meetingDate', field, value)}
            label="開催年月日"
        />
        <InputGroup
            label="開催時刻"
            id="meetingTime"
            type="time"
            value={formData.meetingTime}
            onChange={handleInputChange}
            hint="時間は任意です。空欄可。"
            required={false}
        />
        <InputGroup
            label="閉会時刻"
            id="closingTime"
            type="time"
            value={formData.closingTime}
            onChange={handleInputChange}
            hint="時間は任意です。空欄可。"
            required={false}
        />
      </FormSection>

      <FormSection title="株式・株主情報">
         <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">謄本や定款を見ながら入力してください。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <InputGroup label="株主の総数 (名)" id="totalShareholders" type="number" value={formData.totalShareholders} onChange={handleInputChange} />
            <InputGroup label="発行済株式の総数 (株)" id="totalIssuedShares" type="number" value={formData.totalIssuedShares} onChange={handleInputChange} />
            <InputGroup label="議決権を行使できる株主の数 (名)" id="votingShareholders" type="number" value={formData.votingShareholders} onChange={handleInputChange} />
            <InputGroup label="議決権の数 (個)" id="totalVotingRights" type="number" value={formData.totalVotingRights} onChange={handleInputChange} />
            {/* FIX: Add missing onChange handler. */}
            <InputGroup label="出席株主数 (名)" id="attendingShareholders" type="number" value={formData.attendingShareholders} onChange={handleInputChange} hint="委任状による者を含む" />
            <InputGroup label="出席株主の議決権の数 (個)" id="attendingVotingRights" type="number" value={formData.attendingVotingRights} onChange={handleInputChange} />
        </div>
      </FormSection>

       <FormSection title="出席取締役">
        <InputGroup label="代表取締役 (議長兼議事録作成者)" id="representativeDirector" value={formData.representativeDirector} onChange={handleInputChange} />
         <div className="space-y-3">
           <label className="block text-sm font-medium text-gray-700">その他の出席取締役</label>
           {formData.attendingDirectors.map((director, index) => (
             <div key={director.id} className="flex items-center gap-3">
               <input type="text" placeholder="取締役氏名" value={director.name} onChange={(e) => handleDirectorChange(index, e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
               <button type="button" onClick={() => removeDirector(director.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">削除</button>
             </div>
           ))}
            <button type="button" onClick={addDirector} className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-dashed border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">＋ 出席取締役を追加</button>
         </div>
       </FormSection>

      <FormSection title="第1号議案: 取締役報酬">
        <DateInputs
          idPrefix="remuneration-start-date"
          date={formData.remunerationStartDate}
          onDateChange={(field, value) => handleDateChange('remunerationStartDate', field, value)}
          label="報酬支給開始日"
        />
        <DirectorRemunerationInputs
          remunerations={formData.remunerations}
          setRemunerations={(remunerations: Remuneration[]) => setFormData(prev => ({...prev, remunerations}))}
        />
      </FormSection>

      <FormSection title="第2号議案: 取締役賞与">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="includeBonusAgenda"
              name="includeBonusAgenda"
              type="checkbox"
              checked={formData.includeBonusAgenda}
              onChange={(e) => setFormData(prev => ({...prev, includeBonusAgenda: e.target.checked}))}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="includeBonusAgenda" className="font-medium text-gray-700">
              賞与に関する議案を含める
            </label>
            <p className="text-gray-500 text-xs">賞与を支給しない場合はチェックを外してください。</p>
          </div>
        </div>
        {formData.includeBonusAgenda && (
          <div className="mt-6">
            <DirectorBonusInputs 
              bonuses={formData.bonuses}
              setBonuses={(bonuses: Bonus[]) => setFormData(prev => ({...prev, bonuses}))}
            />
          </div>
        )}
      </FormSection>
    </form>
  );
};

export default Form;