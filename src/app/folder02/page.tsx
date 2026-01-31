////zare_nk_041108_okk
"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

function getCookie(name: any) {
  const value = `; ${document.cookie}`; 
  const parts = value.split(`; ${name}=`); 
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null; 
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
          if (response.ok) {  //zare_nk_041020_tahlilshe(estefadeye response.status==200 bejaye response.ok)
            var idUser = data.decoded.IdUser;  //zare_nk_041108_nokteh(update beshe be reactnative)
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
        } catch (error) { //mamoolan mavarede ghtiye shabakeh va net va adame dastrasi be api be catch miad(vali mavarede eshtebah vared kardane name api va paramethaye naghes dadan be api va ... barnameh dar try 
        // mimooneh va automat statuse 4xx ya 5xx tolid mikoneh)
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
  // const params = useParams();  //zare_nk_040224_comment(chon makhsoose safahate dynamic hast va inja kar nemikoneh)
  const params = useSearchParams();  
  const id = params.get("id") || "Unknown"; 
  const name = params.get("name") || "Unknown";  
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
