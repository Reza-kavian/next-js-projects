//src\app\api\auth\callback\google
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    ////zare_nk_040522_rahe1_st
    // const url = new URL(req.url);
    // const code = url.searchParams.get("code");
    ////zare_nk_040522_rahe1_end
    ////zare_nk_040522_rahe2_st
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state") || "web"; // web یا mobile  
    ////zare_nk_040522_rahe2_end
    if (!code) {
      //const error = searchParams.get("error");
      // return NextResponse.json({ error: "No code provided: "+error }, { status: 400 }); //comment kardim ta az raveshe new NextResponse estefadeh konim ke addresse /login ra dar headere new NextResponse gharar bedim na inke az dastoore redirect estefadeh konim ke cookie ha ra pak mikoneh)
      let Location = "/login"; // پیشفرض وب
      if (state === "mobile") {
        Location = `myapp://auth/callback`;
      }
      const nResponse = new NextResponse(null, {
        status: 302, // تنظیم وضعیت HTTP
        headers: {
          Location: Location, 
        },
      });
      nResponse.cookies.delete("token"); 
      nResponse.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return nResponse;
    }
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // headers: { 'Content-Type': 'application/json' },  //zare_nk_031226_nokteh(noe application/json baraye parametrhaye voroodiye api ham javab dad,vali osooli noe application/x-www-form-urlencoded ast)
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri:
          process.env.GOOGLE_REDIRECT_URI ||
          "http://localhost:3000/api/auth/callback/google",
        grant_type: "authorization_code",
      }), 
    });
    const resultFromGoogleapis = await response.json();
    if (resultFromGoogleapis.id_token == undefined) { 
      let Location = "/login"; // پیشفرض وب
      if (state === "mobile") {
        Location = `myapp://auth/callback`;
      } 
      const nResponse = new NextResponse(null, {
        status: 302, // تنظیم وضعیت HTTP
        headers: { 
          Location: Location,  
        },
      }); 
      nResponse.cookies.delete("token");  
      nResponse.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return nResponse;
    }
    const decoded = jwt.decode(
      resultFromGoogleapis.id_token
    ) as JwtPayload | null;
    const secretKey = Buffer.from(
      process.env.JWT_SECRET_BASE64!,
      "base64"
    ).toString("utf-8");
    const token = jwt.sign(
      {
        IdUser: null,
        email: decoded?.email ?? null,
        user_name: null,
        name: decoded?.name ?? null,
      },
      // process.env.JWT_SECRET,   //zare_nk_040224_commented
      secretKey, //zare_nk_040224_added
      // { expiresIn: "60s" }
      { expiresIn: "3h" }
    );
    //zare_nk_031220_rahe1_st(karbord nadare inja,chon dastoore redirect cookie haye nResponse ra hazf mikone va dar middleware.ts dige be cookie dastrasi nadarim)
    // const nResponse = NextResponse.json({ message: "Login successful", token });
    // nResponse.cookies.set("token", token, { httpOnly: true });
    // return NextResponse.redirect(new URL("/folder02?id=543&name=reza", req.url));
    //zare_nk_031220_rahe1_end(karbord nadare inja,chon dastoore redirect cookie haye nResponse ra hazf mikone va dar middleware.ts dige be cookie dastrasi nadarim)

    //zare_nk_031220_rahe2_st(karbord dare inja,chon hedayat be /folder02 ra bedoone dastoore redirect va dar headers tanzim kardim)
    let redirectUrl = "/redirecting"; // پیشفرض وب
    if (state === "mobile") {
      redirectUrl = `myapp://auth/callback?token=${token}`; // redirect به اپ موبایل
    }
    const nResponse = new NextResponse(null, {
      status: 302, // تنظیم وضعیت HTTP
      headers: {
        Location: redirectUrl,
      },
    });
    // تنظیم کوکی برای کاربر
    nResponse.cookies.set("token", token, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 3, // ۳ ساعت
      ////  sameSite: 'strict',
      sameSite: "none",
      secure: true, //(secure: true bashe cookie faghat be darkhasthaye https ersal mishe,age secure:false bashe cookie be darkhasthaye http ham ersal mishe )
      //zare_nk_040208_nokteh(vaghti az sameSite: 'none' estefadeh mikonim htman bayad secure: true bashe vagarnah shayad moroorgarha cookie ro napaziran va cookie kar nakoneh)
    });
    nResponse.cookies.delete("google_Invalid_credentials");
    //zare_nk_031220_rahe2_end(karbord dare inja,chon hedayat be /folder02 ra bedoone dastoore redirect va dar headers tanzim kardim)
    return nResponse;
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect("/login");
  }
}
