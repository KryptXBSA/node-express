import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = getProviders();
  // const isDefaultSigninPage =
  //   req.method === "GET" && req.query.nextauth?.includes("signin");
  // if (isDefaultSigninPage) providers.pop();

  console.log("Handling callback request from my Identity Provider", req.body);
  console.log("mainbody",req.body);
  return await NextAuth(req, res, {
    providers,
    callbacks: {
      async session({ session, token }) {
        console.log("session callback??", session,"token", token);
        // Return a cookie value as part of the session
        // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
        // session.someCookie = someCookie;
        return {...session,lol:"aa"};
      },
      async signIn(props) {
        console.log("sign in from", props.credentials, props.account);
        return false;
      },
    },
  });
}
function getProviders() {
  return [
    GithubProvider({
      clientId: "0274638794510408311c",
      clientSecret: "465da137e7654809bf654622a65f06ab4e44023e",
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any, req) => {
        console.log("body", req.body);
        console.log("header", req.headers);
        return { user: "aland" };
        const user = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: Object.entries(credentials)
              .map((e) => e.join("="))
              .join("&"),
          }
        )
          .then((res) => res.json())
          .catch((err) => {
            return null;
          });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ];
}
