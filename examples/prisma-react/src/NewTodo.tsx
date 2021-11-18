import { useState } from "react";

export default function NewTodo() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!title || !content) return;
        // addTodo({ title, content });
        setTitle('');
        setContent('');
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );


}

