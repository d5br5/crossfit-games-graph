import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/src/utils/supabase/middleware";
import { checkIsRegistered } from "./lib/auth";

const registerPath = "/user/register";

export async function middleware(request: NextRequest) {
  // 미등록 회원인 경우 등록 페이지로 redirect
  const isRegistered = await checkIsRegistered();
  if (!isRegistered && request.nextUrl.pathname !== registerPath) {
    const url = new URL(registerPath, request.nextUrl);
    return NextResponse.redirect(url);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
