export interface Meter {
  type: string;
  number: string;
  voltage: string;
  current: string;
  digits: string;
  manufactureYear: string;
  currentReading: string;
  verificationDate: string;
  accuracyClass: string;
  tariffCount: string;
  location: string;
}

export interface Consumer {
  id: string;
  fullName: string;
  address: string;
  accountNumber: string;
  contractNumber: string;
  contractDate: string;
}

export interface ActBase {
  id: string;
  actNumber: string;
  date: string;
  time: string;
  consumer: Consumer;
  reason: string;
  method: string;
  representativeSignature: string;
  consumerSignature: string | null;
  photos: string[];
  isSynced: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LimitationAct extends ActBase {
  type: 'limitation';
  sealNumbers: string[];
  inputSwitchExists: boolean;
  inputSwitchSealNumber: string;
  meter: Meter;
  witnesses: string[];
}

export interface RestorationAct extends ActBase {
  type: 'restoration';
  inputSwitchExists: boolean;
  inputSwitchSealNumber: string;
  meter: Meter;
}

export type Act = LimitationAct | RestorationAct;

export interface DailyReport {
  id: string;
  date: string;
  inspectorId: string;
  actIds: string[];
  isSynced: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  filepath: string;
  webviewPath?: string;
  meterNumber: string;
  timestamp: Date;
}