import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import { formatFriendlyDate } from "../../lib/dates.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
  onDelete(id: number): void;
};

export const Insights = ({ insights, className, onDelete }: InsightsProps) => {
  const deleteInsight = async (id: number) => {
    try {
      const res = await fetch(`/api/insights/delete?id=${id}`);
      console.log(res);
      if (!res.ok) {
        console.error("Failed to delete insight", await res.text());
        return;
      }
      onDelete(id);
    } catch (e) {
      console.error("Failed to delete insight", e);
    }
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? insights.map(({ id, text, createdAt, brandName }) => (
            <div className={styles.insight} key={id}>
              <div className={styles["insight-meta"]}>
                <span>{brandName}</span>
                <div className={styles["insight-meta-details"]}>
                  <span>{formatFriendlyDate(createdAt)}</span>
                  <Trash2Icon
                    className={styles["insight-delete"]}
                    onClick={() => deleteInsight(id)}
                  />
                </div>
              </div>
              <p className={styles["insight-content"]}>{text}</p>
            </div>
          ))
          : <p>We have no insight!</p>}
      </div>
    </div>
  );
};
