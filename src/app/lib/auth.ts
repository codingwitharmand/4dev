import {PrismaAdapter} from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import {db} from "@/app/lib/db";

export const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
        jwt: true,
    },
    pages: {
        signIn: '/'
    },
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: parseInt(process.env.EMAIL_SERVER_PORT as string, 10),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            maxAge: 6 * 60 * 60,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
    ]
};