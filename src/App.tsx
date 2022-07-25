import { Clipboard, Plus } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";
import "./global.css";

interface Task {
  id: number;
  text: string;
  checked: boolean;
}

function App() {
  const [tasks, setTasks] = useState([] as Task[]);

  const [newTaskText, setNewTaskText] = useState("");

  function totalFinished() {
    const finisheds = tasks.filter((task) => task.checked == true);
    return `${finisheds.length} de ${tasks.length}`;
  }

  function handleNewTaskChageText(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      checked: false,
      text: newTaskText,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  }

  function handleNewTaskTextInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  function deleteTask(id: number) {
    let newTasks = [...tasks];
    newTasks = newTasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  }

  function completeTask(id: number) {
    let newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((task) => task.id == id);
    newTasks[taskIndex].checked = !newTasks[taskIndex].checked;
    setTasks(newTasks);
  }

  return (
    <div>
      <Header />

      <div className={styles.todo}>
        <form onSubmit={handleCreateNewTask} className={styles.form}>
          <input
            required
            value={newTaskText}
            onChange={handleNewTaskChageText}
            placeholder="Adicione uma nova tarefa"
            onInvalid={handleNewTaskTextInvalid}
          ></input>
          <button>
            Criar
            <Plus />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.total}>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length | 0}</span>
            </div>

            <div className={styles.finished}>
              <strong>Concluídas</strong>
              <span>{totalFinished()}</span>
            </div>
          </div>

          <div className={styles.taskList}>
            {tasks.map((task) => {
              return (
                <Task
                  checked={task.checked}
                  id={task.id}
                  onDeleteTask={deleteTask}
                  text={task.text}
                  onCompleteTask={completeTask}
                />
              );
            })}
          </div>

          <div className={tasks.length == 0 ? styles.noTasks : styles.hasTasks}>
            <Clipboard size={56} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
