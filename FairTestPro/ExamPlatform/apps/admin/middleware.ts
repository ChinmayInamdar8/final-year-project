import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth(
  function middleware(req){
    return NextResponse.next();
  },
  {
    pages:{
      signIn:"route/signin"
    }
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|route/signup|route/signin|examGiving.png|create-exam.png|view-exam.png|AI-proctoring.png|logo.svg|$).*)"
  ]
};


