import { NavigatorScreenParams } from '@react-navigation/native';
export type RepairStackParams = {
  RepairList: undefined;
  Article: { id: string };
};
export type StainStackParams = {
  StainList: undefined;
  Article: { id: string };
};
export type ScannerStackParams = {
  ScannerIntro: undefined;
  Questionnaire: undefined;
  CareResult: { answers: Record<string, number> };
};
export type ChecklistStackParams = {
  SavedToys: undefined;
  ToyDetail: { id: string };
};
export type TabsParams = {
  Repair: NavigatorScreenParams<RepairStackParams>;
  Scanner: NavigatorScreenParams<ScannerStackParams>;
  Stains: NavigatorScreenParams<StainStackParams>;
  Checklists: NavigatorScreenParams<ChecklistStackParams>;
  Facts: undefined;
  Calculator: undefined;
};
