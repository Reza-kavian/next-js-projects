"use client";
// import { Head } from "next/document";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

////zare_nk_040410(ok from typeScript)

const jwt = require("jsonwebtoken");

export default function ShallowRoutingExample() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  function getCookie(name: any) {
    alert(document.cookie);
    const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
    const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
    if (parts.length === 2) {
      // return parts.pop().split(";").shift(); //zare_nk_040410_commented
      return parts.pop()?.split(";").shift() ?? null; //zare_nk_040410_added
    }
    return null; //اگر کوکی پیدا نشد
  }

  async function handleLogin() {
    const token = getCookie("token");
    if (token != null) {
      try {
        alert("token: " + token);
        alert("process.env.JWT_SECRET: " + process.env.JWT_SECRET);

        //zare_nk_040109_added_st
        const response = await fetch("/api/auth/verifyToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }), // ارسال توکن به سرور
        });

        const data = await response.json();
        if (response.ok) {
          alert("decodedToken: " + JSON.stringify(data.decoded));
          var idUser = data.decoded.IdUser;
          alert("idUser: " + idUser);
          document.getElementById("idUSer")!.innerText =
            idUser + "-yooohhhoooo";
        } else {
          document.getElementById("idUSer")!.innerText =
            "fffffff----" + data.errorMessage;
        }
        //zare_nk_040109_added_end

        //zare_nk_040109_commented_st
        //let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // alert("decodedToken: " + decodedToken);
        // var idUser = decodedToken.IdUser;
        // alert("idUser: " + idUser);
        // document.getElementById("idUSer").innerText = idUser.toString()
        // ? idUser + "-yooohhhoooo"
        // : "onlinim vali idUser yaft nashod";
        //zare_nk_040109_commented_end
      } catch (error) {
        // document.getElementById("idUSer").innerText = "dd-" + error.message; //zare_nk_040410_commented
        ////zare_nk_040410_added_st
        const el = document.getElementById("idUSer");
        if (el instanceof HTMLElement) {
          const msg = error instanceof Error ? error.message : "خطای ناشناخته";
          el.innerText = "dd-" + msg;
        }
        ////zare_nk_040410_added_end
      }
    } else {
      // document.getElementById("idUSer").innerText = "offlinim"; //zare_nk_040410_commented
      ////zare_nk_040410_added_st
      const el = document.getElementById("idUSer");
      if (el instanceof HTMLElement) {
        el.innerText = "offlinim";
      }
      ////zare_nk_040410_added_end
    }
  }

  return (
    <>
      <title>homim-555!!</title>
      <h1 id="idUSer">ja useri</h1>
      <button
        onClick={() => {
          router.push("/folder02?id=543&name=reza");
        }}
      >
        1.go to folder02
      </button>
      <button
        onClick={() => {
          router.replace("/folder22");
        }}
      >
        go to folder22
      </button>
      <button
        onClick={() => {
          const stssep = step + 3;
          setStep(stssep);
          router.replace(`/folder03?step=${stssep}&name=reza`);
        }}
      >
        go to folder03
      </button>
      <button
        onClick={() => {
          router.replace("/folder2");
        }}
      >
        go to folder2
      </button>
      <br />
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        handleLogin
      </button>
    </>
  );
}
