import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { useState } from "react";
import type { Insight } from "../../schemas/insight.ts";

type AddInsightProps = ModalProps & {
  onCreate(insight: Insight): void;
};

export const AddInsight = (props: AddInsightProps) => {
  const [brand, setBrand] = useState<number>(BRANDS[0]?.id || 1);
  const [text, setText] = useState<string>("");

  const addInsight = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/insights/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandId: brand,
          brandName: BRANDS.find((b) => b.id === brand)?.name ?? "",
          text,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create insight:", await response.text());
        return;
      }

      const created: Insight = await response.json();
      props.onCreate(created);
      setBrand(BRANDS[0]?.id || 1);
      setText("");
      props.onClose();
    } catch (error) {
      console.error("Failed to create insight:", error);
    }
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select
            className={styles["field-input"]}
            value={brand}
            onChange={(e) => setBrand(Number(e.target.value))}
          >
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
