//src\app\api\auth\verifyToken\  //zare_nk_040219-morattabshode
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: "توکن ارسال نشده است" }, { status: 400 });
  }
  const secretKey = Buffer.from(
    process.env.JWT_SECRET_BASE64!,
    "base64"
  ).toString("utf-8"); //zare_nk_040219_added(baraye adame moshkel dar verify kardane secretKey vaghti az lafze $ estefadeh shod dar mohtavaye secretKey)
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET as string);//zare_nk_040219_commented
    const decoded = jwt.verify(token, secretKey); //zare_nk_040219_added(chon estefadeye mostaghime secretKey dar verify kardan moshkel ijad kard vaghti az lafze $ estefadeh shod dar mohtavaye secretKey)
    //zare_nk_040403-POST called!!-decoded: {"unique_name":"20109","CodeMoshtari":"20109",
    // "Mobile":"9351091287","NameMoshtari":"","nbf":1750740741,"exp":1751345541,"iat":1750740741}
    return NextResponse.json({ decoded }, { status: 200 });
  } catch (error: any) {
    let tokenErroeMessage = "";
    if (error.name == "TokenExpiredError") {
      tokenErroeMessage = "token monghazi shodeh ast";
    } else {
      tokenErroeMessage = "token namotabar ast";
    }
    return NextResponse.json(
      { errorMessage: tokenErroeMessage },
      { status: 401 }
    );
  }
}
