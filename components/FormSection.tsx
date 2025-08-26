
import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
