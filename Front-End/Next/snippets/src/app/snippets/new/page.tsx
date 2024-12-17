'use client'
import { createSnippet } from "@/actions";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { useActionState, startTransition } from "react";



export default function SnippetCreatePage() {
  
  

    const [formState, action] : any = useActionState(createSnippet, {message: ''} )
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      startTransition(() => {
        action(formData);
      });
    }
  

    // const createSnippetAction = createSnippet.bind(null)
  
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {
          formState?.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div> : null
        }

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
