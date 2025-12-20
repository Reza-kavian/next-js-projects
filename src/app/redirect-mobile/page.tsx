"use client";

import { useEffect } from "react";

export default function MobileRedirectPage({ searchParams }: any) {
  const deepLink =
    searchParams?.token
      // ? `myapp://auth/callback?token=${encodeURIComponent(searchParams.token)}`
      ? `myapp://login?token=${encodeURIComponent(searchParams.token)}`
      : searchParams?.error
      // ? `myapp://auth/callback?error=${encodeURIComponent(searchParams.error)}`
      ? `myapp://login?error=${encodeURIComponent(searchParams.error)}`
      
      : null;

  useEffect(() => {
    if (!deepLink) return;

    setTimeout(() => {
      window.location.href = deepLink;
    }, 300);
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

      {!deepLink && (
        <p style={{ color: "red", marginTop: 16 }}>
          اطلاعات لازم برای بازگشت به اپلیکیشن یافت نشد.
        </p>
      )}
    </div>
  );
}
