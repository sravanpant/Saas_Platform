import ChatWrapper from "@/components/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  // interface is the type to pass data through objects
  params: {
    fileid: string;
  };
}

/* 
here instead of interface we could also write the below code as: 
const Page = async ({params} : {fileid: string})
*/

const Page = async ({ params }: PageProps) => {
  // retrieve the file id
  const { fileid } = params; // we put curly braces `{}` outside a variable to point the data inside the constant variable

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);
  // redirect is a nextjs keyword to redirect routes

  // make database call
  // findFirst function is a function call in the database of prisma
  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      {/* `flex-1` allows a flex item to grow and shrink as needed, ignoring its initial size
          `calc(100vh-3.5rem)` allows us to subtract the width of the navbar from the 100% height of the webpage 
      */}

      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* left side -> pdf viewer */}

        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer />
          </div>
        </div>

        {/* right side -> chat window */}

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
};

export default Page;
