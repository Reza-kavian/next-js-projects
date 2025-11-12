"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";  //zare_nk_040417_commented
let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_040417_added
//  import Modal from "bootstrap/js/dist/modal";   //age faghat in ra begzaram va kolle bootstarp ra import nakonam kami be sabok boodane barname komak mishe,vali dar terminal errore <<document is not defined>> mideh ke badan tahlilesh mikonam
// import { BrowserMultiFormatReader } from "@zxing/browser";   //zare_nk_040417_commented
// import { NotFoundException } from "@zxing/library";    //zare_nk_040417_commented
// import { json } from "stream/consumers";  //zare_nk_040417_commented
import "@/styles/ordersHistoryCss.css";

import { RefObject } from "react";
import { MouseEvent } from "react"; 

async function getBootstrap() {
  if (!cachedBootstrap) {
    cachedBootstrap = await import("bootstrap");
  }
  return cachedBootstrap;
}

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // return parts.pop().split(";").shift(); //zare_nk_040410_commented
    return parts.pop()?.split(";").shift() ?? null; //zare_nk_040410_added
  }
  return null; // اگر کوکی پیدا نشد
}

export default function ShallowRoutingExample() {
  const router = useRouter();
  type ForoshStateType = {
    ShomarehFaktorForoosh: number;
    IdFaktorForoosh: number;
    TarikhShamsi: string;
    MablaghKolMasraf: number;
    TakhfifTitr: number;
    MablaghKhales: number;
    orderRowsLength: number;
  };
  
  const [ForooshSatrHideForooshTitr, setForooshSatrHideForooshTitr] =
    useState<ForoshStateType | null>(null);
  const [bisatr, setBisatr] = useState(true);
  const [bisatrDarSatr, setBisatrDarSatr] = useState(true);

  type SabadRowType = {
    IdKala: number;
    NameKala: string;
    // Tedad: number;
    // IdNoeVazni:number;
    // MablaghKhalesSatr:number;
    [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast
  };
  const [sabadRows, setSabadRows] = useState<SabadRowType[] | null>(null);

  type OrderRowsType = {
    IdFaktorForoosh: number;
    NameSobe: string;
    // VaziatFactor
    // NameMoshtari
    // TarikhShamsi
    // MablaghKhales
    // ShomarehFaktorForoosh
    // TarikhShamsi
    // MablaghKolMasraf
    // TakhfifTitr
    // MablaghKhales
    [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast
  };
  const [orderRows, setOrderRows] = useState<OrderRowsType[] | null>(null);
  const [isShowFaktorForooshSatr, setIsShowFaktorForooshSatr] = useState(false);

  ////zare_nk_040410_added_st(and commented-lafze notNull ra yek no mishnase va maghadire digeye string ro ghabool nemikone,felan az in sabk estefadeh nakardam va hamoon string baram kafiteh)
  // type ShowFaktorType = "notNull" | null;
  // const [isShowFaktorForooshTitr, setIsShowFaktorForooshTitr] = useState<ShowFaktorType>(null);
  ////zare_nk_040410_added_end(and commented-lafze notNull ra yek no mishnase va maghadire digeye string ro ghabool nemikone,felan az in sabk estefadeh nakardam va hamoon string baram kafiteh)
  ////zare_nk_040410_added_st
  const [isShowFaktorForooshTitr, setIsShowFaktorForooshTitr] = useState<
    string | null
  >(null);
  //zare_nk_040410_added_end

  type ShowForooshSatrHideForooshTitrProps = {
    ShomarehFaktorForoosh: number; 
    IdFaktorForoosh: number; 
    TarikhShamsi: string; 
    MablaghKolMasraf: number; 
    TakhfifTitr: number; 
    MablaghKhales: number; 
    orderRowsLength: number; 
  };

  async function ShowForooshSatrHideForooshTitr({
    ShomarehFaktorForoosh,
    IdFaktorForoosh,
    TarikhShamsi,
    MablaghKolMasraf,
    TakhfifTitr,
    MablaghKhales,
    orderRowsLength,
  }:  
  ShowForooshSatrHideForooshTitrProps) {
    setIsShowFaktorForooshSatr(true);
    setIsShowFaktorForooshTitr(null);
    setForooshSatrHideForooshTitr(() => {
      return {
        ShomarehFaktorForoosh: ShomarehFaktorForoosh,
        IdFaktorForoosh: IdFaktorForoosh,
        TarikhShamsi: TarikhShamsi,
        MablaghKolMasraf: MablaghKolMasraf,
        TakhfifTitr: TakhfifTitr,
        MablaghKhales: MablaghKhales,
        orderRowsLength: orderRowsLength,
      };
    });
    const token = getCookie("token");
    if (token == null) { 
      return;
    } else { 
      const token = getCookie("token");
      // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
      let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
      var urlSelectFaktorForooshSatr = ApiUrl + "Api_SelectFaktorForooshSatr";
      const response = await fetch(urlSelectFaktorForooshSatr, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ShomarehFaktorForoosh: ShomarehFaktorForoosh,
        }),
        // credentials: "include", //zare_nk_040402_commented
      });
      const data = await response.json();
      if (response.ok) {
        if (data.status != 0) {
          const bootstrap = await getBootstrap();  
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .errorInMymodalForWarning"
          );
          if (span instanceof HTMLElement) {
            span.innerText = data.errors[0];
          }
        } else if (data.status == 0) {
          var result = JSON.parse(data.data.list);
          if (result.length == 0) {
            setBisatrDarSatr(true);
            return;
          }
          setBisatrDarSatr(false);
          setSabadRows(result);
        }
      } else {
        if (response.status == 401) {
          const bootstrap = await getBootstrap(); //zare_nk_040417_added
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .errorInMymodalForWarning"
          );
          if (span instanceof HTMLElement) {
            span.innerText = "لطفا ابتدا آنلاین شوید";
          }
        }
      }
    }
  }

  useEffect(() => {
    const mymodalForWarning = document.getElementById("mymodalForWarning");
    const handlerForMymodalForWarning = () => {
      router.refresh(); //zare_nk_040312_added-kolle safhe refresh nemishe va saritar va behtare
      //  window.location.reload();  //zare_nk_040312_added-faghat dar sourate niaz vaghti ke router.refresh() javab nadad
    };
    if (mymodalForWarning) {
      mymodalForWarning.addEventListener(
        "hidden.bs.modal",
        handlerForMymodalForWarning
      );
    }
    return () => {      
      // پاکسازی رویداد در unmount
      if (mymodalForWarning) {
        mymodalForWarning.removeEventListener(
          "hidden.bs.modal",
          handlerForMymodalForWarning
        );
      } 
    };
  }, []);  

  useEffect(() => {
    if (ForooshSatrHideForooshTitr != null) {
      return;
    }
    async function tempFuncForAsync() {
      const token = getCookie("token");
      if (token == null) {
        return;
      } else {
        const token = getCookie("token");
        // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
        let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
        var urlSelectFaktorForooshTitr = ApiUrl + "Api_SelectFaktorForooshTitr";
        const response = await fetch(urlSelectFaktorForooshTitr, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({}),
          // credentials: "include", //zare_nk_040402_commented
        });
        const data = await response.json();
        if (response.ok) {
          if (data.status != 0) {
            const bootstrap = await getBootstrap();  
            const mymodalForWarning = new bootstrap.Modal(
              document.getElementById("mymodalForWarning")
            );
            mymodalForWarning.show();
            const span = document.querySelector(
              "#mymodalForWarning .errorInMymodalForWarning"
            );
            if (span instanceof HTMLElement) {
              span.innerText = data.errors[0];
            }
          } else if (data.status == 0) {
            var result = JSON.parse(data.data.list);
            if (result.length == 0) {
              setBisatr(true);
              return;
            }
            setBisatr(false);
            setOrderRows(result);
          }
        } else {
          if (response.status == 401) {
            const bootstrap = await getBootstrap();  
            const mymodalForWarning = new bootstrap.Modal(
              document.getElementById("mymodalForWarning")
            );
            mymodalForWarning.show();
            const span = document.querySelector(
              "#mymodalForWarning .errorInMymodalForWarning"
            );
            if (span instanceof HTMLElement) {
              span.innerText = "لطفا ابتدا آنلاین شوید";
            }
          }
        }
      }
    }
    tempFuncForAsync();
  }, [isShowFaktorForooshTitr]);

  const onBackClick = () => {
    setIsShowFaktorForooshSatr(false);
    setIsShowFaktorForooshTitr("notNull");
    setForooshSatrHideForooshTitr(null);
  };

  return isShowFaktorForooshSatr == true ? (
    <div
      id="MyOrdersDetCont"
      style={{
        color: "#4B4949",
        display: "flex",
        flexFlow: "column",
        width: "100%",
        direction: "rtl",
      }}
    >
      <div
        id="MyOrderDet"
        className="MyOrderDet"
        style={{
          display: "flex",
          flexFlow: "column",
          width: "100%",
          marginBottom: "40px",
          marginTop: "10px",
          direction: "rtl",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div
            className="titleStyle"
            style={{
              fontSize: 18,
              display: "flex",
              flexFlow: "row",
              alignItems: "center",
            }}
          >
            <h6 style={{ marginLeft: 10, fontSize: 18 }}>جزئیات سفارش</h6>
            {ForooshSatrHideForooshTitr != null && (
              <span>{ForooshSatrHideForooshTitr.IdFaktorForoosh}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "start",
            }}
          >
            <a
              className="buttonHover titleStyle"
              href="#"
              onClick={onBackClick}
              style={{
                padding: 10,
                borderRadius: 7,
                display: "flex",
                flexFlow: "row",
                textDecoration: "none",
                backgroundColor: "inherit",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "center",
                  backgroundColor: "inherit",
                  marginLeft: 10,
                }}
              >
                <img
                  src="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                  style={{ width: 18 }}
                  alt="بازگشت به لیست سفارش ها"
                />
              </div>
              <div
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  flexFlow: "row",
                  alignItems: "center",
                  fontSize: 14,
                }}
              >
                <span>بازگشت به لیست سفارش ها</span>
              </div>
            </a>
          </div>
        </div>

        {/* Order Date */}
        <div
          className="tahvilTarikhCont"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            className="tahvilCont"
            style={{
              display: "flex",
              flexFlow: "column",
              // border: "1px solid #E7E7E7",  //zare_nk_040410_commented
              borderRadius: 10,
              padding: 16,
              border: "none",
              boxShadow: "0px 0px 3px 0px silver",
            }}
          >
            <div style={{ display: "flex", flexFlow: "row", fontSize: 14 }}>
              <span className="titleStyle">تاریخ سفارش</span>
              <span style={{ margin: "0 5px" }}>:</span> 
              {ForooshSatrHideForooshTitr != null && (
                <span className="valueStyle" style={{ marginLeft: 5 }}>
                  {ForooshSatrHideForooshTitr.TarikhShamsi ?? ""}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div
          className="productJoziatCont"
          style={{ display: "flex", marginTop: "10px" }}
        >
          {/* Product Count */}
          <div
            className="productContInMyOrderDet valueStyle"
            style={{
              border: "1px solid #E7E7E7",
              borderRadius: 10,
              display: "flex",
              flexFlow: "column",
              padding: 16,
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexFlow: "row" }}>
                <h6 className="titleStyle" style={{ fontSize: 16 }}>
                  محصولات
                </h6>
              </div>
              <div style={{ display: "flex", flexFlow: "row", fontSize: 14 }}> 
                {ForooshSatrHideForooshTitr != null && (
                  <span style={{ marginLeft: 7 }}>
                    {ForooshSatrHideForooshTitr.orderRowsLength}
                  </span>
                )}
                <span>کالا</span>
              </div>
            </div>

            {!bisatrDarSatr && (
              <>
                {sabadRows?.map((item, index) => {
                  return (
                    <div
                      key={index || item.IdKala}
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        borderBottom: "1px solid #F5F5F5",
                        padding: "10px 0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          marginLeft: "10px",
                        }}
                      >
                        <img
                          loading="lazy"
                          src={`https://img.tochikala.com/Product/${item.IdKala}.jpg`}
                          alt={item.NameKala || ""}
                          style={{ width: "64px", height: "64px" }}
                          // onError={(e) => {
                          //   e.target.onerror = null;
                          //   e.target.src =
                          //     "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg";
                          // }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <h6
                            style={{
                              fontSize: "13px",
                              fontFamily: "IRANSansWeb_Medium(adad_fa)",
                            }}
                          >
                            {item.NameKala || ""}
                          </h6>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexFlow: "row",
                            fontSize: "14px",
                          }}
                        >
                          <span style={{ marginLeft: "5px" }}>
                            {item.Tedad ?? ""}
                          </span>
                          <span>
                            {item.IdNoeVazni === 0 ? "عدد" : "کیلوگرم"}
                          </span>

                          <span
                            style={{
                              width: "0px",
                              height: "25px",
                              borderLeft: "2px solid silver",
                              margin: "0px 5px",
                            }}
                          ></span>

                          <div style={{ display: "flex", flexFlow: "row" }}>
                            <span style={{ marginLeft: "5px" }}>
                              {item.MablaghKhalesSatr != null
                                ? item.MablaghKhalesSatr.toLocaleString()
                                : ""}
                            </span>
                            <span>ریال</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Invoice Details */}
          <div
            className="joziatFaktorCont valueStyle"
            style={{
              border: "1px solid #E7E7E7",
              borderRadius: 10,
              display: "flex",
              flexFlow: "column",
              padding: 16,
              fontSize: 14,
              backgroundColor: "white",
              height: "fit-content",
            }}
          >
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                borderBottom: "1px solid #F5F5F5",
                padding: "10px 0",
              }}
            >
              <span className="titleStyle">جزئیات فاکتور</span>
            </div>

            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                borderBottom: "1px solid #F5F5F5",
                padding: "12px 0",
              }}
            >
              <div style={{ display: "flex", flexFlow: "row" }}>
                <span>مجموع خرید شما</span>
              </div>
              <div style={{ display: "flex", flexFlow: "row" }}>
                {ForooshSatrHideForooshTitr != null && (
                  <span style={{ marginLeft: 10, fontSize: 16 }}>
                    {ForooshSatrHideForooshTitr.MablaghKolMasraf?.toLocaleString() ??
                      ""}
                  </span>
                )}
                {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{MablaghKolMasraf?.toLocaleString() ?? ''}</span> */}
                <span>ریال</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                borderBottom: "1px solid #F5F5F5",
                padding: "12px 0",
              }}
            >
              <div style={{ display: "flex", flexFlow: "row" }}>
                <span>سود شما از این خرید</span>
              </div>
              <div style={{ display: "flex", flexFlow: "row" }}>
                {ForooshSatrHideForooshTitr != null && (
                  <span style={{ marginLeft: 10, fontSize: 16 }}>
                    {ForooshSatrHideForooshTitr.TakhfifTitr?.toLocaleString() ??
                      ""}
                  </span>
                )}
                {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{TakhfifTitr?.toLocaleString() ?? ''}</span> */}
                <span>ریال</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                padding: "12px 0",
              }}
            >
              <div style={{ display: "flex", flexFlow: "row" }}>
                <span>مبلغ خالص</span>
              </div>
              <div style={{ display: "flex", flexFlow: "row" }}>
                {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{MablaghKhales?.toLocaleString() ?? ''}</span> */}

                {ForooshSatrHideForooshTitr != null && (
                  <span style={{ marginLeft: 10, fontSize: 16 }}>
                    {ForooshSatrHideForooshTitr.MablaghKhales?.toLocaleString() ??
                      ""}
                  </span>
                )}
                <span>ریال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      id="MyOrdersCont"
      style={{
        display: "flex",
        flexFlow: "column",
        width: "100%",
        direction: "rtl",
      }}
    >
      {!bisatr && (
        <>
          {orderRows?.map((item, index) => {
            return (
              <div
                key={item.IdFaktorForoosh}
                id={`MyOrder-${item.IdFaktorForoosh}`}
                className="MyOrder buttonHoverr"
                style={{
                  cursor: "default",
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                  border: "1px solid #E7E7E7",
                  borderRadius: "10px",
                  color: "#4B4949",
                  marginBottom: "15px",
                  boxShadow: "0px 0px 3px 0px silver",
                }}
              >
                <div
                  className="MyOrderHead"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #E7E7E7",
                    padding: "5px 0px 5px 20px",
                  }}
                >
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <div
                        className="rounded-pilll"
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <img
                          style={{ width: "44px" }}
                          src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
                          alt="هایپر&zwnj;کرفو"
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "none",
                        flexFlow: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <div
                        style={{
                          flex: "0 0 auto",
                          display: "flex",
                          flexFlow: "row",
                          fontSize: "15px",
                          color: "#322E2E",
                        }}
                      >
                        <span
                          className="nameShobe titleStyle"
                          style={{ fontSize: "12px" }}
                        >
                          {item.NameSobe}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "none",
                      flexFlow: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        flexFlow: "row",
                        fontSize: "15px",
                      }}
                    >
                      <span
                        className="valueStyle"
                        id={`VaziatFactor-${item.IdFaktorForoosh}`}
                        style={{
                          padding: "7px",
                          borderRadius: "7px",
                          fontSize: "12px",
                        }}
                      >
                        {item.VaziatFactor}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="MyOrderBody"
                  style={{ display: "flex", flexFlow: "column" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      paddingBottom: "10px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "column",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          margin: "7px 0px",
                        }}
                      >
                        <span
                          className="titleStyle"
                          style={{
                            whiteSpace: "nowrap",
                            fontFamily: "IRANSansWeb_Bold(adad_fa)",
                          }}
                        >
                          {" "}
                          نام شخص{" "}
                        </span>
                        <span style={{ margin: "0px 5px" }}>:</span>
                        {/* <span  style={{textOverflow: 'ellipsis',overflow: 'hidden',display: '-webkit-box',-webkit-line-clamp: '2',lineClamp: '2',-webkit-box-orient: 'vertical'}}>{ item.NameMoshtari} </span> */}
                        <span
                          className="valueStyle"
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            display: "-webkit-box",
                            lineClamp: "2",
                          }}
                        >
                          {item.NameMoshtari}{" "}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          margin: "7px 0px",
                        }}
                      >
                        <span
                          className="titleStyle"
                          style={{
                            whiteSpace: "nowrap",
                            fontFamily: "IRANSansWeb_Bold(adad_fa)",
                          }}
                        >
                          {" "}
                          تاریخ سفارش{" "}
                        </span>
                        <span style={{ margin: "0px 5px" }}>: </span>
                        <span className="valueStyle">{item.TarikhShamsi}</span>
                      </div>
                    </div>
                    <div
                      id={`imgContInMyOrder-${item.IdFaktorForoosh}`}
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        alignItems: "center",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "end",
                      paddingBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        marginLeft: "10px",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="valueStyle"
                        style={{ marginLeft: "5px" }}
                      >
                        {item.MablaghKhales.toLocaleString()}{" "}
                      </span>
                      <span className="valueStyle" style={{ fontSize: "14px" }}>
                        ریال
                      </span>
                    </div>
                    <button
                      onClick={(e) => { 
                        ShowForooshSatrHideForooshTitr({
                          ShomarehFaktorForoosh: item.ShomarehFaktorForoosh,
                          IdFaktorForoosh: item.IdFaktorForoosh,
                          TarikhShamsi: item.TarikhShamsi,
                          MablaghKolMasraf: item.MablaghKolMasraf,
                          TakhfifTitr: item.TakhfifTitr,
                          MablaghKhales: item.MablaghKhales,
                          orderRowsLength: orderRows.length,
                        });
                      }}
                      className="btn btn-danger fontSizeLess768 "
                      style={{
                        flex: "1 1 150px",
                        maxWidth: "200px",
                        borderRadius: "10px",
                        padding: "7px 20px",
                      }}
                    >
                      جزئیات سفارش
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
