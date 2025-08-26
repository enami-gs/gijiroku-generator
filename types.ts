
export interface DateObject {
  year: string;
  month: string;
  day: string;
}

export interface Director {
  id: string;
  name: string;
}

export interface Remuneration {
  id: string;
  title: string;
  name: string;
  amount: string;
}

export interface Bonus {
  id: string;
  title: string;
  name: string;
  amount: string;
  paymentDate: DateObject;
}

export interface FormData {
  meetingDate: DateObject;
  meetingTime: string;
  companyName: string;
  totalShareholders: string;
  totalIssuedShares: string;
  votingShareholders: string;
  totalVotingRights: string;
  attendingShareholders: string;
  attendingVotingRights: string;
  representativeDirector: string;
  attendingDirectors: Director[];
  remunerationStartDate: DateObject;
  remunerations: Remuneration[];
  includeBonusAgenda: boolean;
  bonuses: Bonus[];
  closingTime: string;
  minutesCreationDate: DateObject;
}