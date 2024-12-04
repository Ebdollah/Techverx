'use server'
import { db } from "@/db"
import { redirect } from "next/navigation"


export async function createSnippet(formState: {message: string}, formData: FormData) {
    // This needs tobe a sever action!
    // Check the user's inputs and make sure they're valid

    try{
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    if(title.length < 0 || code.length < 0){
        return { message : 'title or code is missing' }
    }
    // Create new record in the database
    const snippet = await db.snippet.create({
      data:{
        title:title,
        code:code
      }
    })
    }catch (err: unknown) {
        if (err instanceof Error) {
        return {
        message: err.message,
        };
    }else {
        return {
        message: 'Something went wrong....'
        };
    }
    redirect('/');
}
}

export async function editSnippet(id: number, code: string){
    await db.snippet.update({
        where:{id},
        data:{code}
    })

    redirect(`/snippets/${id}`)
}

export async function deleteSnippet( id: number){
    await db.snippet.delete({
        where:{id}
    })

    redirect(`/`)
}