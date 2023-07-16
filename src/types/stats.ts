export type ClickhouseStats = { [key: string]: string | number };

type GrafanaStat = { [key: string]: string | number };

export type GrafanaStats = { [key: string]: GrafanaStat };

export type CloudfrontInfo = { [key: string]: string | number };
