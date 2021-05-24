import React, { ReactElement, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  heroName: string;
  onSubmit: (name: string) => void;
}

export default function Welcome({ heroName, onSubmit }: Props): ReactElement {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (name.trim().length === 0 || name.length > 200) {
      toast.error("Invalid user name");
      return;
    }
    onSubmit(name);
  };
  return (
    <form className="welcome" onSubmit={submit}>
      <h1>{`Welcome to ${heroName}`}</h1>
      <h5>Type in your name and start learning words</h5>
      <input
        ref={inputRef}
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e): void => setName(e.target.value)}
      />
      <button type="submit">Start</button>
    </form>
  );
}
