import { useState } from "react";

import "./App.css";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: `${string}-${string}-${string}-${string}-${string}`;
  timestamp: number;
  text: string;
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Videojuegos",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Peliculas",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Series",
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };
    setItems((prevItems) => {
      return [...prevItems, newItem];
    });
    input.value = "";
  };
  const createHandleDelete = (id: ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter((currentItem) => currentItem.id !== id);
    });
  };
  return (
    <main>
      <aside>
        <h1>react preueba tecnica typescript</h1>
        <h3>añadir y eliminar elementos de una lista</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Elemento a introducir:
            <input
              type="text"
              name="item"
              required
              placeholder="Videojuegos "
            />
          </label>
          <button>Añadir elemento</button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {items.length === 0 ? (
            <p>
              <strong>No hay elementos</strong>
            </p>
          ) : (
            items.map((item) => {
              return (
                <li key={item.id}>
                  {item.text}
                  <button onClick={createHandleDelete(item.id)}>
                    Eliminar
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;
