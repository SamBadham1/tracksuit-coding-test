import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    fetch(`/api/insights`)
      .then((res) => res.json())
      .then((data: Insight[]) => setInsights(data))
      .catch((err) => console.error("Failed to fetch insights:", err));
  }, []);

  const handleDelete = (id: number) => {
    setInsights((prev) => prev.filter((insight) => insight.id !== id));
  };

  return (
    <main className={styles.main}>
      <Header />
      <Insights
        className={styles.insights}
        insights={insights}
        onDelete={handleDelete}
      />
    </main>
  );
};
