import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): void => {
  console.log(`Soft deleting insight id=${input.id}`);

  input.db.exec(`UPDATE insights SET isDeleted = 1 WHERE id = ${input.id}`);

  console.log("Insight soft-deleted");
};
