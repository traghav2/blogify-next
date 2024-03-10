import { User } from "./lib/models";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const email = user.email;
                const foundUser = await User.findOne({email});

                if(foundUser){
                    token.name = foundUser.username;
                    token.email = foundUser.email;
                    token.isAdmin = foundUser.isAdmin;
                    token.image = user?.image;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.name = token.name;
                session.user.isAdmin = token.isAdmin;
                session.user.image = token.image;
            }
            return session;
        },
        authorized({ auth, request }) {
            const user = auth?.user;
            const isOnAdminPage = request.nextUrl?.pathname.startsWith("/admin");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
            const isOnRegisterPage = request.nextUrl?.pathname.startsWith("/register");
            const isOnDashBoardPage = request.nextUrl?.pathname.startsWith("/dashboard");

            //DASHBOARD PAGE CHECK

            if(isOnDashBoardPage && !user){
                return false;
            }

            //ADMIN REACHING ADMIN DASHBOARD

            if(isOnAdminPage && !user?.isAdmin){
                return false;
            }

            //UNAUTHENTICATED USER CAN REACH LOGIN PAGE

            if(isOnLoginPage && user){
                return Response.redirect(new URL("/", request.nextUrl));
            }

            if(isOnRegisterPage && user){
                return Response.redirect(new URL("/", request.nextUrl));
            }

            return true;
        }
    }
}