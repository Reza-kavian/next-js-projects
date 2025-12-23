//\src\app\redirect-mobile\page.tsx
"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";   //zare_nk_041001
////zare_nk_041001_added_st
// import { useSearchParams, useRouter } from "next/navigation";

// export default function MobileRedirectPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
////zare_nk_041001_added_end

export default function MobileRedirectPage({ searchParams }: any) {  //zare_nk_041001_commented
  ////zare_nk_041002_commented_st
  // 🚫 اگه از گوگل نیومده → برگرد به لاگین
  // if (searchParams?.from !== "google") {
  //   redirect("/login");
  // }
  ////zare_nk_041002_commented_end
  ////zare_nk_041002_added_st
  if (searchParams?.verified !== "1") {
    alert('rooo!!!');
    redirect("/login");
  }
  // if (verified !== "1") {
  //   router.replace("/login");
  //   return;
  // }
  ////zare_nk_041002_added_end
  const deepLink =
    searchParams?.token
      ? `myapp://login?token=${encodeURIComponent(searchParams.token)}`
      : searchParams?.error
        ? `myapp://login?error=${encodeURIComponent(searchParams.error)}`
        : null;

  useEffect(() => {
    if (!deepLink) { alert('ddddddddddddd'); return; }

    const t = setTimeout(() => {
      window.location.href = deepLink;
    }, 300);
    return () => clearTimeout(t);
  }, [deepLink]);

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h3>در حال بازگشت به اپلیکیشن…</h3>

      <p>اگر اپلیکیشن به‌صورت خودکار باز نشد، روی دکمه زیر بزنید:</p>

      {deepLink && (
        <a
          href={deepLink}
          style={{
            display: "inline-block",
            marginTop: 16,
            padding: "12px 20px",
            backgroundColor: searchParams?.error ? "#f44336" : "#4CAF50",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          {searchParams?.error
            ? "بازگشت به اپلیکیشن (با خطا)"
            : "باز کردن اپلیکیشن"}
        </a>
      )}

      {/* {!deepLink && (
        <p style={{ color: "red", marginTop: 16 }}>
          اطلاعات لازم برای بازگشت به اپلیکیشن یافت نشد.
        </p>
      )} */}
    </div>
  );
}
