export const createTable = `
  CREATE TABLE IF NOT EXISTS insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brandId INTEGER NOT NULL,
    brandName TEXT NOT NULL,
    isDeleted INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    text TEXT NOT NULL
  )
`;

export type Row = {
  id: number;
  brandId: number;
  brandName: string;
  isDeleted: number;
  createdAt: string;
  text: string;
};

export type Insert = {
  brandId: number;
  brandName: string;
  isDeleted?: number;
  createdAt: string;
  text: string;
};

export const insertStatement = (item: Insert) =>
  `INSERT INTO insights (brandId, brandName, isDeleted, createdAt, text) VALUES (${item.brandId}, '${item.brandName.replace(/'/g, "''")}', ${item.isDeleted ?? 0}, '${item.createdAt}', '${item.text.replace(/'/g, "''")}')`;

