////zare_nk_041008_okk
"use client";   
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <body style={{ color: "#3f3f3f" }}>
      {!isLoginPage && (
        // <>
          <div className="layoutHeader sticky-top">
            <a
              className="headerTitle"
              href="/"
              style={{
                color: "inherit",
                textDecoration: "none",
                fontSize: "32px",
              }}
            >
              {" "}
              TIC-TAC-TOE
            </a>
            <LogoutButton />
          </div>
        // </>
      )}
      {children}
      <div
        className="modal px-0"
        id="mymodalForWarning"
        style={{ overflow: "hidden" }}
      >
        <div
          className="modal-dialog"
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "10px",
              width: "900px",
              flex: "0 0 900px",
              maxWidth: "100%",
              display: "flex",
              flexFlow: "column",
              height: "fit-content",
              maxHeight: "98vh",
              backgroundColor: "#fcfcfc !important",
            }}
          >
            <div
              className="modal-header"
              style={{ border: "none", padding: "6px 16px 5px 16px" }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="spanCont titleStyle"
                  style={{
                    fontFamily: "IRANSansWeb_Medium(adad_fa)",
                    fontSize: "18px",
                    color: "red",
                  }}
                >
                  <span>خطا</span>
                </div>
                <div className="h4Cont"></div>
                <div
                  className="buttonCont buttonHover"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      padding: "4px",
                      borderRadius: "8px",
                      border: "1px solid #A5A5A5",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    data-bs-dismiss="modal"
                  >
                    <img src="https://img.tochikala.com/tochikala/close-modal.svg" />
                  </span>
                </div>
              </div>
            </div>
            <div
              className="modal-body text-center thinScroll"
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexFlow: "column",
                paddingTop: "0px",
              }}
            >
              <div
                className="inModalBody"
                style={{
                  display: "flex",
                  flexFlow: "column",
                  height: "100%",
                }}
              >
                <div
                  className="scrollContInModal"
                  id="seePricesCont"
                  style={{
                    flex: "1 1 auto",
                    display: "flex",
                    flexFlow: "column",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="contAndHoshdarCont"
                    style={{
                      flex: "1 1 auto",
                      display: "flex",
                      flexFlow: "column",
                    }}
                  >
                    <div style={{ margin: "10px 0px" }}>
                      <span
                        className="errorInMymodalForWarning valueStyle"
                        style={{
                          width: "100%",
                          display: "flex",
                          flexFlow: "row",
                          fontSize: "16px",
                          // color: "red",
                          justifyContent: "center",
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
