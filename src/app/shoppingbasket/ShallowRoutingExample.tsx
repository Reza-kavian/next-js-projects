"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";  //zare_nk_040416_commented(chon enteghalesh dadam be layout.tsx)
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";  //zare_nk_040417_commented
let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_040417_added
// import Modal from "bootstrap/js/dist/modal";   //age faghat in ra begzaram va kolle bootstarp ra import nakonam kami be sabok boodane barname komak mishe,vali dar terminal errore <<document is not defined>> mideh ke badan tahlilesh mikonam
// import { BrowserMultiFormatReader } from "@zxing/browser";   //zare_nk_040417_commented
// import { NotFoundException } from "@zxing/library";    //zare_nk_040417_commented
// import { json } from "stream/consumers";  ////zare_nk_040417_commented(estefadeh ham nashod)
import "@/styles/shoppingbasketCss.css";

import { RefObject } from "react";
import { MouseEvent } from "react";

async function getBootstrap() {
  if (!cachedBootstrap) {
    cachedBootstrap = await import("bootstrap");
  }
  return cachedBootstrap;
}

type MiddleCountTedadSefrProps = {
  //zare_nk_040525_nokteh(type barabare taeine noe componente MiddleCountTedadSefr(componente sakhte .ForCart))
  refForMiddleCount: RefObject<HTMLInputElement | null>; //zare_nk_040525_nokteh(tage .middleCount dar .ForCart)
  refForfather: RefObject<string | null>; //zare_nk_040525_nokteh(basteh be sharayet barabare "#DetailsInfoCont" ya "#sabadItemsContInSafhe" hast)
  handlerForAddClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  handlerForRemClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  refForInputGroup: RefObject<HTMLInputElement | null>; //zare_nk_040525_nokteh(tage .input-group dar .ForCart)
  ForCartContentsDesignType: number; //zare_nk_040526_added(daraye maghadire 0(yani tedadDarSabd sefer) ya 1(yani tedadDarSabd 1) ya 2(yani tedadDarSabd >=2))
  tedad: number; //zare_nk_040525_nokteh(tedad dar sabad)
  idTag: string | number; //zare_nk_040525_nokteh(id tage .ForCart)
  IdKala: string | number; //zare_nk_040525_nokteh(meghdare IdKala)
  isOpenedProdDetModal: any; //zare_nk_040525_nokteh(agar true bashe yani modale prodDetModal baz ast,age false bashe yani modale prodDetModal basteh ast)
};

export function MiddleCountTedadSefr({
  //zare_nk_040525_nokteh(componente sakhte .ForCart)
  refForMiddleCount,
  refForfather,
  handlerForAddClick,
  handlerForRemClick,
  refForInputGroup,
  ForCartContentsDesignType,
  tedad,
  idTag,
  IdKala,
  isOpenedProdDetModal,
}: MiddleCountTedadSefrProps) {

  useEffect(() => {
    if (isOpenedProdDetModal == true) {
      refForfather.current = "#DetailsInfoCont";
    } else {
      refForfather.current = "#sabadItemsContInSafhe";
    }
    if (ForCartContentsDesignType == 0) {
      if (IdKala) {
        const ForCartWidth = document.querySelector(
          refForfather.current +
          " #ForCart-" +
          IdKala +
          " .input-group"
        );
        if (ForCartWidth instanceof HTMLElement) {
          ForCartWidth.style.width = "35px";
        }
      }
    } else if (ForCartContentsDesignType == 1) {
      if (IdKala) {
        const ForCartWidth = document.querySelector(
          refForfather.current +
          " #ForCart-" +
          IdKala +
          " .input-group"
        );
        if (ForCartWidth instanceof HTMLElement) {
          ForCartWidth.style.width = "auto";
        }
      }
    } else if (ForCartContentsDesignType == 2) {
      if (IdKala) {
        const ForCartWidth = document.querySelector(
          refForfather.current +
          " #ForCart-" +
          IdKala +
          " .input-group"
        );
        if (ForCartWidth instanceof HTMLElement) {
          ForCartWidth.style.width = "auto";
        }
      }
    }
  });

  if (ForCartContentsDesignType == 0) {
    return (
      <div
        className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
        id={`${idTag}`}
        style={{ width: "100%", display: "flex" }}
      >
        <div
          ref={refForInputGroup}
          className="input-group rounded-pill"
          style={{
            backgroundColor: "white",
            height: "35px",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "1px solid red",
            overflow: "hidden",
          }}
          dir="ltr"
        >
          <div
            className="addremmCont"
            id={`removeCont-${IdKala}`}
            style={{ height: "100%", flex: "1 1 auto", display: "none" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
                data-baz="0"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  borderRadius: "50%",
                }}
                className={`rem-${IdKala}`}
                href="/login"
              >
                <button
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus"
                >
                  <img
                    src="https://img.tochikala.com/tochikala/remove-icon.svg"
                    alt="حذف از سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </button>
              </a>
            </div>
          </div>

          <div
            ref={refForMiddleCount}
            className={`middleCount-${IdKala}`}
            style={{
              height: "100",
              flex: "1 1 auto",
              display: "flex",
              flexFlow: "column",
            }}
          >
            <span
              style={{
                height: "100%",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  borderRadius: "50%",
                }}
                className={`add-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForAddClick(e);
                }}
              >
                <button
                  id={`inp-${IdKala}`}
                  style={{
                    color: "red",
                    fontSize: "14px",
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus card-linkk text-dangerr fa fa-plus"
                ></button>
              </a>
            </span>
          </div>

          <div
            className="addremmCont"
            id={`addCont-${IdKala}`}
            style={{ height: "100%", flex: "1 1 auto", display: "none" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
                data-baz="0"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  borderRadius: "50%",
                }}
                className={`add-${IdKala}`}
                href="/login"
              >
                <button
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus"
                >
                  <img
                    src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                    alt="اضافه به سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (ForCartContentsDesignType == 1) {
    return (
      <div
        className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
        id={`${idTag}`}
        style={{ width: "100%", display: "flex" }}
      >
        <div
          ref={refForInputGroup}
          className="input-group rounded-pill"
          style={{
            backgroundColor: "white",
            height: "35px",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "1px solid red",
            overflow: "hidden",
          }}
          dir="ltr"
        >
          <div
            className="addremmCont"
            id={`removeCont-${IdKala}`}
            style={{ height: "100%", flex: "1 1 auto" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`rem-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForRemClick(e);
                }}
              >
                <button
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus"
                >
                  <img
                    src="https://img.tochikala.com/tochikala/remove-icon.svg"
                    alt="حذف از سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </button>
              </a>
            </div>
          </div>

          <div
            ref={refForMiddleCount}
            className={`middleCount-${IdKala}`}
            style={{ height: "100", display: "flex", flexFlow: "column" }}
          >
            <span
              id={`inp-${IdKala}`}
              className="text-center titleStyle"
              style={{
                backgroundColor: "white",
                border: "none",
                flex: "1 0 40%",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {tedad}
            </span>
            <span style={{ border: "none" }}> </span>
          </div>

          <div
            className="addremmCont"
            id={`addCont-${IdKala}`}
            style={{ height: "100%", flex: "1 1 auto" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`add-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForAddClick(e);
                }}
              >
                <button
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus"
                >
                  <img
                    src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                    alt="اضافه به سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (ForCartContentsDesignType == 2) {
    return (
      <div
        className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
        id={`${idTag}`}
        style={{ width: "100%", display: "flex" }}
      >
        <div
          ref={refForInputGroup}
          className="input-group rounded-pill"
          style={{
            backgroundColor: "white",
            height: "35px",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "1px solid red",
            overflow: "hidden",
          }}
          dir="ltr"
        >
          <div
            className="addremmCont"
            id={`removeCont-${IdKala}`}
            style={{ height: "100%", flex: "1 1 auto" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`rem-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForRemClick(e);
                }}
              >
                <button
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus"
                >
                  <img
                    src="https://img.tochikala.com/tochikala/remove-from-cart.svg"
                    alt="حذف از سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </button>
              </a>
            </div>
          </div>

          <div
            ref={refForMiddleCount}
            className={`middleCount-${IdKala}`}
            style={{ height: "100", display: "flex", flexFlow: "column" }}
          >
            <span
              id={`inp-${IdKala}`}
              className="text-center titleStyle"
              style={{
                backgroundColor: "white",
                border: "none",
                flex: "1 0 40%",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {tedad}
            </span>
            <span style={{ border: "none" }}> </span>
          </div>

          <div
            className="addremmCont"
            id={`addCont-${IdKala}`}
            style={{ height: "100%", flex: "1 1 auto" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`add-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForAddClick(e);
                }}
              >
                <button
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus"
                >
                  <img
                    src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                    alt="اضافه به سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

type BaseRow = {
  IdKala: number;
};

type DetailsRow = BaseRow & {
  // IdKala: number;
  // ForCartContentsDesignType: number;
  // TedadOut: number;
  // hadaksar: string;
  // idTag: string;
  // NameKala: string | null; 
  // DarsadTakhfif: number | null;   
  // NameBerand: string | null;
  // FeeForoosh: number;  
  // FeeMasraf: number;  
  // BarcodeKala: string;  
  [key: string]: any;
};

type SabadRowType = BaseRow & {
  // // IdKala: number;
  // NameKala: string;
  // DarsadTakhfif: number; 
  // // TedadOut?: number | null;
  // // addQuota: number;
  // // BarcodeKala: string | null;
  [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast
};

type SabadTitrType = {
  IdSabadKharidTitr: number;
  SumFeeMasraf: number;
  soodAzKharid: number;
  MablaghNahaee: number;
  [key: string]: any;
};

type SabadSatrProps = {
  SabadRow: SabadRowType,
  IdKala: number;
  NameKala: string;
  j: number;
  DarsadTakhfif: number;
  FeeForoosh: number;
  refForMiddleCount: RefObject<HTMLInputElement | null>;
  refForfather: RefObject<string | null>;
  refForInputGroup: RefObject<HTMLInputElement | null>;
  MasrafSatr: number;
  handlerForAddClick: (
    ////zare_nk_041116_commented_st
    // IdKala: number ,
    // TedadOut: number | null | undefined,
    // addQuota: number,
    // BarcodeKala: string | null,
    ////zare_nk_041116_commented_end
    row: SabadRowType,  //zare_nk_041116_added
    e?: MouseEvent<HTMLAnchorElement> | null | undefined
  ) => void;
  handlerForRemClick: (
    TedadOut: number | null | undefined,
    BarcodeKala: string | null,
    e?: MouseEvent<HTMLAnchorElement> | null | undefined
  ) => void;
  openprodDetModal: (barcodeKala: string) => void;
  ForCartContentsDesignType: number;
  tedad: number;
  // hadaksar: string;  //zare_nk_040409_commented(ezafiye)
  idTag: string;
  BarcodeKala: string;
  isOpenedProdDetModal: boolean;
};

export function SabadSatrComponent({
  SabadRow,
  IdKala,
  NameKala,
  j,
  DarsadTakhfif,
  FeeForoosh,
  refForMiddleCount,
  refForfather,
  refForInputGroup,
  MasrafSatr,
  handlerForAddClick,
  handlerForRemClick,
  openprodDetModal,
  ForCartContentsDesignType,
  tedad,
  idTag,
  BarcodeKala,
  isOpenedProdDetModal,
}: SabadSatrProps) {

  ////zare_nk_041117_added_st_testi
  useEffect(() => {
    console.log('041117-SabadRow: ' + JSON.stringify(SabadRow));
  }, [SabadRow]);
  ////zare_nk_041117_added_end_testi

  return (
    <div
      id={`flxpedar2-${IdKala}`}
      className="flxpedar2_new"
      style={{
        display: "flex",
        flexFlow: "column",
        padding: "5px 0px",
        textAlign: "right",
        direction: "rtl",
        position: "relative",
      }}
    >
      <div
        id={`ContInflxpedar2-${IdKala}`}
        className="ContInflxpedar2"
        style={{
          display: "flex",
          flexFlow: "row",
          textAlign: "right",
          direction: "rtl",
          position: "relative",
        }}
      >
        <div
          id={`sath1ImgCont2-${IdKala}`}
          className="sath1ImgCont2_new"
          style={{
            display: "flex",
            flexFlow: "column",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={(event) => openprodDetModal(BarcodeKala)}
            style={{
              display: "flex",
              flexFlow: "column",
              flex: "0 0 auto",
              padding: "0px",
              border: "none",
            }}
            className="GotToDet"
          >
            <div
              className="imgcont"
              id={`imgcontainerInSabadKesho-${IdKala}`}
              style={{
                width: "92px",
                display: "flex",
                flexFlow: "column",
                height: "min-content",
              }}
            >
              <img
                loading="lazy"
                src={`https://img.tochikala.com/Product/${IdKala}.webp`}
                className="sath1Img2_new"
                alt={NameKala}
                style={{ backgroundColor: "#EFEFEF", width: "100%" }}
              />
            </div>
          </button>

          <button
            data-id={j}
            id={`updateTedad-${IdKala}`}
            className="updateTedad btn btn-danger"
            style={{
              display: "none",
              borderRadius: "10px",
              fontSize: "12px",
              marginTop: "10px",
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
          >
            بروزرسانی تعداد
          </button>
        </div>

        <div
          id={`dflx22_new-${IdKala}`}
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              className="titleInsabad text-truncate"
              style={{
                display: "inline-block",
                flexFlow: "column",
                whiteSpace: "nowrap",
                overflow: "hidden",
                marginLeft: "10px",
              }}
            >
              {NameKala}
            </div>

            <div
              id={`darsadTakhfifInsabad-${IdKala}`}
              className="darsadTakhfifInsabad rounded-pill"
              style={{
                backgroundColor: "#dc3545",
                width: "35px",
                height: "20px",
                flex: "0 0 auto",
                display: "none",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <span
                id={`forDiscount-${IdKala}`}
                className="forDiscount"
                style={{
                  fontSize: "75%",
                  color: "white",
                  opacity: 1,
                  borderRadius: "8px",
                }}
              >
                {DarsadTakhfif}٪
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              id={`ForCartContInProdDet-${IdKala}`}
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
              }}
            >
              <MiddleCountTedadSefr
                refForMiddleCount={refForMiddleCount}
                refForfather={refForfather}
                handlerForAddClick={(e) => {
                  return handlerForAddClick(
                    SabadRow,
                    e
                  );
                }}
                handlerForRemClick={(e) => {
                  return handlerForRemClick(
                    tedad ? tedad : null,
                    BarcodeKala,
                    e
                  );
                }}
                refForInputGroup={refForInputGroup}
                ForCartContentsDesignType={ForCartContentsDesignType}
                tedad={tedad}
                // hadaksar=""
                idTag={idTag}
                IdKala={IdKala}
                isOpenedProdDetModal={isOpenedProdDetModal}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexFlow: "column",
                paddingTop: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  marginBottom: "10px",
                  justifyContent: "end",
                }}
              >
                <div
                  className="titleInsabad"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "10px",
                  }}
                >
                  قیمت کرفو
                </div>
                <div
                  className="gheimatForooshInsabad titleStyle"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "5px",
                  }}
                >
                  {FeeForoosh != null ? FeeForoosh.toLocaleString() : 0}
                </div>
                <div
                  className="rialInsabad valueStyle"
                  style={{ display: "flex", flexFlow: "row" }}
                >
                  ریال
                </div>
              </div>

              <div style={{ display: "flex", flexFlow: "row" }}>
                <div
                  className="titleInsabad"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "10px",
                  }}
                >
                  مجموع سطر
                </div>
                <div
                  id={`majmooGheimatForooshSatrInsabad-${IdKala}`}
                  className="majmooGheimatForooshSatrInsabad titleStyle"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "5px",
                  }}
                >
                  {MasrafSatr ? MasrafSatr.toLocaleString() : 0}
                </div>
                <div
                  className="rialInsabad valueStyle"
                  style={{ display: "flex", flexFlow: "row" }}
                >
                  ریال
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id={`changeFeeWarning-${IdKala}`}
        className="changeFeeWarning"
        style={{
          display: "none",
          flexFlow: "row",
          fontSize: "12px",
          color: "red",
          paddingBottom: "5px",
        }}
      >
        <span style={{ marginRight: "10px" }}>
          قیمت این کالا تغییر کرده است
        </span>
      </div>
    </div>
  );
}

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // return parts.pop().split(";").shift(); //zare_nk_040406_commented
    return parts.pop()?.split(";").shift() ?? null; //zare_nk_040406_added
  }
  return null; // اگر کوکی پیدا نشد
}

export default function ShallowRoutingExample() {
  const router = useRouter();
  const [ForCartContInProdDetVal, setForCartContInProdDetVal] =
    useState<DetailsRow | null>(null);  
  var refForInputGroup = useRef(null);
  const refForMiddleCount = useRef<HTMLInputElement>(null);
  const refForfather = useRef<string | null>(null);
  const refForBishAzMaxTedadYaMojoodi = useRef<number | null>(null);
  ////zare_nk_041115_added_st(albate felan niazam nemisheh)
  const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null);
  ////zare_nk_041115_added_end(albate felan niazam nemisheh)

  const [bisatr, setBisatr] = useState(true);
  const [sabadRows, setSabadRows] = useState<SabadRowType[] | null>(null);

  const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null);
  const [jamKol, setJamKol] = useState<number | null>(null);
  const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
  const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);  //zare_nk_041115_added

  const [isOpenedProdDetModal, setIsOpenedProdDetModal] = useState(false);
  const [isOpenedSeePricesModal, setIsOpenedSeePricesModal] = useState(false);
  async function openprodDetModal(barcodeKala: string) {
    await ShowDetails(barcodeKala); 
    setIsOpenedProdDetModal(true);
    setAddOrRemChanged(null);
  }
  async function ShowCamera() {
    // تنظیم ZXing برای پشتیبانی از QR کد و بارکدهای 1D
    const { BrowserMultiFormatReader } = await import("@zxing/browser"); //zare_nk_040417_added
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(
        undefined,
        "videoForzxing",
        async (result, err, control) => {
          if (result) {
            const text = result.getText();
            // متوقف کردن اسکن پس از شناسایی
            control.stop();
            const bootstrap = await getBootstrap();
            const modal = new bootstrap.Modal(
              document.getElementById("seePricesModal")
            );
            modal.hide();
            openprodDetModal(/* 6262831000503 */ text);
          } else {
            const { NotFoundException } = await import("@zxing/library");
            if (err && !(err instanceof NotFoundException)) {
              console.log("zare_nk_040321-in zxing-err: " + err);
            }
          }
        }
      )
      .catch((err) => {
        console.log("zare_nk_040321-in zxing-err in catch: " + err);
      });
  }
  
  async function ShowDetails(barcodeKala: any) {
    alert('041116-ShowDetails called!!');
    const token = getCookie("token");
    if (token == null) {
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
    ////zare_nk_041115_commented_st
    // // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
    // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
    // var urlApi_SelectShobehJashnvareh = ApiUrl + "Api_SelectKala";
    ////zare_nk_041115_commented_end
    ////zare_nk_041115_added_st
    let ApiUrl = "https://api.tochikala.com/api/";
    var urlApi_SelectShobehJashnvareh = ApiUrl + "User/Api_SelectKalaShobeh"; 
    const response = await fetch(urlApi_SelectShobehJashnvareh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ 
        BarcodeKala: barcodeKala, 
        IdShobeh: 7,   
        // IdKala: 1111 //zare_nk_041115_nokteh(api Api_SelectKalaShobeh ham BarcodeKala ro voroodi migireh ham IdKala ro.ma alan chon dar 
        //// barkode kala hanooz kala va keshi nashodeh va IdKala nadarim pas hamoon BarcodeKala ro miferestim va IdKala ro comment mikonim,meghdare 1111 ha soori neveshtam)
      }),
      // credentials: "include", //zare_nk_040402_commented
    });
    if (response.ok) {
      const data = await response.json();
      var result = data;
      if (result.status != 0) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .modal-body span"
        );
        if (span instanceof HTMLElement) {
          span.innerText = result.errors[0];
        }
      } else if (result.status == 0) {
        if (result.data.list == undefined) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText =
              result.message.length == 0
                ? "ارتباط با سرور برقرار نشد"
                : result.message;
          }
          return;
        }
        var parsedList = JSON.parse(result.data.list);
        if (parsedList.length == 0) {
          const productExist = document.getElementById("productExist");
          if (productExist instanceof HTMLElement) {
            productExist.style.display = "none";
          }
          const productNotExist = document.getElementById("productNotExist");
          if (productNotExist instanceof HTMLElement) {
            productNotExist.style.display = "flex";
          }
          return;
        }
        const productExist = document.getElementById("productExist");
        if (productExist instanceof HTMLElement) {
          productExist.style.display = "flex";
        }
        const productNotExist = document.getElementById("productNotExist");
        if (productNotExist instanceof HTMLElement) {
          productNotExist.style.display = "none";
        }
          
        var isChange = null; 
        fillRefsAndfillForCartTagsInDetails(
          "#DetailsInfoCont",
          parsedList[0],
          isChange
        );
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

  useEffect(() => {
    if (isOpenedProdDetModal == false) {
      return;
    }
    const productExist = document.getElementById("productExist");
    if (productExist instanceof HTMLElement) {
      productExist.style.display = "flex";
    }
    const productNotExist = document.getElementById("productNotExist");
    if (productNotExist instanceof HTMLElement) {
      productNotExist.style.display = "none";
    }
    
    const groupsInDetailsPageCont = document.getElementById(
      "groupsInDetailsPageCont"
    );
    if (groupsInDetailsPageCont instanceof HTMLElement) {
      groupsInDetailsPageCont.style.display = "none";
    }
    const handlerForProdDetModal = () => {
      const ImageColectionInDetails = document.getElementById(
        "ImageColectionInDetails"
      );
      if (ImageColectionInDetails instanceof HTMLElement)
        ImageColectionInDetails.style.display = "none";
    };
    const hiddenHandlerForProdDetModal = () => {
      setIsOpenedProdDetModal(false);
      setAddOrRemChanged("notNull");
    };
    const prodDetModal = document.getElementById("prodDetModal");
    async function tempFuncForAsyncGetBootstrap() {
      if (prodDetModal && isOpenedProdDetModal) {
        prodDetModal.addEventListener("shown.bs.modal", handlerForProdDetModal);
        prodDetModal.addEventListener(
          "hidden.bs.modal",
          hiddenHandlerForProdDetModal
        );
        const bootstrap = await getBootstrap();
        const modal = new bootstrap.Modal(prodDetModal);
        modal.show();
      }
    }
    tempFuncForAsyncGetBootstrap();
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
      if (prodDetModal) {
        prodDetModal.removeEventListener(
          "shown.bs.modal",
          handlerForProdDetModal
        );
      }
    };
  }, [isOpenedProdDetModal]);

  useEffect(() => {
    const seePricesModal = document.getElementById("seePricesModal");
    const handlerForSeePricesModal = () => {
      const input = document.getElementById("manualInputBarcode");
      if (input instanceof HTMLInputElement) {
        input.value = "";
      }
      ShowCamera();
    };

    const hiddenHandlerForSeePricesModal = () => {
      setIsOpenedSeePricesModal(false);
      setAddOrRemChanged("notNull");
    };
    async function tempFuncForAsyncGetBootstrap() {
      if (seePricesModal) {
        seePricesModal.addEventListener(
          "shown.bs.modal",
          handlerForSeePricesModal
        );
        seePricesModal.addEventListener(
          "hidden.bs.modal",
          hiddenHandlerForSeePricesModal
        );
        const bootstrap = await getBootstrap();
        const modal = new bootstrap.Modal(seePricesModal);
        modal.show();
      }
    }
    tempFuncForAsyncGetBootstrap();
  }, [isOpenedSeePricesModal]);

 

  ////zare_nk_041115_added_st
  async function getSabadItems(IdSabadKharidTitr: number, token: string) {  
    ////zare_nk_041115_commented_st
    // // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
    // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
    // var urlSelectSabad = ApiUrl + "Api_SelectSabad";
    ////zare_nk_041115_commented_end
    ////zare_nk_041115_added_st
    let ApiUrl = "https://api.tochikala.com/api/";
    var urlSelectSabad = ApiUrl + "User/Api_SelectSabadKharidSatr";
    ////zare_nk_041115_added_end
    const response = await fetch(urlSelectSabad, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // body: JSON.stringify({}),  //zare_nk_041115_commented
      ////zare_nk_041115_added_st
      body: JSON.stringify({
        IdShobe: 7,  //zare_nk_041115_nokteh(dar api tochikala hast.vali dar api testotmapi nemiferestim va pishfarz IdShobe kerfu ra parsafar dar samte api lahaz mikard. IdShobe marboot be shobe 7 ra behesh dadam)
        IdSabadKharidTitr: IdSabadKharidTitr,//zare_nk_041115_nokteh(dar api tochikala hast chon chand sabad az chand shobe mishe dasht. vali dar api testotmapi IdSabadKharidTitr nadarim chon ye sabad ke bishtar nist)
      }),
      ////zare_nk_041115_added_end
    });
    const data = await response.json();
    if (response.ok) {
      var result = JSON.parse(data.data.list);
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
        if (result.length == 0) {
          setBisatr(true);
          return;
        }
        console.log('041116-3h-result in Api_SelectSabadKharidSatr: ' + JSON.stringify(result));
        setBisatr(false);
        setSabadRows(result); 
        for (var j = 0; j < result.length; j++) {
          fillRefsAndfillForCartTagsInDetails(
            "#sabadItemsContInSafhe",
            result[j],   
            null
          );
        }
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
  ////zare_nk_041115_added_end

  useEffect(() => {
    if (isOpenedProdDetModal == true) {
      return;
    }
    async function tempFuncForAsync() { 
      const token = getCookie("token");
      if (token == null) {
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
        return;
      } else {

        let ApiUrl = "https://api.tochikala.com/api/";
        var urlSelectSabadTitr = ApiUrl + "User/Api_SelectSabadKharidTitr";

        const response = await fetch(urlSelectSabadTitr, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            IdShobeh: 7,
          }),
        });
        const data = await response.json();
        if (response.ok) { 
          var majmooeKharidMasraf = 0;
          var soodAzKharid = 0;
          var Kerayeh = 0;
          var MablaghNahaee = 0;
          var KafKharid = 0;
          var IdSabadKharidTitr = 0;  
          var result = JSON.parse(data.data.list);
          console.log('result22: ' + JSON.stringify(result))
          if (data.status != 0) {
            console.log('data.status: ' + data.status)
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
            console.log('data.status1 =------= 0')
            if (result.length == 0) {
              console.log('result.length == 0: ' + result.length)
              return;
            }
            console.log('data.status2 =------= 0')
            setSabadTitr(result);   
            IdSabadKharidTitr = result[0].IdSabadKharidTitr;
            majmooeKharidMasraf = result[0].SumFeeMasraf;
            soodAzKharid = result[0].Sood;
            Kerayeh = result[0].HazineErsal;
            MablaghNahaee = result[0].MablaghNahaee;
            KafKharid = result[0].KafKharid;

            setJamKol(majmooeKharidMasraf);
            setJamKolTakhfif(soodAzKharid);
            setJamKolNahaei(MablaghNahaee);  
            console.log('majmooeKharidMasraf: ' + majmooeKharidMasraf + '-soodAzKharid: ' + soodAzKharid + '-MablaghNahaee: ' + MablaghNahaee);
            getSabadItems(IdSabadKharidTitr, token);
          }
        } else {
          console.log('!!response.ok')
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
  }, [addOrRemChanged]);

  async function addDetectedToCart(BarcodeKala: string) {
    const token = getCookie("token");
    if (token == null) {
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

    ////zare_nk_041115_commented_st
    // // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
    // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
    // var urlApi_SelectShobehJashnvareh = ApiUrl + "Api_SelectKala";
    ////zare_nk_041115_commented_end
    ////zare_nk_041115_added_st
    let ApiUrl = "https://api.tochikala.com/api/";
    var urlApi_SelectShobehJashnvareh = ApiUrl + "User/Api_SelectKalaShobeh";
    ////zare_nk_041115_added_end

    const response = await fetch(urlApi_SelectShobehJashnvareh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        BarcodeKala: BarcodeKala,
        IdShobeh: 7,   //zare_nk_041115_added 
        // IdKala: 1111 //zare_nk_041115_nokteh(api Api_SelectKalaShobeh ham BarcodeKala ro voroodi migireh ham IdKala ro.ma alan chon dar 
        //// barkode kala hanooz kala va keshi nashodeh va IdKala nadarim pas hamoon BarcodeKala ro miferestim va IdKala ro comment mikonim,meghdare 1111 ha soori neveshtam)
      }),
      // credentials: "include", //zare_nk_040402_commented
    });
    if (response.ok) {
      const data = await response.json();
      var result = data;
      if (result.status != 0) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .modal-body span"
        );
        if (span instanceof HTMLElement) {
          span.innerText = result.errors[0];
        }
      } else if (result.status == 0) {
        if (result.data.list == undefined) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText =
              result.message.length == 0
                ? "ارتباط با سرور برقرار نشد"
                : result.message;
          }
          return;
        }
        var parsedList = JSON.parse(result.data.list);
        console.log('parsedList is: ' + JSON.stringify(parsedList));
        console.log('BarcodeKala is: ' + parsedList[0].BarcodeKala + '-BarcodeKala: ' + BarcodeKala)
        if (parsedList.length == 0) {
          const productNotExist = document.getElementById("productNotExist");
          if (productNotExist) {
            productNotExist.style.display = "flex";
          }
          return;
        }
        const productNotExist = document.getElementById("productNotExist");
        if (productNotExist) {
          productNotExist.style.display = "none";
        }
        handlerForAddClick(parsedList[0], null);
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

  async function ManualInputBarcode(
    event: React.KeyboardEvent<HTMLInputElement>
  ) { 
    const inputElement = event.target as HTMLInputElement;
    const tagVal = inputElement.value;
    if (
      event.key === "Enter" && // مدرن‌تر و درست‌تر از keyCode
      tagVal.trim().length && 
      inputElement.classList.contains("valid")
    ) {
      let text = parseFloat(tagVal);
      const modalElement = document.getElementById("seePricesModal");
      if (modalElement) {
        const bootstrap = await getBootstrap();
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      addDetectedToCart(text.toString());
    }
  }

  const seePrices = () => {
    setIsOpenedProdDetModal(false); //zare_nk_040325_nokteh(shayad niaziam nabood!chon baste beshe modalDet setIsOpenedProdDetModal(false) seda zadeh mishe!!)
    setIsOpenedSeePricesModal(true);
    setAddOrRemChanged(null);
  };

  async function addToCartInIndex(
    SabadRow: SabadRowType | DetailsRow,
    father: any,
    bishAzMaxTedadYaMojoodi: number, 
    event?: MouseEvent<HTMLAnchorElement> | null | undefined 
  ) {
    var currentRow: any = null;
    console.log('041117-addToCartInIndex called!-sabadRows: ' + JSON.stringify(sabadRows));
    console.log('041117-addToCartInIndex called!-SabadRow: ' + JSON.stringify(SabadRow));  
    sabadRows?.map((item, index) => {
      if (item.BarcodeKala == SabadRow.BarcodeKala) {
        alert('eshgh ast-item.tedad: ' + item.Tedad + '-SabadRow.TedadDarSabad: ' + SabadRow.TedadDarSabad);
        currentRow = item
      }
    }) 

    if (event != null) {
      event.stopPropagation();
    }
    const token = getCookie("token");
    if (token == null) {
      return;
    } else {
      console.log('addToCartInIndex-else 1');
      let IdKala: string | null = null;   
      if (event != null) {
        event.preventDefault();
        ////zare_nk_041116_added_st
        const eventCurrentTargetTag = event?.currentTarget as HTMLElement;
        if (eventCurrentTargetTag.classList.contains("updateTedad")) {
          IdKala = eventCurrentTargetTag.id.substring(12);
        } else {
          IdKala = eventCurrentTargetTag.className.substring(4);
        }
        // console.log('041116-002-IdKala: ' + IdKala + '-currentRow.IdKala: ' + currentRow.IdKala + '-BarcodeKala: ' + BarcodeKala);
        console.log('addToCartInIndex-else 3 IdKala: ' + IdKala);
        ////zare_nk_041116_added_end
      }
      else {
        IdKala = SabadRow.IdKala.toString();
        currentRow = SabadRow;
      }
      ////zare_nk_041116_commented_end  
      var TedadOut = 0;
      var TedadOuttoAjax = 0;
      if (currentRow == null) { 
        return;
      }
      const tedad = currentRow.Tedad ? currentRow.Tedad : currentRow.TedadDarSabad;  //zare_nk_041117_added
      // const tedad = parseFloat(String(currentRow.Tedad ?? 0));  //zare_nk_041117_commented
      const zarib = parseFloat(String(currentRow.ZaribForoosh ?? 0));
      TedadOut = tedad + zarib;
      TedadOuttoAjax = parseFloat(currentRow.ZaribForoosh);
      const token = getCookie("token");
      console.log('addToCartInIndex-tedad: ' + tedad + '-zarib: ' + zarib + '-TedadOut: ' + TedadOut);
      ////zare_nk_041114_commented_st
      // // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
      // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
      // var urlInsertToSabad = ApiUrl + "Api_InsertToSabad";
      // const response = await fetch(urlInsertToSabad, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + token,
      //   },
      //   body: JSON.stringify({
      //     BarcodeKala: BarcodeKala,
      //     Tedad: TedadOuttoAjax,
      //   }), 
      // });
      ////zare_nk_041114_commented_end
      ////zare_nk_041114_added_st 
      let ApiUrl = "https://api.tochikala.com/api/";
      var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
      const response = await fetch(urlInsertToSabad, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          BarcodeKala: SabadRow.BarcodeKala,
          Tedad: TedadOut,// TedadOuttoAjax,  //zare_nk_041115_nokteh(dar api testotmapi az TedadOuttoAjax estefadeh mishod vali dar api tochikala az TedadOut estefadeh mikonim)
          IdKala: IdKala,//currentRow.IdKala,  //zare_nk_041114_added(zare_nk_041116_updated(currentRow.IdKala to IdKala, chon currentRow alan satre akhar eshare mikoneh na satri ke vaghean add ya remove zadeh shod!!))

          IdShobeh: 7,  //zare_nk_041114_added
          IdAddress: 23990  //zare_nk_041114_added
        }),
      });
      ////zare_nk_041114_added_end
      const data = await response.json();
      if (response.ok) {
        console.log('addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
        setAddOrRemChanged(SabadRow.BarcodeKala + "-" + TedadOut);
        var result = data;
        if (result.status != 0) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText = result.errors[0];
          }
        } else if (result.status == 0) {
          var hadaksar = "";
          if (TedadOut == 0) {
            refForfather.current = father;

            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow.IdKala;
                return {
                  IdKala: currentRow.IdKala,
                  ForCartContentsDesignType: 0,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow.NameKala,
                  DarsadTakhfif: currentRow.DarsadTakhfif,
                  NameBerand: currentRow.NameBerand, //zare_nk_040602_added
                  FeeForoosh: currentRow.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: currentRow.FeeMasraf, //zare_nk_040602_added
                  BarcodeKala: currentRow.BarcodeKala, //zare_nk_041116_added
                };
              });
            }
          } else if (TedadOut > currentRow.ZaribForoosh) {
            refForfather.current = father;

            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow.IdKala;
                // return SabadRow
                return {
                  IdKala: currentRow.IdKala,
                  ForCartContentsDesignType: 2,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow.NameKala,
                  DarsadTakhfif: currentRow.DarsadTakhfif,
                  NameBerand: currentRow.NameBerand, //zare_nk_040602_added
                  FeeForoosh: currentRow.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: currentRow.FeeMasraf, //zare_nk_040602_added
                  BarcodeKala: currentRow.BarcodeKala, //zare_nk_041116_added
                };
              });
            }
          } else if (TedadOut == currentRow.ZaribForoosh) {
            refForfather.current = father;

            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow.IdKala;
                // return SabadRow
                return {
                  IdKala: currentRow.IdKala,
                  ForCartContentsDesignType: 1,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow.NameKala,
                  DarsadTakhfif: currentRow.DarsadTakhfif,
                  NameBerand: currentRow.NameBerand, //zare_nk_040602_added
                  FeeForoosh: currentRow.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: currentRow.FeeMasraf, //zare_nk_040602_added
                  BarcodeKala: currentRow.BarcodeKala, //zare_nk_041116_added
                };
              });
            }
          }
        }
      } else {
        console.log('addToCartInIndex-else 6 IdKala !!!!response.ok');
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

  async function remveFromCartInIndex(
    father: any,
    Tedad: number | null | undefined,
    bishAzMaxTedadYaMojoodi: number,
    // currentRow: any,  //zare_nk_041116_moshkeldar(hamishe satre akhar ro mideh chon az refForParsedList.current meghdar migireh ke dar halgheye akhar meghdare akhari ra dar sabadsatr gereft!)
    BarcodeKala: string | null,
    // event?: MouseEvent<HTMLElement> | null | undefined //zare_nk_040525 commented)
    event?: MouseEvent<HTMLAnchorElement> | null | undefined //zare_nk_040525_added
  ) {
    var currentRow: any = null;;
    ////zare_nk_041116_added_st
    sabadRows?.map((item, index) => {
      if (item.BarcodeKala == BarcodeKala) {
        // alert('eshgh ast');
        currentRow = item
      }
    })
    ////zare_nk_041116_added_end
    if (event != null) {
      event.stopPropagation();
    }
    const token = getCookie("token");
    if (token == null) {
      return;
    } else {
      console.log('041116-001');
      let IdKala: string | null = null;
      if (!event) {
        return;
      }
      event.preventDefault();
      const eventCurrentTargetTag = event.currentTarget as HTMLElement;
      if (eventCurrentTargetTag.classList.contains("updateTedad")) {
        IdKala = eventCurrentTargetTag.id.substring(12);
      } else {
        IdKala = eventCurrentTargetTag.className.substring(4);
      }
      console.log('041116-002-IdKala: ' + IdKala + '-currentRow.IdKala: ' + currentRow.IdKala + '-BarcodeKala: ' + BarcodeKala);
      var TedadOut = 0;
      var TedadOuttoAjax = 0;
      const tedad = parseFloat(String(Tedad ?? 0));
      const zarib = parseFloat(String(currentRow.ZaribForoosh ?? 0));
      TedadOut = tedad - zarib;
      console.log('041116-002-tedad: ' + tedad + '-zarib: ' + zarib + '-TedadOut: ' + TedadOut + '-BarcodeKala : ' + BarcodeKala);
      console.log('041116-002-currentRow: ' + JSON.stringify(currentRow));
      TedadOuttoAjax = -parseFloat(currentRow.ZaribForoosh);
      ////zare_nk_041114_commented_st
      // // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
      // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
      // var urlInsertToSabad = ApiUrl + "Api_InsertToSabad";
      // const response = await fetch(urlInsertToSabad, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + token,
      //   },
      //   body: JSON.stringify({
      //     BarcodeKala: BarcodeKala,
      //     Tedad: TedadOuttoAjax,
      //   }),
      //   // credentials: "include", //zare_nk_040402_commented
      // });
      ////zare_nk_041114_commented_end
      ////zare_nk_041114_added_st 
      let ApiUrl = "https://api.tochikala.com/api/";
      var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
      const response = await fetch(urlInsertToSabad, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          BarcodeKala: BarcodeKala,
          Tedad: TedadOut,// TedadOuttoAjax,  //zare_nk_041115_nokteh(dar api testotmapi az TedadOuttoAjax estefadeh mishod vali dar api tochikala az TedadOut estefadeh mikonim)
          IdKala: IdKala,//currentRow.IdKala,  //zare_nk_041114_added(zare_nk_041116_updated(currentRow.IdKala to IdKala, chon currentRow alan satre akhar eshare mikoneh na satri ke vaghean add ya remove zadeh shod!!))
          IdShobeh: 7,  //zare_nk_041114_added
          IdAddress: 23990  //zare_nk_041114_added
        }),
      });
      ////zare_nk_041114_added_end
      const data = await response.json();
      if (response.ok) {
        var result = data;
        console.log('041116-remveFromCartInIndex-result: ' + JSON.stringify(result));
        console.log('041116-remveFromCartInIndex-currentRow: ' + JSON.stringify(currentRow));
        if (result.status == -1000) {
          const inputGroup = document.querySelector(
            ".ForCart-" + IdKala + " .input-group"
          );
          if (inputGroup) {
            let parent = inputGroup.closest(".flxpedar2_new");
            if (parent) {
              parent.remove();
            }
          }
          var hisFather = null;
          const hisFatherTag = eventCurrentTargetTag.closest(".gfForAddRemm");
          if (hisFatherTag) {
            hisFather = hisFatherTag.id;
          }
          refForfather.current = father;

          if (isOpenedProdDetModal) {
            setForCartContInProdDetVal(() => {
              const idTag = "ForCart-" + currentRow!.IdKala;
              // return currentRow
              return {
                IdKala: currentRow!.IdKala,

                // tedadOutForForCartContent: 0,
                ForCartContentsDesignType: 0,

                TedadOut: TedadOut,
                hadaksar: "",
                idTag: idTag,
                NameKala: currentRow!.NameKala,
                DarsadTakhfif: currentRow!.DarsadTakhfif,
                NameBerand: currentRow!.NameBerand,
                FeeForoosh: currentRow!.FeeForoosh,
                FeeMasraf: currentRow!.FeeMasraf,
                BarcodeKala: currentRow!.BarcodeKala,
              };
            });
          }
          const bootstrap = await getBootstrap();
          const adameSabteNahaeiModal = new bootstrap.Modal(
            document.getElementById("adameSabteNahaeiModal")
          );
          adameSabteNahaeiModal.show();
          const HoshdarInAdameSabteNahaeiModalTag = document.getElementById(
            "HoshdarInAdameSabteNahaeiModal"
          );
          if (HoshdarInAdameSabteNahaeiModalTag instanceof HTMLElement) {
            HoshdarInAdameSabteNahaeiModalTag.innerText = result.errors[0];
          }
        }
        if (result.status != 0) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText = result.errors[0];
          }
        } else if (result.status == 0) {
          console.log('041116-result.status == 0');
          setAddOrRemChanged(BarcodeKala + "-" + TedadOut);
          var hadaksar = "";
          if (TedadOut == 0) {
            // alert('000000-result: ' + JSON.stringify(JSON.parse(result.data.titr)[0].Mobile ))
            const inputGroup = document.querySelector(
              ".ForCart-" + IdKala + " .input-group"
            );
            if (inputGroup) {
              // alert('inputGroup');
              let parent = inputGroup.closest(".flxpedar2_new");
              if (parent) {
                // alert('parent-'+);
                // parent.remove(); //zare_nk_041116_commented  //zare_nk_041116_tahlilshe(sabad khali she faghat javabe!)
                ////Zare_nk_041116_added_st
                if (JSON.parse(result.data.titr).length == 0) {
                  alert('reeeeem');
                  parent.remove();  //zare_nk_041116_tahlilshe(sabad khali she faghat javabe!)
                }
                ////Zare_nk_041116_added_end
              }
            }
            var hisFather = null;
            const hisFatherTag = event.target;
            if (hisFatherTag instanceof HTMLElement) {
              hisFather = hisFatherTag.closest(".gfForAddRemm");
            }
            refForfather.current = father;
           
            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow!.IdKala;
                // return currentRow
                return {
                  IdKala: currentRow!.IdKala,
                  ForCartContentsDesignType: 0,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow!.NameKala,
                  DarsadTakhfif: currentRow!.DarsadTakhfif,
                  NameBerand: currentRow!.NameBerand,
                  FeeForoosh: currentRow!.FeeForoosh,
                  FeeMasraf: currentRow!.FeeMasraf,
                  BarcodeKala: currentRow!.BarcodeKala,
                };
              });
            }
          } else if (TedadOut > currentRow.ZaribForoosh) {
            refForfather.current = father;
             
            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow!.IdKala;
                // return currentRow
                return {
                  IdKala: currentRow!.IdKala,
                  ForCartContentsDesignType: 2,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow!.NameKala,
                  DarsadTakhfif: currentRow!.DarsadTakhfif,
                  NameBerand: currentRow!.NameBerand,
                  FeeForoosh: currentRow!.FeeForoosh,
                  FeeMasraf: currentRow!.FeeMasraf,
                  BarcodeKala: currentRow!.BarcodeKala,
                };
              });
            }
          } else {
            const htmlTag = event.target as HTMLElement;
            const wrapper = htmlTag.closest(
              ".flxpedar2_new"
            ) as HTMLElement | null;
            if (wrapper) {
              wrapper.style.backgroundColor = "inherit";
            }
            refForfather.current = father;

            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow!.IdKala;
                return {
                  IdKala: currentRow!.IdKala,
                  ForCartContentsDesignType: 1,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow!.NameKala,
                  DarsadTakhfif: currentRow!.DarsadTakhfif,
                  NameBerand: currentRow!.NameBerand,
                  FeeForoosh: currentRow!.FeeForoosh,
                  FeeMasraf: currentRow!.FeeMasraf,
                  BarcodeKala: currentRow!.BarcodeKala,
                };
              });
            }
          }
        }
      } else {
        console.log('041116-!!response.ok');
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

  const handlerForAddClick: (   //zare_nk_041116_tahlilshe
    SabadRow: SabadRowType | DetailsRow,   //zare_nk_041117_dastavard 
    // BarcodeKala: string | null, 
    e: MouseEvent<HTMLAnchorElement> | null | undefined
    // ) => void = (IdKala, TedadOut, addQuota, BarcodeKala, e) => {
  ) => void = (SabadRow, e) => {

    console.log('041117-handlerForAddClick called!-SabadRow: ' + JSON.stringify(SabadRow));
    e && e.stopPropagation();
    addToCartInIndex(
      SabadRow,
      refForfather.current,
      refForBishAzMaxTedadYaMojoodi.current!, 
      e 
    );
  };

  const handlerForRemClick: (
    TedadOut: number | null | undefined,
    BarcodeKala: string | null,
    e?: MouseEvent<HTMLAnchorElement> | null | undefined
  ) => void = (TedadOut, BarcodeKala, e) => {
    remveFromCartInIndex(
      refForfather.current,
      TedadOut,
      refForBishAzMaxTedadYaMojoodi.current!, 
      BarcodeKala,
      e
    );
  };

  function fillRefsAndfillForCartTagsInDetails(
    father: string,
    parsedList: SabadRowType,
    isChange: number | null
  ) { 
    refForfather.current = father;
     var Tedad = parsedList.Tedad ? parsedList.Tedad : parsedList.TedadDarSabad;
    var bishAzMaxTedadYaMojoodi = 0;
    if (parsedList.MaxTedad != null) {
      if (parsedList.MaxTedad <= Tedad) {
        bishAzMaxTedadYaMojoodi = 1;
      }
    } else {
      if (parsedList.Mojoodi <= Tedad) {
        bishAzMaxTedadYaMojoodi = 1;
      }
    }
    refForBishAzMaxTedadYaMojoodi.current = bishAzMaxTedadYaMojoodi;
    const namayesheprodDetModal =
      parsedList.TedadDarSabad != undefined ? true : false;
    if (Tedad == 0 && namayesheprodDetModal) {
      setForCartContInProdDetVal(() => {
        const idTag = "ForCart-" + parsedList.IdKala; 
        return {
          IdKala: parsedList.IdKala,
          ForCartContentsDesignType: 0,
          TedadOut: Tedad,
          hadaksar: "",
          idTag: idTag,
          NameKala: parsedList.NameKala,
          DarsadTakhfif: parsedList.DarsadTakhfif,
          NameBerand: parsedList.NameBerand, 
          FeeForoosh: parsedList.FeeForoosh,  
          FeeMasraf: parsedList.FeeMasraf,  
          BarcodeKala: parsedList.BarcodeKala, 
        };
      });
    } else if (Tedad > parsedList.ZaribForoosh && namayesheprodDetModal) {
      setForCartContInProdDetVal(() => {
        const idTag = "ForCart-" + parsedList.IdKala;
        return {
          IdKala: parsedList.IdKala,
          ForCartContentsDesignType: 2,
          TedadOut: Tedad,
          hadaksar: "",
          idTag: idTag,
          NameKala: parsedList.NameKala,
          DarsadTakhfif: parsedList.DarsadTakhfif,
          NameBerand: parsedList.NameBerand,  
          FeeForoosh: parsedList.FeeForoosh, 
          FeeMasraf: parsedList.FeeMasraf,  
          BarcodeKala: parsedList.BarcodeKala,  
        };
      });
    } else if (namayesheprodDetModal) {
      setForCartContInProdDetVal(() => {
        const idTag = "ForCart-" + parsedList.IdKala; 
        return {
          IdKala: parsedList.IdKala,
          ForCartContentsDesignType: 1,
          TedadOut: Tedad,
          hadaksar: "",
          idTag: idTag,
          NameKala: parsedList.NameKala,
          DarsadTakhfif: parsedList.DarsadTakhfif,
          NameBerand: parsedList.NameBerand,  
          FeeForoosh: parsedList.FeeForoosh,  
          FeeMasraf: parsedList.FeeMasraf, 
          BarcodeKala: parsedList.BarcodeKala, 
        };
      });
    }
  }

  return isOpenedProdDetModal == true ? (
    <div
      className="modal px-0"
      id="prodDetModal"
      style={{ overflow: "hidden" }}
    >
      <div
        className="modal-dialog"
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
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
            height: "fitContent",
            maxHeight: "98vh",
            backgroundColor: "#fcfcfc !important",
          }}
        >
          <div
            className="modal-header"
            style={{ border: "none", padding: "16px 16px 5px 16px" }}
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
                className="spanCont"
                style={{
                  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                  fontSize: "18px",
                }}
              >
                <span>جزئیات محصول</span>
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
            style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
          >
            <div
              className="inModalBody"
              style={{ display: "flex", flexFlow: "column", height: "100%" }}
            >
              <div
                className="scrollContInModal"
                id="prodDetCont"
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  flexFlow: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  id="productExist"
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <div
                    id="DetailsPageCont"
                    style={{
                      marginTop: "10px",
                      overflow: "hidden",
                      width: "100%",
                      paddingTop: "5px",
                      height: "fit-content",
                    }}
                  >
                    <div
                      id="groupsInDetailsPageCont"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        alignItems: "center",
                        fontSize: "14px",
                        margin: "0px 10px 10px 0px",
                      }}
                    ></div>

                    <div
                      id="DetailsImgAndInfoCont"
                      style={{
                        paddingLeft: "3px",
                        paddingRight: "3px",
                        paddingBottom: "3px",
                      }}
                    >
                      <div
                        id="ImgAndSwiperCont"
                        style={{ marginBottom: "7px", width: "100%" }}
                      >
                        <div
                          id="ImageColectionInDetails"
                          className="swiper"
                          style={{
                            marginLeft: "10px",
                            padding: "7px",
                            borderRadius: "10px",
                            border: "none",
                            boxShadow: "0px 0px 3px 0px silver",
                            marginRight: "0px",
                          }}
                        >
                          <div className="swiper-wrapper"></div>
                          <div className="swiper-pagination"></div>
                          <div className="swiper-scrollbar"></div>
                        </div>
                        <div
                          id="CurrentImgCont"
                          style={{
                            padding: "15px 0px",
                            overflow: "hidden",
                            borderRadius: "15px 15px 0px 0px",
                            position: "relative",
                            border: "none",
                            boxShadow: "0px 0px 3px 0px silver",
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: "white",
                          }}
                        >
                          <div
                            id="heartContInDetails"
                            style={{
                              display: "none",
                              zIndex: "898",
                              cursor: "pointer",
                              position: "absolute",
                              top: "7px",
                              right: "7px",
                              fontSize: "100%",
                              opacity: "0.7",
                              backgroundColor: "inherit",
                            }}
                          >
                            <img
                              id="heartImgInDetails"
                              style={{ width: "32px" }}
                              src="https://img.tochikala.com/icon/heart/heart01(0).svg"
                              alt="علاقه&zwnj;مندی&zwnj;ها"
                            />
                          </div>
                          {ForCartContInProdDetVal != null && (
                            <img
                              loading="lazy"
                              id="CurrentImg"
                              ////zare_nk_040522_commented_st
                              style={{ height: "fit-content" }}
                              src={`https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp`}
                              alt={ForCartContInProdDetVal.NameKala ?? ""}
                            ////zare_nk_040522_commented_end
                            />
                          )}
                        </div>
                      </div>

                      <div
                        id="DetailsInfoCont"
                        className="hisGrandFather WantCompress"
                        style={{
                          justifyContent: "space-between",
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "0px 0px 15px 15px",
                          boxShadow: "0px 0px 3px 0px silver",
                        }}
                      >
                        <div
                          id="titleAndGeoupInDetailsInfoCont"
                          style={{
                            display: "flex",
                            flexFlow: "column",
                            width: "100%",
                          }}
                        >
                          {ForCartContInProdDetVal != null && (
                            <h1
                              id="nameKalaInDetailsInfoCont"
                              style={{
                                fontSize: "16px",
                                marginBottom: "30px",
                                fontFamily: "IRANSansWeb_Medium(adad_fa)",
                                lineHeight: "2.0",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                lineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                textAlign: "right",
                              }}
                            >
                              {/* zare_nk_040522_commented_st */}
                              {ForCartContInProdDetVal.NameKala} wwwww
                              {/* zare_nk_040522_commented_end */}
                            </h1>
                          )}

                          <div style={{ display: "flex", flexFlow: "row" }}>

                            <div
                              style={{
                                flex: "1 1 30%",
                                display: "flex",
                                flexFlow: "column",
                                paddingLeft: "5px",
                                alignItems: "center",
                                color: "#322E2E",
                                justifyContent: "space-around",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                                  color: "#888888",
                                }}
                              >
                                <span>برند</span>
                              </div>
                              <div
                                style={{
                                  flex: "0 0 auto",
                                  display: "flex",
                                  flexFlow: "row",
                                  paddingLeft: "5px",
                                  alignItems: "center",
                                }}
                              >
                                {ForCartContInProdDetVal != null && (
                                  <span id="nameBerandInDetailsInfoCont">
                                    {ForCartContInProdDetVal.NameBerand}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "row",
                                alignContent: "center",
                                alignItems: "center",
                                padding: "0px 8px 0px 8px",
                              }}
                            >
                              <div
                                style={{
                                  width: "0px",
                                  height: "30px",
                                  borderLeft: "2px solid silver",
                                }}
                              ></div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "column",
                                flex: "1 1 30%",
                                alignItems: "center",
                                justifyContent: "space-around",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  marginBottom: "10px",
                                }}
                              >
                                {ForCartContInProdDetVal != null &&
                                  ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                    <div
                                      id="gheimatMasrafInDetailsInfoCont"
                                      className="gheimatMasrafInsabad"
                                      style={{
                                        display: "none",
                                        flexFlow: "row",
                                        justifyContent: "end",
                                        textDecoration: "line-through",
                                        fontSize: "14px",
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* {ForCartContInProdDetVal != null && ( */}
                                      <span>
                                        {ForCartContInProdDetVal.FeeMasraf}
                                      </span>
                                      {/* )} */}
                                    </div>
                                  )}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  height: "35px",
                                  alignContent: "center",
                                  fontSize: "24px",
                                }}
                              >
                                <div
                                  id="gheimatForooshInDetailsInfoCont"
                                  className="gheimatForooshInsabad"
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    marginLeft: "5px",
                                    alignItems: "center",
                                    fontSize: "16px",
                                  }}
                                >
                                  {ForCartContInProdDetVal != null && (
                                    <span>
                                      {ForCartContInProdDetVal.FeeForoosh}
                                    </span>
                                  )}
                                </div>
                                <div
                                  className="rialInsabad  valueStyle"
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    alignItems: "center",
                                    fontSize: "14px",
                                  }}
                                >
                                  ریال
                                </div>
                              </div>
                            </div>

                            {ForCartContInProdDetVal != null &&
                              ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                <div
                                  id="lastDividerInDetails"
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    padding: "0px 8px 0px 8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "0px",
                                      height: "30px",
                                      borderLeft: "2px solid silver",
                                    }}
                                  ></div>
                                </div>
                              )}
                            {ForCartContInProdDetVal != null &&
                              ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                <div
                                  id="DiscountContInDetails"
                                  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    flex: "1 1 30%",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexFlow: "row",
                                      marginBottom: "10px",
                                      width: "100%",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      id="darsadTakhfifInDetails"
                                      className="darsadTakhfifInDetails"
                                      style={{
                                        backgroundColor: "red",
                                        flex: "0 0 auto",
                                        display: "none",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginLeft: "15px",
                                        borderRadius: "15px",
                                        width: "100%",
                                        maxWidth: "70px",
                                        height: "50px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "white",
                                          opacity: "1",
                                          fontSize: "18px",
                                        }}
                                      >
                                        %
                                      </span>

                                      {/* {ForCartContInProdDetVal != null && ( */}
                                      <span
                                        id="forDiscountInDetails"
                                        className="forDiscount"
                                        style={{
                                          color: "white",
                                          opacity: "1",
                                          fontSize: "18px",
                                        }}
                                      >
                                        {ForCartContInProdDetVal.DarsadTakhfif}
                                      </span>
                                      {/* )} */}
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                        <div
                          id="CartAndPriceInDetailsInfoCont"
                          style={{
                            display: "flex",
                            flexFlow: "column",
                            width: "100%",
                            marginTop: "10px",
                            paddingRight: "20px",
                          }}
                        >
                          <div
                            id="InCartAndPriceInDetailsInfoCont"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              id="ForCartContInProdDet"
                              style={{
                                display: "flex",
                                flexFlow: "column",
                                justifyContent: "end",
                              }}
                            >
                              {ForCartContInProdDetVal != null && (

                                <MiddleCountTedadSefr
                                  refForMiddleCount={refForMiddleCount}
                                  refForfather={refForfather}
                                  // refForParsedList={refForParsedList}
                                  handlerForAddClick={(e) => {
                                    return handlerForAddClick(
                                      //   ForCartContInProdDetVal.IdKala
                                      //    ,
                                      // ForCartContInProdDetVal
                                      //   ? ForCartContInProdDetVal.TedadOut
                                      //   : null,
                                      // 0,
                                      // ForCartContInProdDetVal.BarcodeKala,
                                      ForCartContInProdDetVal,
                                      e
                                    );
                                  }}
                                  handlerForRemClick={(e) => {
                                    return handlerForRemClick(
                                      ForCartContInProdDetVal
                                        ? ForCartContInProdDetVal.TedadOut
                                        : null,
                                      ForCartContInProdDetVal.BarcodeKala,
                                      e
                                    );
                                  }}
                                  refForInputGroup={refForInputGroup}
                                  ForCartContentsDesignType={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any)
                                        .ForCartContentsDesignType
                                      : null
                                  }
                                  tedad={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any)
                                        .TedadOut
                                      : null
                                  }
                                  idTag={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any).idTag
                                      : null
                                  }
                                  IdKala={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any).IdKala
                                      : null
                                  }
                                  isOpenedProdDetModal={isOpenedProdDetModal}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="imgzoomed"></div>
                    </div>
                    <div
                      id="navContInDetCont"
                      style={{
                        display: "none",
                        flexFlow: "column",
                        borderBottom: "1px solid #E7E7E0",
                        padding: "0px 0px 0px 0px",
                      }}
                    >
                      <div className="navContInDet">
                        <ul className="nav nav-tabs" role="tablist">
                          <li
                            className="nav-item"
                            style={{ borderBottom: "2px solid red" }}
                          >
                            <a
                              className="nav-link active"
                              data-bs-toggle="tab"
                              href="#home"
                              style={{ color: "inherit" }}
                            >
                              ویژگی کالا
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#menu1"
                              style={{ color: "inherit" }}
                            >
                              جزئیات کالا
                            </a>
                          </li>
                          <li className="nav-item" style={{ display: "none" }}>
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#menu2"
                              style={{ color: "inherit" }}
                            >
                              Menu 2
                            </a>
                          </li>
                        </ul>
                        <div
                          className="tab-content"
                          style={{ color: "#545454" }}
                        >
                          <div id="home" className="containerr tab-pane active">
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "row",
                                justifyContent: "center",
                                justifyItems: "center",
                                alignContent: "center",
                                padding: "10px 0px",
                              }}
                            >
                              <p style={{ margin: "0px" }}>
                                ویژگی برای این محصول وجود ندارد
                              </p>
                            </div>
                          </div>
                          <div id="menu1" className="containerr tab-pane fade">
                            <div
                              id="ProductDescription"
                              style={{
                                marginTop: "15px",
                                flexFlow: "column",
                                position: "relative",
                                paddingBottom: "48px",
                              }}
                            >
                              <div
                                id="contentContInProdDes"
                                style={{
                                  marginBottom: "10px",
                                  display: "flex",
                                  flexFlow: "column",
                                  maxHeight: "120px",
                                  overflow: "hidden",
                                }}
                              ></div>
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "column",
                                  position: "absolute",
                                  right: "10px",
                                  bottom: "10px",
                                }}
                              >
                                <a
                                  id="bishtarInProdDes"
                                  className="buttonHover"
                                  href="#ProductDescription"
                                  style={{
                                    padding: "10px",
                                    borderRadius: "7px",
                                    display: "flex",
                                    flexFlow: "row",
                                    textDecoration: "none",
                                    color: "rgb(2, 160, 164)",
                                    backgroundColor: "inherit",
                                  }}
                                >
                                  <div
                                    style={{
                                      flex: "0 0 auto",
                                      display: "flex",
                                      flexFlow: "row",
                                      paddingLeft: "5px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span id="TextInBishtarInProdDes">
                                      نمایش بیشتر{" "}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexFlow: "column",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      className="rounded-pill"
                                      style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        backgroundColor: "inherit",
                                      }}
                                    >
                                      <img
                                        src="https://img.tochikala.com/tochikala/left-arrow.svg"
                                        style={{ width: "15px" }}
                                        alt="نمایش بیشتر"
                                      />
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div id="menu2" className="containerr tab-pane fade">
                            salam menu2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="productNotExist"
                  style={{
                    height: "100%",
                    display: "none",
                    justifyContent: "center",
                    marginBottom: "30px",
                    color: "red",
                    fontFamily: "IRANSansWeb_Medium(adad_fa)",
                  }}
                >
                  کالای مورد نظر یافت نشد
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : isOpenedSeePricesModal == true ? (
    <div
      className="modal px-0"
      id="seePricesModal"
      style={{ overflow: "hidden" }}
    >
      <div
        className="modal-dialog"
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
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
                flexFlow: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              <div
                className="spanCont"
                style={{
                  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                  fontSize: "18px",
                }}
              >
                <span className="valueStyle">اسکن بارکد</span>
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
              style={{ display: "flex", flexFlow: "column", height: "100%" }}
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
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <video
                    id="videoForzxing"
                    style={{
                      width: "640px",
                      maxWidth: "100%",
                      borderRadius: "10px",
                    }}
                  ></video>
                </div>

                <div
                  className="contAndHoshdarCont"
                  style={{
                    flex: "1 1 auto",
                    display: "flex",
                    flexFlow: "column",
                  }}
                >
                  <div
                    id="productNotExist"
                    style={{
                      height: "100%",
                      display: "none",
                      justifyContent: "center",
                      marginBottom: "30px",
                      color: "red",
                      fontFamily: "IRANSansWeb_Medium(adad_fa)",
                    }}
                  >
                    کالای مورد نظر یافت نشد
                  </div>

                  <div
                    className="cont"
                    style={{
                      position: "relative",
                      width: "100%",
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "center",
                      justifyItems: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="labelcreator absol"
                      style={{ flex: "0 0 auto" }}
                    >
                      <span className="valueStyle" style={{ width: "100%" }}>
                        بارکد دستی
                      </span>
                    </div>
                    <div style={{ flex: "1 1 auto" }}>
                      <input
                        className="textcreator form-control MatnInput valid" //zare_nk_040304(valid ra pack konam)
                        style={{ width: "100%" }}
                        id="manualInputBarcode"
                        name="manualInputBarcode"
                        type="text"
                        onKeyDown={(event) => {
                          return ManualInputBarcode(event);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <span
                      className="forError forErrorFormanualBarcode"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "row",
                        fontSize: "14px",
                        color: "red",
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
  ) : (
    <div
      id="sabadSafhe"
      style={{ width: "100%", overflow: "hidden", display: "flex" }}
    >
      <div
        className="list-groupp"
        id="listGroupAccordionInSafhe"
        style={{
          marginTop: "5px",
          paddingTop: "5px",
          direction: "rtl",
          position: "relative",
          display: "flex",
          width: "100%",
        }}
      >
        <div
          id="sabadHeaderAndItemsCont"
          className="sabadHeaderAndItems"
          style={{
            flex: "1 1 auto",
            border: "2px solid #F0F0F0",
            borderRadius: "10px",
            padding: "7px",
            backgroundColor: "white",
          }}
        >
          <div
            className="sabadHeader"
            id="sabadSafheHeader-FORTITR"
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "start",
                fontSize: "14px",
                color: "#322E2E",
                paddingRight: "5px",
              }}
            >
              <span id="adToSabadWidthBarCodeScan">
                <button
                  className="BarCodeScan btn btn-danger"
                  style={{ borderRadius: "10px" }}
                  onClick={seePrices}
                >
                  اضافه به سبد
                </button>
              </span>
            </div>
          </div>

          <div
            className="usersSabad"
            style={{ padding: "0px 5px", flexFlow: "column" }}
          >
            {" "}
          </div>

          <div
            className="addressKharejInSabadCont"
            style={{ display: "none", flexFlow: "row" }}
          >
            <span style={{ color: "red" }} className="addressKharejInSabad">
              شما خارج از محدوده ارسال هستید
            </span>
          </div>

          <div
            className="StoresTitleCont"
            id="sabadSafheHeader"
            style={{ flexFlow: "column" }}
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
                    padding: "10px",
                  }}
                >
                  <img
                    style={{ width: "64px", borderRadius: "12px" }}
                    src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
                    alt="هایپر‌کرفو"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    flexFlow: "row",
                  }}
                >
                  <span className="nameShobe titleStyle">هاپر کرفو</span>
                </div>
              </div>
            </div>
          </div>

          <div
            id="sabadItemsContInSafhe"
            className="sabadItemsCont hisGrandFather"
            style={{ flexFlow: "column", padding: "0px 5px" }}
          >
            {!bisatr && (
              <>
                {sabadRows?.map((item, index) => {
                  const idTag = "ForCart-" + item.IdKala;

                  // let tedadOutForForCartContent = 0;
                  let ForCartContentsDesignType = 0;

                  const Tedad = item.Tedad;

                  if (Tedad == 0) {
                    // tedadOutForForCartContent = 0;
                    ForCartContentsDesignType = 0;
                  } else if (Tedad > item.ZaribForoosh) {
                    // tedadOutForForCartContent = 2;
                    ForCartContentsDesignType = 2;
                  } else if (Tedad == item.ZaribForoosh) {
                    // tedadOutForForCartContent = 1;
                    ForCartContentsDesignType = 1;
                  }

                  return (
                    <SabadSatrComponent
                      key={index || item.IdKala}
                      SabadRow={item}
                      IdKala={item.IdKala}
                      NameKala={item.NameKala}
                      j={index}
                      DarsadTakhfif={item.DarsadTakhfif}
                      FeeForoosh={item.FeeForoosh}
                      // refForMiddleCountTedadSefr={refForMiddleCountTedadSefr}
                      refForMiddleCount={refForMiddleCount}
                      refForfather={refForfather}
                      // refForParsedList={refForParsedList}
                      // refForInputGroupTedadSefr={refForInputGroupTedadSefr}
                      refForInputGroup={refForInputGroup}
                      MasrafSatr={item.MasrafSatr}
                      handlerForAddClick={handlerForAddClick}
                      handlerForRemClick={handlerForRemClick}
                      openprodDetModal={openprodDetModal}
                      // tedadOutForForCartContent={tedadOutForForCartContent}
                      ForCartContentsDesignType={ForCartContentsDesignType}
                      tedad={item.Tedad}
                      idTag={idTag}
                      BarcodeKala={item.BarcodeKala}
                      isOpenedProdDetModal={isOpenedProdDetModal}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div
          className="FtCollapsi"
          id="footerInSabadSafhe"
          style={{
            flex: "0 1 30%",
            display: "flex",
            flexFlow: "column",
            border: "1px solid #F0F0F0",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <div
            className="footerInSabadContent"
            id="footerInSabadSafheContent"
            style={{
              padding: "10px",
              flexFlow: "column",
              borderRadius: "10px",
            }}
          >
            <div
              className="footerInSabadContent"
              id="footerInSabadSafheContent"
              style={{
                padding: "10px",
                flexFlow: "column",
                borderRadius: "10px",
              }}
            >
              <div
                className="footerCalc"
                style={{
                  display: "flex",
                  flexFlow: "column",
                  paddingBottom: "10px",
                }}
              >
                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "none",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  <span id="jamKolSpan">جمع کل:</span>{" "}
                  <span id="kolGheymatInSabad">{jamKol}</span>
                </div>
                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "none",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  <span>هزینه ارسال:</span>
                  <span id="hazinePostInSabad">۰</span>
                </div>

                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "15px",
                    color: "#B80000",
                  }}
                >
                  <span className="titleStyle">سود شما از خرید: </span>
                  <span className="valueStyle" id="soodKolInSabad">
                    {jamKolTakhfif ? jamKolTakhfif.toLocaleString() : 0}
                  </span>
                </div>

                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "15px",
                    color: "#B80000",
                  }}
                >
                  <span className="titleStyle">مبلغ قابل پرداخت:</span>
                  <span className="valueStyle" id="ghabelePardakhtInSabad">
                    {jamKol ? jamKol.toLocaleString() : 0}
                  </span>
                </div>
              </div>

              <div style={{ paddingTop: "10px" }}>
                <button
                  className="btn btn-success"
                  style={{ width: "100%", borderRadius: "10px" }}
                // onClick={(e) => payForSabad(e)}   //zare_nk_040411_commented(felan dar tochi ghasde pardakht dar app nadarim)
                >
                  پرداخت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
