import NextAuth from "next-auth";
import { authOptions } from "../../../lib/nextSession";


const handler = NextAuth(authOptions);

export{handler as GET, handler as POST}