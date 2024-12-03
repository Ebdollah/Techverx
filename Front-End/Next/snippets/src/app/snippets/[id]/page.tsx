import React,{startTransition} from 'react'
import { db } from '@/db'
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { deleteSnippet } from '@/actions';

interface SnippetShowPageProps{
    params: Promise<{
      id: string;
    }>;
  }

export default async function SnippetShowPage(props: SnippetShowPageProps) {

    const {id} = await props.params;
    const snippet = await db.snippet.findFirst({
        where:{id: parseInt(id)}
    })

    if(!snippet){
        return notFound();
    }

    // const handleSubmit = () => {
    //   if (!snippet) {
    //     console.error("Snippet is null or undefined");
    //     return;
    //   }
  
    //   startTransition(async () => {
    //     await deleteSnippet(snippet?.id);
    //   });
    // };

    // const deleteSnippetAction = startTransition(async () => {
    //   await deleteSnippet(snippet?.id);
    // });
    
    const deleteSnippetAction = deleteSnippet.bind(null, snippet?.id)
  return (
    <div>
        <div className='flex justify-between items-center m-4'>
            <h1 className='text-xl font-bold'>{snippet.title}</h1>
            <div className='flex gap-4'>
                <Link href={`/snippets/${snippet.id}/edit`} className='p-2 border rounded-sm'>Edit</Link>
                <form action={deleteSnippetAction}>
                  <button className='p-2 border rounded-sm'>Delete</button>
                </form>
                {/* <Link href={`/`} onClick={handleSubmit} className='p-2 border rounded-sm'>Delete</Link> */}
            </div>
        </div>
        <pre className='p-3 border rounded-sm bg-gray-200 border-gray-200'>
            <code>{snippet.code}</code>
        </pre>
    </div>
    
  )
}

