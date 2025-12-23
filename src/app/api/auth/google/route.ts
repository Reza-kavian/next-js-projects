// src\app\api\auth\google
import { NextResponse } from "next/server";
import { google } from "googleapis"; 
// import { saveOAuthState } from "@/lib/oauthState"; //zare_nk_041002_added
import { cookies } from "next/headers"; //zare_nk_041002_added

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(req: Request) {  
////zare_nk_041002_added_st 
// const source =
//   req.headers.get("x-client") === "mobile-app"
//     ? "mobile"
//     : "web";
 
// ✅ خواندن کوکی‌ها (تشخیص موبایل یا وب)
  const cookieStore = await cookies(); 
  const source =
    cookieStore.get("oauth_source")?.value === "mobile"
      ? "mobile"
      : "web"; 
  // 🔐 یک‌بار مصرف
  cookieStore.delete("oauth_source");


 
   const oauthState = crypto.randomUUID();  
  //   await saveOAuthState(oauthState, {
  //   source,
  //   createdAt: Date.now(),
  // });
  const oauthStateObj = { state: oauthState, source:source };
  const oauthStateStr = Buffer.from(JSON.stringify(oauthStateObj)).toString("base64");
 ////zare_nk_041002_added_end
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["profile", "email"],
    // state: source,     //zare_nk_041002_commented
    state: oauthStateStr,  //zare_nk_041002_added
  });

  console.log("040603-authUrl:", authUrl);   //zare_nk_040519_nokteh-in bakhsh be dorosti dar https://testotm.sarinmehr.com/api/auth/callback/google sakhte mishe
  //authUrl: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=profile%20email&response_type=code&client_id=733109327570-t2qo3siffjpe5f23kud6inul4n2k4p00.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ftestotm.sarinmehr.com%2Fapi%2Fauth%2Fcallback%2Fgoogle

  // return NextResponse.redirect(authUrl);      //zare_nk_041002_commented
   const res = NextResponse.redirect(authUrl);

  res.cookies.set("oauth_state", oauthStateStr, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 5 * 60, // ۵ دقیقه
      path: "/",
  });

  return res;
}
