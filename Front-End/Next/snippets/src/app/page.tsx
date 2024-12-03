import Image from "next/image";
import { db } from "@/db";
import Link from "next/link";

export default async function Home() {

  const snippets = await db.snippet.findMany()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between ite m-2">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="p-2 border rounded-md">New</Link>
      </div>
      {
        snippets.map((snippet)=>{
          return(
            <Link 
              href={`/snippets/${snippet.id}`}
              className="flex justify-between items-center p-2 border rounded-md"
              key={snippet.id}>
              <div>{snippet.title}</div>
              <div>View</div>
            </Link>
          )
        })
      }
    </div>
  );
}
