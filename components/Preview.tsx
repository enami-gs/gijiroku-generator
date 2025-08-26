
import React from 'react';
import type { FormData } from '../types';

interface PreviewProps {
  formData: FormData;
}

const Preview: React.FC<PreviewProps> = ({ formData }) => {
  
  const formatNumber = (val: string | number) => {
    const num = Number(val);
    return isNaN(num) ? val : num.toLocaleString();
  };

  const formatTime = (timeStr: string): string => {
    if (!timeStr) return '';
    const parts = timeStr.split(':');
    if (parts.length !== 2) return '';
    
    const hour24 = parseInt(parts[0], 10);
    const minuteStr = parts[1];

    if (isNaN(hour24) || isNaN(parseInt(minuteStr, 10))) return '';

    if (hour24 < 12) {
      return `午前 ${hour24} 時 ${minuteStr} 分`;
    } else {
      const hour12 = hour24 === 12 ? 12 : hour24 - 12;
      return `午後 ${hour12} 時 ${minuteStr} 分`;
    }
  };

  const pad = (str: string) => String(str).padStart(2, ' ');
  const year = (str: string) => String(str).padStart(2, ' ');
  const getAttendingDirectorsText = () => {
    return formData.attendingDirectors.map(d => d.name).join('、');
  };

  return (
    <div className="bg-white shadow-xl p-10 font-serif-jp text-black text-sm leading-relaxed">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center mb-6">定時株主総会議事録</h1>

        <div className="space-y-3">
            <p>
              令和 {year(formData.meetingDate.year)} 年 {pad(formData.meetingDate.month)} 月 {pad(formData.meetingDate.day)} 日
              {formData.meetingTime && ` ${formatTime(formData.meetingTime)}`}
              より、当会社の本店において定時株主総会を開催した。
            </p>

            <p>当日の出席株主数ならびに株式数は下記のとおり。</p>
            <div className="pl-8 my-3 space-y-1">
              <p>株主の総数 {formatNumber(formData.totalShareholders)} 名</p>
              <p>発行済株式の総数 {formatNumber(formData.totalIssuedShares)} 株</p>
              <p>議決権を行使できる株主の数 {formatNumber(formData.votingShareholders)} 名</p>
              <p>議決権を行使することができる株主の議決権の数 {formatNumber(formData.totalVotingRights)} 個</p>
              <p>出席株主数（委任状による者を含む） {formatNumber(formData.attendingShareholders)} 名</p>
              <p>出席株主の議決権の数 {formatNumber(formData.attendingVotingRights)} 個</p>
            </div>

            <p>出席取締役 {getAttendingDirectorsText()}</p>
            <p>【代表取締役】 {formData.representativeDirector} （議長兼議事録作成者）</p>

            <p>
              定刻、代表取締役 {formData.representativeDirector} は議長席に着き、定款により議長たることを述べ、本総会の開会を告げ、本日の出席株主数およびその持株数、議決権数を前記のとおり報告し、定足数を満たしているので本総会は適法に成立した旨を述べ、直ちに議事に入った。
            </p>
        </div>


        <div className="mt-6 space-y-5">
          <section>
            <h2 className="font-bold text-lg">第１号議案 取締役各個の受けるべき報酬金額決定の件</h2>
            <p className="mt-2">
              取締役各個の受けるべき報酬金額について、全員一致をもって決議されたことにより、その総額を年額金
              {formatNumber(formData.remunerations.reduce((sum, r) => sum + (Number(r.amount) || 0) * 12, 0))}
              円以内と確定し、令和 {year(formData.remunerationStartDate.year)} 年 {pad(formData.remunerationStartDate.month)} 月 {pad(formData.remunerationStartDate.day)} 日以降支給される報酬金額より適宜改定することとし、各取締役の報酬は次のとおりとしたい旨を議長から述べ、その承認を求めたところ、満場異議なくこれを承認可決した。
            </p>
            <div className="pl-8 mt-2 space-y-1">
              {formData.remunerations.map(r => (
                <p key={r.id}>{r.title} {r.name} 月額 {formatNumber(r.amount)} 円</p>
              ))}
            </div>
          </section>

          {formData.includeBonusAgenda && (
            <section>
              <h2 className="font-bold text-lg">第２号議案 取締役の受けるべき賞与額及び支給日決定の件</h2>
              <p className="mt-2">
                議長は、取締役の受けるべき賞与額及び支給日について以下のとおりとする旨を説明し、その承認を求めたところ、議場は異議なく承認可決した。
              </p>
              <div className="pl-8 mt-2 space-y-1">
                {formData.bonuses.map(b => (
                    <p key={b.id}>
                        {b.title} {b.name} 令和 {year(b.paymentDate.year)} 年 {pad(b.paymentDate.month)} 月 {pad(b.paymentDate.day)} 日 {formatNumber(b.amount)} 円
                    </p>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-6 space-y-3">
            <p>
              以上をもって本総会の議事を終了したので、議長は、
              {formData.closingTime && ` ${formatTime(formData.closingTime)}`}
              閉会を宣した。
            </p>

            <p>
              上記決議を明確にするため、本議事録を作成し、議長、出席取締役が次に記名押印する。
            </p>
        </div>


        <div className="mt-10 space-y-3 text-right">
          <p>令和 {year(formData.minutesCreationDate.year)} 年 {pad(formData.minutesCreationDate.month)} 月 {pad(formData.minutesCreationDate.day)} 日</p>
          <p>{formData.companyName} 定時株主総会</p>
          <p className="mt-4">代表取締役（議長兼議事録作成者） {formData.representativeDirector} 印</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
