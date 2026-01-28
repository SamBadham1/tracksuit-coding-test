import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  brandId: number;
  brandName: string;
  text: string;
};

export default (input: Input): Insight | undefined => {
  console.log(`Creating insight for brand=${input.brandId}`);

  const createdAt = new Date().toISOString();

  const insertData: insightsTable.Insert = {
    brandId: input.brandId,
    brandName: input.brandName,
    isDeleted: 0,
    createdAt: createdAt,
    text: input.text,
  };

  input.db.exec(insightsTable.insertStatement(insertData));

  const lastInsertId = input.db.lastInsertRowId;

  const [row] = input.db
    .sql<insightsTable.Row>`SELECT * FROM insights WHERE id = ${lastInsertId} LIMIT 1`;

  const result: Insight = {
    ...row,
    createdAt: new Date(row.createdAt),
  };

  console.log("Insight created:", result);
  return result;
};