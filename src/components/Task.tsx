import { Check, Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface Task {
  id: number;
  text: string;
  checked: boolean;
  onDeleteTask: (id: number) => void;
  onCompleteTask: (id: number) => void;
}

export function Task({
  checked,
  id,
  text,
  onDeleteTask,
  onCompleteTask,
}: Task) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCompleteTask() {
    onCompleteTask(id);
  }

  return (
    <div className={styles.task}>
      <button
        onClick={handleCompleteTask}
        title="Marcar como concluida"
        className={checked ? styles.checkedButton : styles.noCheckedButton}
      >
        <Check />
      </button>
      <span className={checked ? styles.checkedSpan : styles.noCheckedSpan}>{text}</span>
      <button
        onClick={handleDeleteTask}
        title="Remover tarefa"
        className={styles.removeTask}
      >
        <Trash size={20} />
      </button>
    </div>
  );
}
