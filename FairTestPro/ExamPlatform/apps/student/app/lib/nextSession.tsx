import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@repo/db/client";

const prisma = new PrismaClient();

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email:{label:"Email Id", type:"text",placeholder:"jonDoe@gmail.com"},
                password:{label:"password", type:"password"}
            },
            async authorize(credentials:any){

                const existingUser = await prisma.student.findFirst({
                    where:{
                        email:credentials.email
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);

                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.email
                        }
                    }
                    return null;
                }
                return null;
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({session, token}){
            if(session.user){
                session.user.name = token.name;
                session.user.email = token.email
            }

            return session;

        }
    },
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/route/signin",
    }
}