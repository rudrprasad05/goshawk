import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function getSession(){
    return await getServerSession(options)
}