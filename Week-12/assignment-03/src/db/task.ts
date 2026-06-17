import { client } from '../index';

export async function createTask(projectId: number, title: string, dueDate: string) {
  const query = `INSERT INTO tasks(project_id ,title ,due_date) VALUES($1,$2,$3) RETURNING *`
  const values = [projectId, title, dueDate]

  const task = await client.query(query, values)

  return task.rows[0]
}

export async function updateTask(taskId: number, completed: boolean) {

  const query = `UPDATE tasks SET completed=$1 WHERE id=$2 RETURNING *`
  const values = [completed, taskId]
  const updatedTask = await client.query(query, values)

  return updatedTask.rows[0]
}

export async function getTasks(projectId: number) {
  const task = await client.query(`SELECT * FROM tasks WHERE project_id=$1`, [projectId])

  return task.rows
}
