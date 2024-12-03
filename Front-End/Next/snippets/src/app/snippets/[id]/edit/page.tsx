import React from 'react'
import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/SnippetEditForm';

interface SnippetEditPageProps{
    params: Promise<{
      id: string;
    }>;
  }
  

async function SnippetEditPage(props: SnippetEditPageProps) {
    const {id} = await props.params;
    const snippetId = parseInt(id);

    const snippet = await db.snippet.findFirst({
        where:{id: snippetId}
    }) 

    !snippet && notFound() 
  return (
    <div>
        <h1>Editing snippet with title {snippet?.title}</h1>
        <SnippetEditForm snippet={snippet} />
    </div>
  )
}

export default SnippetEditPage