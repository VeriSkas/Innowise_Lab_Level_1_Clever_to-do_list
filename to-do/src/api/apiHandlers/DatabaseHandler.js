import { onValue, push, ref, remove, set, update } from 'firebase/database';
import { database } from '../apiConfig';

export const createTodo = async (uid, todo) => {
  const todosRef = ref(database, `${uid}/todos`);
  const newTodoRef = push(todosRef);

  await set(newTodoRef, todo);
};

export const updateTodo = async (uid, todo) => {
  const { id, ...todoData } = todo;
  const todosRef = ref(database, `${uid}/todos/${id}`);

  return update(todosRef, todoData);
};

export const deleteTodo = async (uid, id) => {
  const todosRef = ref(database, `${uid}/todos/${id}`);

  return remove(todosRef);
};

export const getTodos = async (uid) => {
  const todosRef = ref(database, `${uid}/todos`);

  return new Promise((resolve) => {
    let todos = [];

    onValue(
      todosRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();

          todos.push({ id: childKey, ...childData });
        });
        resolve(todos);
      },
      {
        onlyOnce: true,
      }
    );
  });
};

export const getTodo = async (uid, id) => {
  const todoRef = ref(database, `${uid}/todos/${id}`);

  return new Promise((resolve) => {
    onValue(todoRef, (snapshot) => {
      const todo = snapshot.val();

      todo.id = id;
      resolve(todo);
    });
  });
};
