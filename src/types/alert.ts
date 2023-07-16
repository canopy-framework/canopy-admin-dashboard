export type Alert = {
  name?: string;
  title?: string;
  value: string;
  active?: boolean;
  selected?: boolean;
};

export type Alerts = {
  [key: string]: Alert;
};

export type AlertNamesArray = Array<string>;
