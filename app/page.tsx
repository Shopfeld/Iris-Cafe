"use client";

import '../app/app.css';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { useEffect, useRef, useState } from 'react';

import outputs from '@/amplify_outputs.json';

import type { Schema } from "@/amplify/data/resource";
Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const ref = useRef(null);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    alert("Hello, world!");
  }

  return (
    <main>
      <h1>Master App</h1>
      <input name="website-name" ref={ref} type="text" />
      <button onClick={createTodo}>Create new site</button>
    </main>
  );
}
