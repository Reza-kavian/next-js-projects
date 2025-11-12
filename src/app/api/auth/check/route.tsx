import {NextRequest, NextResponse } from "next/server";

// export async function GET(request: Request) {   //zare_nk_040403_commented
export async function GET(request: NextRequest) {  //zare_nk_040403_added
  const token = request.cookies.get("token")?.value;
  if (!token) {
    const response = NextResponse.json(
      { errorMessage: "Invalid credentials" },
      { status: 401 }
    );
    // response.headers.set("Set-Cookie", `token=; Path=/; HttpOnly; SameSite=None; Secure=${process.env.NODE_ENV === "production"}; sMax-Age=0;`);
    // response.cookies.delete("token", { path: "/" });  //zare_nk_040404_commented
    response.cookies.delete("token");  //zare_nk_040404_added
    // response.cookies.delete("google_Invalid_credentials", { path: "/" }); //zare_nk_040404_commented
     response.cookies.delete("google_Invalid_credentials");//zare_nk_040404_added
    return response;
  }
  const response = NextResponse.json(
    { message: "Login successfullll", token: token },
    { status: 200 }
  );
  // response.cookies.delete("google_Invalid_credentials", { path: "/" });//zare_nk_040404_commented
  response.cookies.delete("google_Invalid_credentials");//zare_nk_040404_added
  return response;
}
