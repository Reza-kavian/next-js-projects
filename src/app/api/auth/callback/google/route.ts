//src\app\api\auth\callback\google  //zare_nk_041013_okk
import { NextRequest, NextResponse } from "next/server";;  //zare_nk_041013_nokteh(cookies marboot be NextResponse(mesle res.cookies.set("token", "123");) ham khandani va ham neveshtani hastan )
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";  //zare_nk_041013_nokteh(cookies import shodeh az next/headers faghat khandani hast, va marboot ne cooki haei ke az samte karbar ba request mian)

////zare_nk_041003_added_st
function decodeState(stateStr: string) {
  return JSON.parse(
    Buffer.from(stateStr, "base64").toString("utf-8")
  ) as { state: string; source: "web" | "mobile" };
}

function NextResponseRedirect(location: string) {
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
    ////zare_nk_041013_nokteh_st(Params haye tooye url)
    const { searchParams } = new URL(req.url); 
    const code = searchParams.get("code");
    const error = searchParams.get("error"); 
    const returnedState = searchParams.get("state");
    ////zare_nk_041013_nokteh_end(Params haye tooye url)
    ////zare_nk_041013_nokteh_st(cooki haye zakhireh shodeh)
    const cookieStore = await cookies();
    const cookieStateStr = cookieStore.get("oauth_state")?.value;
    ////zare_nk_041013_nokteh_end(cooki haye zakhireh shodeh)
    // state must exist
    if (!cookieStateStr || !returnedState) {
      // return NextResponseRedirect("/login");
      const res = NextResponseRedirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }
    // validate state
    if (returnedState !== cookieStateStr) {
      cookieStore.delete("oauth_state");
      // return NextResponseRedirect("/login");
      const res = NextResponseRedirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }

    const { source } = decodeState(cookieStateStr);
    console.log("zare_nk_041010-source: " + source);
    // one-time usage
    cookieStore.delete("oauth_state");

    /* ---------------- Cancel or Error ---------------- */
    if (!code || error) {
      if (source === "mobile") {
        const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
        url.searchParams.set("error", error ?? "google_login_failed");
        url.searchParams.set("verified", "1");
        // return NextResponseRedirect(url.toString());
        const res = NextResponseRedirect(url.toString());
        res.cookies.delete("token");
        res.cookies.set("google_Invalid_credentials", "yes", {
          httpOnly: false,
        });
        return res;
      }
      // return NextResponseRedirect("/login");
      const res = NextResponseRedirect("/login");
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
      ////zare_nk_041011_added_st
      if (source === "mobile") {
        const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
        url.searchParams.set("error", error ?? "google_login_failed");
        url.searchParams.set("verified", "1");
        // return NextResponseRedirect(url.toString());
        const res = NextResponseRedirect(url.toString());
        res.cookies.delete("token");
        res.cookies.set("google_Invalid_credentials", "yes", {
          httpOnly: false,
        });
        return res;
      }
      ////zare_nk_041011_added_end
      // return NextResponseRedirect("/login");
      const res = NextResponseRedirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    } 
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
    // const res = NextResponseRedirect("/redirecting");
    const res = NextResponseRedirect(redirectPath);

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
    // return NextResponse.NextResponseRedirect("/login");  //zare_nk_041001_commented
    return NextResponseRedirect("/login");  //zare_nk_041001_added
  }
}