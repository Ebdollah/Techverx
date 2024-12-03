"use client";
import React, { startTransition, useState } from "react";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { editSnippet } from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet | null;
}

function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet?.code || '');
  const [id, setId] = useState(snippet?.id);

  const handleChange = (value: any) => {
    setCode(value);
  };

  const handleSubmit = () => {
    if (!snippet) {
      console.error("Snippet is null or undefined");
      return;
    }

    startTransition(async () => {
      await editSnippet(snippet?.id, code);
    });
  };

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet?.code || ""}
        onChange={(value) => handleChange(value)} // Pass the value correctly
      />

      <button className="p-2 border rounded-md" onClick={handleSubmit}>save</button>
    </div>
  );
}

export default SnippetEditForm;
