import Image from "next/image";
import { db } from "@/db";

export default async function Home() {

  const snippets = await db.snippet.findMany()

  return (
    <div>
      {
        snippets.map((snippet)=>{
          return(
            <div>
              {snippet.title}
            </div>
          )
        })
      }
    </div>
  );
}
