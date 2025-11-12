// src\app\api\auth\google
import { NextResponse } from "next/server";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI  
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source") || "web"; // web یا mobile

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["profile", "email"],
    state: source, 
  });
  console.log("040603-authUrl:", authUrl); //  //zare_nk_040519_nokteh-in bakhsh be dorosti dar https://testotm.sarinmehr.com/api/auth/callback/google sakhte mishe
  //authUrl: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=profile%20email&response_type=code&client_id=733109327570-t2qo3siffjpe5f23kud6inul4n2k4p00.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ftestotm.sarinmehr.com%2Fapi%2Fauth%2Fcallback%2Fgoogle
  return NextResponse.redirect(authUrl);
}
