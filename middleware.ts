import { MiddlewareFactory } from "@/middlewares";
import { AuthMiddleware } from "./middlewares/auth";

const middlewares = [AuthMiddleware];

export default MiddlewareFactory(middlewares);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
