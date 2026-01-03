////zare_nk_041013_okk
"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

////zare_nk_040409(ok from typeScript)
function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // return parts.pop().split(";").shift();  //zare_nk_040409_commented
    return parts.pop()?.split(";").shift() ?? null; //zare_nk_040409_added
  }
  return null; // اگر کوکی پیدا نشد
}

export default function ProductPage() {
  const idUSerRef = useRef<HTMLHeadingElement | null>(null); 
  const router = useRouter();
  useEffect(() => {
    const asyncFunctionInUseEffect = async () => {
      const token = getCookie("token");
      console.log('040530-033-token: '+token);
      if (token != null) {
        try {
          const response = await fetch("/api/auth/verifyToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),  
          });
          const data = await response.json();
          if (response.ok) {
            var idUser = data.decoded.IdUser;
            var email = data.decoded.email;
            if (idUSerRef.current) {
              document.getElementById("idUSer")!.innerText =
                idUser != null ? idUser : email;
            }
          } else {
            const idUSerRefTag = idUSerRef.current;
            if (idUSerRefTag instanceof HTMLElement) {
              idUSerRefTag.innerText = "ffffffferer----" + data.errorMessage; //zare_nk_040224-nokteh(age az useState estefadeh mikardim reactpasandtar bood)
            }
          }
        } catch (error) {
          console.error("❌ خطااااااااااااااااااای JWT:", error);
          if (error instanceof Error) {
            idUSerRef.current!.innerText = error.message;
          } else {
            idUSerRef.current!.innerText = String(error);
          }
        }
      } else {
        if (idUSerRef.current) {
          idUSerRef.current.innerText = "offlinim";
        }
      }
    };
    asyncFunctionInUseEffect();  
  });
  // const params = useParams(); // دریافت پارامترهای مسیر  //zare_nk_040224_comment(chon makhsoose safahate dynamic hast va inja kar nemikoneh)
  const params = useSearchParams(); // دریافت پارامترهای مسیر
  const id = params.get("id") || "Unknown"; // دریافت مقدار id
  const name = params.get("name") || "Unknown"; // دریافت مقدار id
  const handleClick = () => {
    router.push("/folder03?tab=comments2");
  };
  const loginClick = () => {
    router.push("/login");
  };
  return (
    <div>
      <h1></h1>
      <h1 id="idUSer" ref={idUSerRef}>
        this is:: /folder02
      </h1>
      <h1>Product {id}</h1>
      <p>This is the product page for name: {name}</p>
      <button onClick={handleClick}>go to folder03 </button>
      <button onClick={loginClick}>go to login </button>
    </div>
  );
}
