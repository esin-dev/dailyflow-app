'use client';

import Link from 'next/link';

import { useState } from 'react';

export default function Dashboard() {

  const [listName, setListName] = useState('');

  const [lists, setLists] = useState([]);

  const createList = () => {

    if (!listName.trim()) return;

    const newList = {
      id: Date.now(),
      name: listName,
      tasks: [],
      taskInput: ''
    };

    setLists([...lists, newList]);

    setListName('');
  };

  const deleteList = (id) => {

    const updated =
      lists.filter((list) => list.id !== id);

    setLists(updated);
  };

  const updateTaskInput = (id, value) => {

    const updated = lists.map((list) => {

      if (list.id === id) {
        return {
          ...list,
          taskInput: value
        };
      }

      return list;
    });

    setLists(updated);
  };

  const addTask = (id) => {

    const updated = lists.map((list) => {

      if (list.id === id) {

        if (!list.taskInput.trim()) return list;

        return {
          ...list,
          tasks: [
            ...list.tasks,
            {
              id: Date.now(),
              text: list.taskInput,
              completed: false
            }
          ],
          taskInput: ''
        };
      }

      return list;
    });

    setLists(updated);
  };

  const toggleTask = (listId, taskId) => {

    const updated = lists.map((list) => {

      if (list.id === listId) {

        return {
          ...list,
          tasks: list.tasks.map((task) => {

            if (task.id === taskId) {
              return {
                ...task,
                completed: !task.completed
              };
            }

            return task;
          })
        };
      }

      return list;
    });

    setLists(updated);
  };

  const deleteTask = (listId, taskId) => {

    const updated = lists.map((list) => {

      if (list.id === listId) {

        return {
          ...list,
          tasks: list.tasks.filter(
            (task) => task.id !== taskId
          )
        };
      }

      return list;
    });

    setLists(updated);
  };

  return (

    <main className="min-h-screen bg-slate-100 p-8 text-black">

      <h1 className="text-5xl font-bold mb-8">
        My Lists
      </h1>

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Create a new list..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="flex-1 p-4 rounded-xl border"
        />

        <button
          onClick={createList}
          className="bg-indigo-600 text-white px-6 rounded-xl"
        >
          Create
        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {lists.map((list) => (

          <div
            key={list.id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-2xl font-semibold">
                {list.name}
              </h2>

              <button
                onClick={() => deleteList(list.id)}
                className="text-red-500"
              >
                Delete
              </button>

            </div>

            <div className="flex gap-2 mb-4">

              <input
                type="text"
                placeholder="Add task..."
                value={list.taskInput}
                onChange={(e) =>
                  updateTaskInput(
                    list.id,
                    e.target.value
                  )
                }
                className="flex-1 border p-3 rounded-xl"
              />

              <button
                onClick={() => addTask(list.id)}
                className="bg-slate-800 text-white px-4 rounded-xl"
              >
                Add
              </button>

            </div>

            <div className="space-y-3">

              {list.tasks.map((task) => (

                <div
                  key={task.id}
                  className="flex items-center justify-between bg-slate-100 p-3 rounded-xl"
                >

                  <p
                    onClick={() =>
                      toggleTask(
                        list.id,
                        task.id
                      )
                    }
                    className={`cursor-pointer ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : ''
                    }`}
                  >
                    {task.text}
                  </p>

                  <button
                    onClick={() =>
                      deleteTask(
                        list.id,
                        task.id
                      )
                    }
                    className="text-red-500"
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

        
          </div>

        ))}

<Link href="/login">
          <button className="bg-indigo-600 border px-5 py-3 rounded-xl">
            Logout
          </button>
        </Link>

      </div>

    </main>
  );
}