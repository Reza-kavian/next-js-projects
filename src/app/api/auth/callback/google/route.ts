//src\app\api\auth\callback\google
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

////zare_nk_041003_added_st
function decodeState(stateStr: string) {
  return JSON.parse(
    Buffer.from(stateStr, "base64").toString("utf-8")
  ) as { state: string; source: "web" | "mobile" };
}

function redirect(location: string) {
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      Pragma: "no-cache",
    },
  });
}
////zare_nk_041003_added_end

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    ////zare_nk_041003_added_st
    const error = searchParams.get("error");
    const returnedState = searchParams.get("state");
    const cookieStore = await cookies();
    const cookieStateStr = cookieStore.get("oauth_state")?.value;
    // state must exist
    if (!cookieStateStr || !returnedState) {
      // return redirect("/login");
      const res = redirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }
    // validate state
    if (returnedState !== cookieStateStr) {
      cookieStore.delete("oauth_state");
      // return redirect("/login");
      const res = redirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }

    const { source } = decodeState(cookieStateStr);
    // one-time usage
    cookieStore.delete("oauth_state");

    /* ---------------- Cancel or Error ---------------- */
    if (!code || error) {
      if (source === "mobile") {
        const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
        url.searchParams.set("error", error ?? "google_login_failed");
        url.searchParams.set("verified", "1");
        // return redirect(url.toString());
        const res = redirect(url.toString());
        res.cookies.delete("token");
        res.cookies.set("google_Invalid_credentials", "yes", {
          httpOnly: false,
        });
        return res;
      }
      // return redirect("/login");
      const res = redirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }

    /* ---------------- Exchange Code ---------------- */
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.id_token) {
      // return redirect("/login");
      const res = redirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }

    ////zare_nk_041003_added_end 
    ////zare_nk_041003_commented_st
    // if (!code) {  
    // return NextResponse.json({ error: "No code provided: "+error }, { status: 400 }); //comment kardim ta az raveshe new NextResponse estefadeh konim ke addresse /login ra dar headere new NextResponse gharar bedim na inke az dastoore redirect estefadeh konim ke cookie ha ra pak mikoneh)
    // let Location = "/login"; // پیشفرض وب    

    // if (state === "mobile") {    
    // const cookieStore = await cookies(); 
    // const oauthStateStr = cookieStore.get("oauth_state")?.value;
    // if (!oauthStateStr) {
    //   console.log("oauth_state موجود نیست!");
    //   // می‌تونی کاربر رو ری‌دایرکت کنی یا ارور بدهی
    //   return NextResponse.redirect("/login");
    // }

    // const oauthStateObj = JSON.parse(Buffer.from(oauthStateStr, "base64").toString("utf-8"));
    // console.log(oauthStateObj.source); // "mobile" یا "web"
    // cookieStore.delete("oauth_state");

    // if (oauthStateObj.source === "mobile") {
    //   ////zare_nk_041002_added_end

    //   ////zare_nk_041002_added_st
    //   const returnedState = searchParams.get("state");
    //   // const cookieState = req.cookies.get("oauth_state")?.value;  //ehtemalan gheire zarooriye chon ghablan ba cookies() oono khoondim!(tahlilshe)

    //   // if (!returnedState || returnedState !== cookieState) {
    //   //   return NextResponse.redirect("/login");
    //   // }
    //   ////zare_nk_041003_commented_st
    //   // if (!returnedState) {
    //   //   return NextResponse.redirect("/login");
    //   // }       
    //   // const returnedStateObj = JSON.parse(
    //   //   Buffer.from(returnedState, "base64").toString("utf-8")
    //   // );

    //   // const cookieStore = await cookies(); // ← توجه: باید await باشه
    //   // const cookieStateStr = cookieStore.get("oauth_state")?.value;
    //   // if (!cookieStateStr) {
    //   //   return NextResponse.redirect("/login");
    //   // }

    //   // if (returnedState !== cookieStateStr) {
    //   //   return NextResponse.redirect("/login");
    //   // }
    //   ////zare_nk_041003_commented_end

    //   ////zare_nk_041002_added_end

    //   //// Location = `myapp://auth/callback`;  //zare_nk_040929_commented
    //   // Location = `https://testotm.sarinmehr.com/redirect-mobile?error=google_login_failed`;  //zare_nk_040929_added(and zare_nk_040930_commented)
    //   ////zare_nk_040930__added_st
    //   // Location = `https://testotm.sarinmehr.com/redirect-mobile?error=${encodeURIComponent(
    //   //   error || "google_login_failed"
    //   // )}`;

    //   const redirectUrl = new URL("https://testotm.sarinmehr.com/redirect-mobile");
    //   // const redirectUrl = new URL("https://localhost:3000/redirect-mobile");
    //   redirectUrl.searchParams.set("error", "google_login_failed");
    //   redirectUrl.searchParams.set("verified", "1");   //zare_nk_041002_added

    //   // redirectUrl.searchParams.set("from", "google"); //zare_nk_041001_added(and zare_nk_041002_commented)
    //   Location = redirectUrl.toString(); // <<< همین رو تغییر بده
    //   ////zare_nk_040930__added_end
    //   //// /api/auth/callback/google?error=access_denied&state=mobile  //zare_nk_040930_nokteh(dar halate laghv ke code nadarim google be in masir hedayat mikoneh)
    //   //// https://testotm.sarinmehr.com/redirect-mobile?error=access_denied  //zare_nk_040930_nokteh(dar callback/google ham be in masir miferestim)
    // }
    ////zare_nk_040930_added_st_alaki
    // else{ 
    //   const redirectUrl = new URL("https://localhost:3000/redirect-mobile");
    //   redirectUrl.searchParams.set("verified", "1");
    //    Location = redirectUrl.toString();
    // }
    ////zare_nk_040930_added_end_alaki

    // const nResponse = new NextResponse(null, {
    //   status: 302, // تنظیم وضعیت HTTP
    //   headers: {
    //     Location: Location,
    //     ////zare_nk_040930_added_st 
    //     "Cache-Control": "no-store",  //zare_nk_040930_nokteh(jahate jologiri az cash kardane parametrhaye ghabli tavassote moroorgar, va ferestadane anha be jaye parametrhaye feli)
    //     Pragma: "no-cache",   //zare_nk_040930_nokteh(kare Cache-Control ra mikoneh vali baraye moroorgarhaye ghadimitare)
    //     ////zare_nk_040930_added_end 
    //   },
    // });
    ////
    //   nResponse.cookies.delete("token");
    //   nResponse.cookies.set("google_Invalid_credentials", "yes", {
    //     httpOnly: false,
    //   });
    //   return nResponse;
    // }


    // const tokenUrl = "https://oauth2.googleapis.com/token";
    // const response = await fetch(tokenUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   // headers: { 'Content-Type': 'application/json' },  //zare_nk_031226_nokteh(noe application/json baraye parametrhaye voroodiye api ham javab dad,vali osooli noe application/x-www-form-urlencoded ast)
    //   body: new URLSearchParams({
    //     code,
    //     client_id: process.env.GOOGLE_CLIENT_ID || "",
    //     client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    //     redirect_uri:
    //       process.env.GOOGLE_REDIRECT_URI ||
    //       "http://localhost:3000/api/auth/callback/google",
    //     grant_type: "authorization_code",
    //   }),
    // });
    // const resultFromGoogleapis = await response.json();
    // if (resultFromGoogleapis.id_token == undefined) {
    //   let Location = "/login"; // پیشفرض وب
    //   // if (state === "mobile") { //zare_nk_041002_commented
    //   ////zare_nk_041002_added_st

    //   const cookieStore = await cookies(); // ← توجه: باید await باشه
    //   const oauthStateStr = cookieStore.get("oauth_state")?.value;

    //   if (!oauthStateStr) {
    //     console.log("oauth_state موجود نیست!");
    //     // می‌تونی کاربر رو ری‌دایرکت کنی یا ارور بدهی
    //     return NextResponse.redirect("/login");
    //   }

    //   const oauthStateObj = JSON.parse(Buffer.from(oauthStateStr, "base64").toString("utf-8"));

    //   console.log(oauthStateObj.source); // "mobile" یا "web"
    //   cookieStore.delete("oauth_state");
    //   if (oauthStateObj.source === "mobile") {
    //     ////zare_nk_041002_added_end
    //     // Location = `myapp://auth/callback`;  //zare_nk_040929_commented
    //     Location = `https://testotm.sarinmehr.com/redirect-mobile?error=google_login_failed`;  //zare_nk_040929_added
    //   }
    //   const nResponse = new NextResponse(null, {
    //     status: 302, // تنظیم وضعیت HTTP
    //     headers: {
    //       Location: Location,
    //     },
    //   });
    //   nResponse.cookies.delete("token");
    //   nResponse.cookies.set("google_Invalid_credentials", "yes", {
    //     httpOnly: false,
    //   });
    //   return nResponse;
    // }

    //  const decoded = jwt.decode(
    //   resultFromGoogleapis.id_token
    // ) as JwtPayload | null;
    //  const secretKey = Buffer.from(
    //   process.env.JWT_SECRET_BASE64!,
    //   "base64"
    // ).toString("utf-8");
    ////zare_nk_041003_commented_end

    /* ---------------- Create JWT ---------------- */
    const decoded = jwt.decode(tokenData.id_token) as JwtPayload;
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
      secretKey,
      { expiresIn: "3h" }
    );

    //  let redirectUrl = "/redirecting";  
    //   const cookieStore = await cookies(); 
    //   const oauthStateStr = cookieStore.get("oauth_state")?.value; 
    //   if (!oauthStateStr) {
    //     console.log("oauth_state موجود نیست!");
    //     // می‌تونی کاربر رو ری‌دایرکت کنی یا ارور بدهی
    //     return NextResponse.redirect("/login");
    //   }

    // const oauthStateObj = JSON.parse(Buffer.from(oauthStateStr, "base64").toString("utf-8"));
    // console.log(oauthStateObj.source); // "mobile" یا "web"
    // cookieStore.delete("oauth_state");
    // if (oauthStateObj.source === "mobile") {
    //   ////zare_nk_041002_added_end
    //   // redirectUrl = `myapp://auth/callback?token=${token}`; // redirect به اپ موبایل   //zare_nk_040929_commented
    //   redirectUrl = `https://testotm.sarinmehr.com/redirect-mobile?token=${token}`;  //zare_nk_040929_added
    // }
    // const nResponse = new NextResponse(null, {
    //   status: 302, // تنظیم وضعیت HTTP
    //   headers: {
    //     Location: redirectUrl,
    //   },
    // });
    //// تنظیم کوکی برای کاربر
    // nResponse.cookies.set("token", token, {
    //   httpOnly: false,
    //   path: "/",
    //   maxAge: 60 * 60 * 3, // ۳ ساعت
    //   ////  sameSite: 'strict',
    //   sameSite: "none",
    //   secure: true, //(secure: true bashe cookie faghat be darkhasthaye https ersal mishe,age secure:false bashe cookie be darkhasthaye http ham ersal mishe )
    //   //zare_nk_040208_nokteh(vaghti az sameSite: 'none' estefadeh mikonim htman bayad secure: true bashe vagarnah shayad moroorgarha cookie ro napaziran va cookie kar nakoneh)
    // });
    //   nResponse.cookies.delete("google_Invalid_credentials");
    // //zare_nk_031220_rahe2_end(karbord dare inja,chon hedayat be /folder02 ra bedoone dastoore redirect va dar headers tanzim kardim)
    // return nResponse;
    /* ---------------- Redirect ---------------- */
    let redirectPath = ''; //zare_nk_041003_added_manBishtarAzChatgpt
    if (source === "mobile") {
      const url = new URL("https://testotm.sarinmehr.com/redirect-mobile"); 
      url.searchParams.set("token", token);
      url.searchParams.set("verified", "1");
      // return redirect(url.toString());
      redirectPath = url.toString() //zare_nk_041003_added_manBishtarAzChatgpt
    }
    else {
      redirectPath = "/redirecting";  //zare_nk_041003_added_manBishtarAzChatgpt
    }
    // const res = redirect("/redirecting");
    const res =redirect(redirectPath);

    // تنظیم کوکی برای کاربر
    res.cookies.set("token", token, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 3, // ۳ ساعت
      ////  sameSite: 'strict',
      sameSite: "none",
      secure: true, //(secure: true bashe cookie faghat be darkhasthaye https ersal mishe,age secure:false bashe cookie be darkhasthaye http ham ersal mishe )
      //zare_nk_040208_nokteh(vaghti az sameSite: 'none' estefadeh mikonim htman bayad secure: true bashe vagarnah shayad moroorgarha cookie ro napaziran va cookie kar nakoneh)
    });
    res.cookies.delete("google_Invalid_credentials");  //zare_nk_041003_added_manBishtarAzChatgpt
    return res;
  } catch (error) {
    console.error("040930-a-04-Callback error:", error);
    // return NextResponse.redirect("/login");  //zare_nk_041001_commented
    return redirect("/login");  //zare_nk_041001_added
  }
}