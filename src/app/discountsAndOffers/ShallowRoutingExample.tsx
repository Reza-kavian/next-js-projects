"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

//// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";    //zare_nk_040417_commented
let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_040417_added

//// import Modal from "bootstrap/js/dist/modal";   //age faghat in ra begzaram va kolle bootstarp ra import nakonam kami be sabok boodane barname komak mishe,vali dar terminal errore <<document is not defined>> mideh ke badan tahlilesh mikonam
// import { BrowserMultiFormatReader } from "@zxing/browser";   //zare_nk_040417_commented
// import { NotFoundException } from "@zxing/library";  //zare_nk_040417_commented
import "@/styles/DiscountsAndOffersCss.css";

async function getBootstrap() {
  if (!cachedBootstrap) {
    cachedBootstrap = await import("bootstrap");
  }
  return cachedBootstrap;
}

import { RefObject } from "react";
import { MouseEvent } from "react";

type MiddleCountTedadSefrProps = {
  refForMiddleCount: RefObject<HTMLInputElement | null>;
  handlerForAddClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  handlerForRemClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  refForInputGroup: RefObject<HTMLInputElement | null>;
  ForCartContentsDesignType: number;
  tedad: any;
  idTag: string | number;
  IdKala: string | number;
};

export function MiddleCountTedadSefr({
  refForMiddleCount,
  handlerForAddClick,
  handlerForRemClick,
  refForInputGroup,
  ForCartContentsDesignType,
  tedad,
  idTag,
  IdKala,
}: MiddleCountTedadSefrProps) {
  useEffect(() => {
    if (ForCartContentsDesignType == 0) {
      const ForCartWidth = document.querySelector(
        "#" + idTag + " .input-group"
      ) as HTMLElement;
      if (ForCartWidth instanceof HTMLElement) {
        ForCartWidth.style.width = "35px";
      }
    } else if (ForCartContentsDesignType == 1) {
      const ForCartWidth = document.querySelector(
        "#" + idTag + " .input-group"
      );
      if (ForCartWidth instanceof HTMLElement) {
        ForCartWidth.style.width = "auto";
      }
    } else if (ForCartContentsDesignType == 2) {
      const ForCartWidth = document.querySelector(
        "#" + idTag + " .input-group"
      );
      if (ForCartWidth instanceof HTMLElement) {
        ForCartWidth.style.width = "auto";
      }
    }
  });

  if (ForCartContentsDesignType == 0) {
    return (
      <div
        className={`text-center ForCart ${idTag}`}
        id={`${idTag}`}
        style={{ width: "100%", display: "flex", justifyContent: "start" }}
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
                <span
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
                </span>
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
                <span
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
                ></span>
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
                <span
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
                </span>
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
                <span
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
                </span>
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
              className="text-center"
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
                <span
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
                </span>
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
                <span
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
                </span>
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
              className="text-center"
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
                <span
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
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

type SabadSatrProps = {
  IdKala: number;
  NameKala: string;
  j: number;
  DarsadTakhfif: number;
  FeeForoosh: number;
  refForMiddleCount: RefObject<HTMLInputElement | null>;
  refForInputGroup: RefObject<any>;
  handlerForAddClick: (
    TedadOut: number | null | undefined,
    addQuota: number,
    BarcodeKala: string | null,
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
  idTag: string;
  BarcodeKala: string;
  FeeMasraf: number;
  TozihatKala: string;
};

export function SabadSatrComponent({
  IdKala,
  NameKala,
  j,
  DarsadTakhfif,
  FeeForoosh,
  refForMiddleCount,
  refForInputGroup,
  handlerForAddClick,
  handlerForRemClick,
  openprodDetModal,
  ForCartContentsDesignType,
  tedad,
  idTag,
  BarcodeKala,
  FeeMasraf,
  TozihatKala,
}: SabadSatrProps) {
  return (
    <button
      id={`cardd-${IdKala}`}
      type="button"
      onClick={(event) => openprodDetModal(BarcodeKala)}
      onMouseEnter={(event) => {
        event.currentTarget.style.boxShadow = "0px 0px 2px 0px #D7D6D6";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = "none";
      }}
      className="cardd Mainslides GotToDet"
      style={{
        color: "inherit",
        textDecoration: "none",
        display: "inline-block",
        width: "0px",
        direction: "rtl",
        padding: "0px 2px 5px 2px",
        marginLeft: "-1px",
        marginBottom: "-1px",
        margin: "3px",
        borderRadius: "17px",
        overflow: "hidden",
        border: "1px solid #e4e4e4",
        backgroundColor: "white",
        height: "auto",
      }}
    >
      <div
        style={{ display: "flex", flexFlow: "column", position: "relative" }}
      >
        {DarsadTakhfif >= 30 && (
          <div
            className={`specialOffer-${IdKala}`}
            style={{
              display: "flex",
              position: "absolute",
              top: "7px",
              left: "7px",
              fontSize: "100%",
              backgroundColor: "inherit",
            }}
          >
            <img
              style={{ width: "64px" }}
              src="https://img.tochikala.com/Icon/special-offer.svg"
              alt="علاقه&zwnj;مندی&zwnj;ها"
            />
          </div>
        )}
        <div
          className="imgcontainer"
          id={`imgcontainer-${IdKala}`}
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "column",
            height: "min-content",
          }}
        >
          <img
            loading="lazy"
            src={`https://img.tochikala.com/Product/${IdKala}.webp`}
            id={`card-img-top-${IdKala}`}
            className="card-img-top"
            alt={NameKala}
            style={{ width: "100%", backgroundColor: "#EFEFEF" }}
            //  onError={this.onerror=null;this.src=\'https://img.tochikala.com/Logo/tochi.png\';$(this).css(\'height\',\'auto\') }}
            //  onLoad="$(this).css(\'background-color\',\'inherit\');$(this).css(\'height\',\'auto\');"
          />
        </div>
      </div>

      <div
        style={{
          height: "42px",
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "row",
          marginTop: "0px",
          padding: "0px 10px 0px 10px",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
        }}
      >
        <h6
          style={{
            fontSize: "13px",
            margin: "0px",
            lineHeight: "1.6",
            textOverflow: "ellipsis",
            overflow: "hidden",
            // display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;text-align:right;">' + parsedList[j].NameKala + '</h6>' +  //zare_nk_0621_updated(add text-align:right;)
            display: "-webkit-box",
            textAlign: "right",
          }}
        >
          {NameKala}
        </h6>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "row",
          marginTop: "10px",
          padding: "0px 10px 0px 10px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {DarsadTakhfif != 0 && (
          <div
            id={`darsadTakhfifInsabad-${IdKala}`}
            className="darsadTakhfifInsabad rounded-pill"
            style={{
              backgroundColor: "#dc3545",
              width: "35px",
              height: "20px",
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <span
              className="forDiscount"
              style={{ fontSize: "75%", color: "white", opacity: "1" }}
            >
              {`${DarsadTakhfif}٪`}
            </span>
          </div>
        )}
        <div
          style={{ flex: "1 0 auto", display: "flex", justifyContent: "end" }}
        >
          <span className="mablagh" style={{ marginLeft: "5px" }}>
            {FeeForoosh.toLocaleString()}
          </span>
          <span style={{ fontSize: "12px" }}>ریال</span>
        </div>
      </div>

      <div
        id={`ForCartContInProdDet-${IdKala}`}
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          marginTop: "7px",
          padding: "0px 10px",
        }}
      >
        <MiddleCountTedadSefr
          refForMiddleCount={refForMiddleCount}
          handlerForAddClick={(e) => {
            handlerForAddClick(tedad ? tedad : null, 0, BarcodeKala, e);
          }}
          handlerForRemClick={(e) => {
            return handlerForRemClick(tedad ? tedad : null, BarcodeKala, e);
          }}
          refForInputGroup={refForInputGroup}
          ForCartContentsDesignType={ForCartContentsDesignType}
          tedad={tedad}
          idTag={idTag}
          IdKala={IdKala}
        />
      </div>
      {DarsadTakhfif != 0 ? (
        <div
          id={`PriceBeforeDiscount-${IdKala}`}
          style={{
            visibility: "visible",
            display: "flex",
            flexFlow: "row",
            paddingLeft: "18px",
            justifyContent: "end",
            alignItems: "center",
            marginBottom: "5px",
            width: "100%",
          }}
        >
          <span
            className="PriceBeforeDiscount"
            style={{
              fontSize: "75%",
              opacity: "0.7",
              textDecoration: "line-through",
            }}
          >
            {FeeMasraf.toLocaleString()}
          </span>
        </div>
      ) : (
        <div
          id={`PriceBeforeDiscount-${IdKala}`}
          style={{
            visibility: "hidden",
            display: "flex",
            flexFlow: "row",
            paddingLeft: "18px",
            justifyContent: "end",
            alignItems: "center",
            marginBottom: "5px",
            width: "100%",
          }}
        >
          <span
            className="PriceBeforeDiscount"
            style={{
              fontSize: "75%",
              opacity: "0.7",
              textDecoration: "line-through",
            }}
          >
            {FeeMasraf.toLocaleString()}
          </span>
        </div>
      )}
      <div
        className="TozihatforKala-' + parsedList[j].IdKala + '"
        style={{
          padding: "5px",
          borderRadius: "15px",
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "row",
          margin: "0px 3px 5px 3px",
          justifyContent: "start",
          color: "red",
          alignItems: "center",
        }}
      >
        <h6
          style={{
            textAlign: "center",
            fontSize: "12px",
            margin: "0px",
            lineHeight: "2.0",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineClamp: "2",
          }}
        >
          {TozihatKala == null ? "" : TozihatKala}
        </h6>
      </div>
    </button>
  );
}

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }
  return null; // اگر کوکی پیدا نشد
}

export default function ShallowRoutingExample() {
  // alert("ShallowRoutingExample called!!!!!!");
  const router = useRouter();
  type CartData = {
    IdKala: number;
    ForCartContentsDesignType: number;
    TedadOut: number;
    hadaksar: string;
    idTag: string;
    NameKala: string | null;
    MM: string | null;
    NameBerand: string | null;
    FeeForoosh: number; //zare_nk_040602_added
    FeeMasraf: number; //zare_nk_040602_added
  };
  const [ForCartContInProdDetVal, setForCartContInProdDetVal] =
    useState<CartData | null>(null);
  var refForInputGroup = useRef(null);
  const refForMiddleCount = useRef<HTMLInputElement>(null);
  const refForfather = useRef<string | null>(null);
  type ParsedItemType = {
    IdKala: number;
    NameKala: string;
    MM: string;
    [key: string]: any;
  };
  const refForParsedList = useRef<ParsedItemType | null>(null);
  const refForBishAzMaxTedadYaMojoodi = useRef<number | null>(null);
  const [bisatr, setBisatr] = useState(true);
  type SabadRowType = {
    IdKala: number;
    NameKala: string;
    MM: string;
    [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast
  };
  const [sabadRows, setSabadRows] = useState<SabadRowType[] | null>(null);
  const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null);
  const [isOpenedProdDetModal, setIsOpenedProdDetModal] = useState(false);
  const [BarcodeKala, setBarcodeKala] = useState<string | null>(null);
  async function openprodDetModal(barcodeKala: string) {
    await ShowDetails(barcodeKala);
    setIsOpenedProdDetModal(true);
    setAddOrRemChanged(null);
    setBarcodeKala(barcodeKala);
  }

  //  function ShowDetails() {  //zare_nk_040601_commented
  async function ShowDetails(barcodeKala: any) {
    // alert("ShowDetails-ShowDetails-ShowDetails");
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
    // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
    let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
    var urlApi_SelectShobehJashnvareh = ApiUrl + "Api_SelectKala";
    const response = await fetch(urlApi_SelectShobehJashnvareh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        // BarcodeKala: BarcodeKala,//zare_nk_040601_commented
        BarcodeKala: barcodeKala, //zare_nk_040601_added
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
        var isChange = parsedList[0].IsChangeTedad;
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
    const mymodalForWarning = document.getElementById("mymodalForWarning");
    if (!mymodalForWarning) return;
    const handlerForMymodalForWarning = () => {
      window.location.href = "/login"; //albateh age dar middleware.ts az arrayeye publicPaths ekhrajesh konam barname outomat mabaratesh be login vali man goftam nare felan shayad in query ra parsa badan dastkari koneh ke niaz be login nadashteh bashe(albateh tebghe manteghe man bedoone loginam beshe takhfifat ra did behtare!!)
    };

    mymodalForWarning.addEventListener(
      "hidden.bs.modal",
      handlerForMymodalForWarning
    );

    return () => {
      // پاکسازی رویداد در unmount
      mymodalForWarning.removeEventListener(
        "hidden.bs.modal",
        handlerForMymodalForWarning
      );
    };
  }, []);

  useEffect(() => {
    // alert("useEffect called11");
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
    ////zare_nk_040612_commented_st
    // if (ForCartContInProdDetVal != null) {

    // if (ForCartContInProdDetVal.MM == "0") {
    //   alert(
    //     'ForCartContInProdDetVal.MM== "0": ' + ForCartContInProdDetVal.MM
    //   );
    //   ////zare_nk_040612_commented_st
    //   // const darsadTakhfifInDetails = document.getElementById(
    //   //   "darsadTakhfifInDetails"
    //   // );
    //   // if (darsadTakhfifInDetails instanceof HTMLElement) {
    //   //   darsadTakhfifInDetails.style.display = "none";
    //   // }
    //   // const gheimatMasrafInDetailsInfoCont = document.getElementById(
    //   //   "gheimatMasrafInDetailsInfoCont"
    //   // );
    //   // if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
    //   //   gheimatMasrafInDetailsInfoCont.style.display = "none";
    //   // }
    //   // const lastDividerInDetails = document.getElementById(
    //   //   "lastDividerInDetails"
    //   // );
    //   // if (lastDividerInDetails instanceof HTMLElement) {
    //   //   lastDividerInDetails.style.display = "none";
    //   // }
    //   // const DiscountContInDetails = document.getElementById(
    //   //   "DiscountContInDetails"
    //   // );
    //   // if (DiscountContInDetails instanceof HTMLElement) {
    //   //   DiscountContInDetails.style.display = "none";
    //   // }
    //   ////zare_nk_040612_commented_end
    // } else {
    //   alert(
    //     'ForCartContInProdDetVal.MM!= "0": ' + ForCartContInProdDetVal.MM
    //   );
    //   // const darsadTakhfifInDetails = document.getElementById(
    //   //   "darsadTakhfifInDetails"
    //   // );
    //   // if (darsadTakhfifInDetails instanceof HTMLElement) {
    //   //   darsadTakhfifInDetails.style.display = "flex";
    //   // }
    //   // const gheimatMasrafInDetailsInfoCont = document.getElementById(
    //   //   "gheimatMasrafInDetailsInfoCont"
    //   // );
    //   // if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
    //   //   gheimatMasrafInDetailsInfoCont.style.display = "flex";
    //   // }
    //   // const lastDividerInDetails = document.getElementById(
    //   //   "lastDividerInDetails"
    //   // );
    //   // if (lastDividerInDetails instanceof HTMLElement) {
    //   //   lastDividerInDetails.style.display = "flex";
    //   // }
    //   // const DiscountContInDetails = document.getElementById(
    //   //   "DiscountContInDetails"
    //   // );
    //   // if (DiscountContInDetails instanceof HTMLElement) {
    //   //   DiscountContInDetails.style.display = "flex";
    //   // }
    // }

    // }
    ////zare_nk_040612_commented_end
   
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
      if (ImageColectionInDetails instanceof HTMLElement) {
        ImageColectionInDetails.style.display = "none";
      } 
    };
    const hiddenHandlerForProdDetModal = () => {
      setIsOpenedProdDetModal(false);
      setAddOrRemChanged("notNull");
      refForfather.current = "#cardcontainer2";
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
        type InputDataType = {
          IdShobeh: number;
          IsJashnvareh: number;
          NameKala: string;
          IdG1: number;
          IdG2: number;
          IdG3: number;
          IdG4: number;
          IsMostBuy: number;
          Sort: number;
          IsFavorite: number;
          IdVitrin: number;
        };

        const inputData: InputDataType = {
          IdShobeh: 7,
          IsJashnvareh: 1,
          NameKala: "",
          IdG1: -1,
          IdG2: -1,
          IdG3: -1,
          IdG4: -1,
          IsMostBuy: -1,
          Sort: -1,
          IsFavorite: -1,
          IdVitrin: -1,
        };
        var tochiToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVzZXIiOiIxMDAwNiIsIk1vYmlsZSI6IjkzNTEwOTEyODciLCJGdWxsTmFtZSI6Iti62YTYp9mF2LHYttinINqp2KfZiNuM2KfZhiIsIlR5cGUiOiJVc2VyIiwibmJmIjoxNzMxMzkzNzU1LCJleHAiOjE3MzIyNTc3NTUsImlhdCI6MTczMTM5Mzc1NX0.2KjXARkcO5B8YNa9rYYFXXanDCSkY7umL5RRap33MIk";
        let ApiUrl = "https://api.tochikala.com/api/";
        // let ApiUrl = "https://localhost:7201/api/";
        var urlSelectKalaShobeh = ApiUrl + "User/Api_SelectKalaShobeh";
        const response = await fetch(urlSelectKalaShobeh, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + token,   //zare_nk_040327_commented
            Authorization: "Bearer " + tochiToken, //zare_nk_040327_added
          },
          body: JSON.stringify({
            IdShobeh: inputData.IdShobeh,
            IsJashnvareh: inputData.IsJashnvareh,
            NameKala: inputData.NameKala,
            IdG1: inputData.IdG1,
            IdG2: inputData.IdG2,
            IdG3: inputData.IdG3,
            IdG4: inputData.IdG4,
            IsMostBuy: inputData.IsMostBuy,
            Sort: inputData.Sort,
            IsFavorite: inputData.IsFavorite,
            IdVitrin: inputData.IdVitrin,
          }),
          // credentials: "include", //zare_nk_040402_commented
        });
        if (response.ok) {
          const data = await response.json();
          //zare_nk_040326-result in SelectKalaShobeh is:
          // {"status":-1000,"message":"","data":null,"errors":["متاسفانه عملیات با خطا مواجه شد. لطفا مجددا تلاش کنید"]}
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
            setSabadRows(result);
            for (var j = 0; j < result.length; j++) {
              // fillRefsAndfillForCartTagsInDetails(
              //   "#cardcontainer2",
              //   result[j],
              //   null
              // );
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
    }
    tempFuncForAsync();
  }, [addOrRemChanged]);

  async function addToCartInIndex(
    father: any,
    Tedad: number,
    bishAzMaxTedadYaMojoodi: number,
    currentRow: any,
    addQuota: number,
    BarcodeKala: string | null,
    // event?: MouseEvent<HTMLElement> | null | undefined //zare_nk_040525 commented)
    event?: MouseEvent<HTMLAnchorElement> | null | undefined //zare_nk_04525_added
  ) {
    if (event != null) {
      event.stopPropagation();
    }
    const token = getCookie("token");
    if (token == null) {
      return;
    } else {
      if (event != null) {
        event.preventDefault();
      }
      var TedadOut = 0;
      var TedadOuttoAjax = 0;
      if (currentRow == null) {
        return;
      }
      const tedad = parseFloat(String(Tedad ?? 0));
      const zarib = parseFloat(String(currentRow.ZaribForoosh ?? 0));
      TedadOut = tedad + zarib;
      TedadOuttoAjax = parseFloat(currentRow.ZaribForoosh);
      const token = getCookie("token");
      // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
      let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
      var urlInsertToSabad = ApiUrl + "Api_InsertToSabad";
      const response = await fetch(urlInsertToSabad, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          BarcodeKala: BarcodeKala,
          Tedad: TedadOuttoAjax,
        }),
        // credentials: "include", //zare_nk_040402_commented
      });
      const data = await response.json();
      if (response.ok) {
        setAddOrRemChanged(BarcodeKala + "-" + TedadOut);
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
            refForParsedList.current = currentRow;
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
                  MM: currentRow.MM,
                  NameBerand: currentRow.NameBerand, //zare_nk_040602_added
                  FeeForoosh: currentRow.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: currentRow.FeeMasraf, //zare_nk_040602_added
                };
              });
            }
          } else if (TedadOut > currentRow.ZaribForoosh) {
            refForfather.current = father;
            refForParsedList.current = currentRow;
            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow.IdKala;
                return {
                  IdKala: currentRow.IdKala,
                  ForCartContentsDesignType: 2,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow.NameKala,
                  MM: currentRow.MM,
                  NameBerand: currentRow.NameBerand, //zare_nk_040602_added
                  FeeForoosh: currentRow.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: currentRow.FeeMasraf, //zare_nk_040602_added
                };
              });
            }
          } else if (TedadOut == currentRow.ZaribForoosh) {
            refForfather.current = father;
            refForParsedList.current = currentRow;
            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + currentRow.IdKala;
                return {
                  IdKala: currentRow.IdKala,
                  ForCartContentsDesignType: 1,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: currentRow.NameKala,
                  MM: currentRow.MM,
                  NameBerand: currentRow.NameBerand, //zare_nk_040602_added
                  FeeForoosh: currentRow.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: currentRow.FeeMasraf, //zare_nk_040602_added
                };
              });
            }
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
  }

  async function remveFromCartInIndex(
    father: any,
    Tedad: number | null | undefined,
    bishAzMaxTedadYaMojoodi: number,
    currentRow: any,
    BarcodeKala: string | null,
    // event?: MouseEvent<HTMLElement> | null | undefined //zare_nk_040525 commented)
    event?: MouseEvent<HTMLAnchorElement> | null | undefined //zare_nk_040525_added
  ) {
    if (event != null) {
      event.stopPropagation();
    }
    const token = getCookie("token");
    if (token == null) {
      return;
    } else {
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
      // let ApiUrl = "https://localhost:7265/api/v1/Hyper/";
      let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
      var urlInsertToSabad = ApiUrl + "Api_InsertToSabad";
      var TedadOut = 0;
      var TedadOuttoAjax = 0;
      const tedad = parseFloat(String(Tedad ?? 0));
      const zarib = parseFloat(String(currentRow.ZaribForoosh ?? 0));
      TedadOut = tedad - zarib;
      TedadOuttoAjax = -parseFloat(currentRow.ZaribForoosh);
      const response = await fetch(urlInsertToSabad, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          BarcodeKala: BarcodeKala,
          Tedad: TedadOuttoAjax,
        }),
        // credentials: "include", //zare_nk_040402_commented
      });
      const data = await response.json();
      if (response.ok) {
        var result = data;
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
          refForParsedList.current = currentRow;
          if (isOpenedProdDetModal) {
            setForCartContInProdDetVal(() => {
              const idTag = "ForCart-" + refForParsedList.current!.IdKala;
              return {
                IdKala: refForParsedList.current!.IdKala,
                ForCartContentsDesignType: 0,
                TedadOut: TedadOut,
                hadaksar: "",
                idTag: idTag,
                NameKala: refForParsedList.current!.NameKala,
                MM: refForParsedList.current!.MM,
                NameBerand: refForParsedList.current!.NameBerand, //zare_nk_040602_added
                FeeForoosh: refForParsedList.current!.FeeForoosh, //zare_nk_040602_added
                FeeMasraf: refForParsedList.current!.FeeMasraf, //zare_nk_040602_added
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
          setAddOrRemChanged(BarcodeKala + "-" + TedadOut);
          var hadaksar = "";
          if (TedadOut == 0) {
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
            const hisFatherTag = event.target;
            if (hisFatherTag instanceof HTMLElement) {
              hisFather = hisFatherTag.closest(".gfForAddRemm");
            }
            refForfather.current = father;
            refForParsedList.current = currentRow;
            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + refForParsedList.current!.IdKala;
                return {
                  IdKala: refForParsedList.current!.IdKala,
                  ForCartContentsDesignType: 0,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: refForParsedList.current!.NameKala,
                  MM: refForParsedList.current!.MM,
                  NameBerand: refForParsedList.current!.NameBerand, //zare_nk_040602_added
                  FeeForoosh: refForParsedList.current!.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: refForParsedList.current!.FeeMasraf, //zare_nk_040602_added
                };
              });
            }
          } else if (TedadOut > currentRow.ZaribForoosh) {
            refForfather.current = father;
            refForParsedList.current = currentRow;
            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + refForParsedList.current!.IdKala;
                return {
                  IdKala: refForParsedList.current!.IdKala,
                  ForCartContentsDesignType: 2,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: refForParsedList.current!.NameKala,
                  MM: refForParsedList.current!.MM,
                  NameBerand: refForParsedList.current!.NameBerand, //zare_nk_040602_added
                  FeeForoosh: refForParsedList.current!.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: refForParsedList.current!.FeeMasraf, //zare_nk_040602_added
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
            refForParsedList.current = currentRow;
            if (isOpenedProdDetModal) {
              setForCartContInProdDetVal(() => {
                const idTag = "ForCart-" + refForParsedList.current!.IdKala;
                return {
                  IdKala: refForParsedList.current!.IdKala,
                  ForCartContentsDesignType: 1,
                  TedadOut: TedadOut,
                  hadaksar: "",
                  idTag: idTag,
                  NameKala: refForParsedList.current!.NameKala,
                  MM: refForParsedList.current!.MM,
                  NameBerand: refForParsedList.current!.NameBerand, //zare_nk_040602_added
                  FeeForoosh: refForParsedList.current!.FeeForoosh, //zare_nk_040602_added
                  FeeMasraf: refForParsedList.current!.FeeMasraf, //zare_nk_040602_added
                };
              });
            }
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
  }

  const handlerForAddClick: (
    TedadOut: number | null | undefined,
    addQuota: number,
    BarcodeKala: string | null,
    e?: MouseEvent<HTMLAnchorElement> | null | undefined
  ) => void = (TedadOut, addQuota, BarcodeKala, e) => {
    e && e.stopPropagation();
    addToCartInIndex(
      refForfather.current,
      TedadOut!,
      refForBishAzMaxTedadYaMojoodi.current!,
      refForParsedList.current,
      addQuota,
      BarcodeKala,
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
      refForParsedList.current,
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
    refForParsedList.current = parsedList;
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
          MM: parsedList.MM,
          NameBerand: parsedList.NameBerand, //zare_nk_040602_added
          FeeForoosh: parsedList.FeeForoosh, //zare_nk_040602_added
          FeeMasraf: parsedList.FeeMasraf, //zare_nk_040602_added
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
          MM: parsedList.MM,
          NameBerand: parsedList.NameBerand, //zare_nk_040602_added
          FeeForoosh: parsedList.FeeForoosh, //zare_nk_040602_added
          FeeMasraf: parsedList.FeeMasraf, //zare_nk_040602_added
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
          MM: parsedList.MM,
          NameBerand: parsedList.NameBerand, //zare_nk_040602_added
          FeeForoosh: parsedList.FeeForoosh, //zare_nk_040602_added
          FeeMasraf: parsedList.FeeMasraf, //zare_nk_040602_added
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
                                  ForCartContInProdDetVal.MM != "0" && (
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
                                  className="rialInsabad"
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
                              ForCartContInProdDetVal.MM != "0" && (
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
                              ForCartContInProdDetVal.MM != "0" && (
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
                                        {ForCartContInProdDetVal.MM}
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
                              justifyContent: "end",
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
                                  handlerForAddClick={(e) => {
                                    handlerForAddClick(
                                      ForCartContInProdDetVal
                                        ? (ForCartContInProdDetVal as any)
                                            .TedadOut
                                        : null,

                                      0,
                                      BarcodeKala,
                                      e
                                    );
                                  }}
                                  handlerForRemClick={(e) => {
                                    return handlerForRemClick(
                                      ForCartContInProdDetVal
                                        ? (ForCartContInProdDetVal as any)
                                            .TedadOut
                                        : null,
                                      BarcodeKala,
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
  ) : (
    <div
      id="cardcontainer2"
      className="mtt-1 gfForAddRemm WantCompress hisGrandFather"
      style={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "start",
        flexWrap: "wrap",
        direction: "rtl",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {!bisatr && (
        <>
          {sabadRows?.map((item, index) => {
            const idTag = "ForCart-" + item.IdKala;
            let ForCartContentsDesignType = 0;
            const Tedad = item.Tedad ? item.Tedad : item.TedadDarSabad;
            if (Tedad == 0) {
              ForCartContentsDesignType = 0;
            } else if (Tedad > item.ZaribForoosh) {
              ForCartContentsDesignType = 2;
            } else if (Tedad == item.ZaribForoosh) {
              ForCartContentsDesignType = 1;
            }
            let TozihatKala = "";
            if (item.TozihatKala != undefined) {
              TozihatKala = item.TozihatKala;
            }

            return (
              <SabadSatrComponent
                key={index || item.IdKala}
                IdKala={item.IdKala}
                NameKala={item.NameKala}
                j={index}
                DarsadTakhfif={item.DarsadTakhfif}
                FeeForoosh={item.FeeForoosh}
                refForMiddleCount={refForMiddleCount}
                refForInputGroup={refForInputGroup}
                handlerForAddClick={handlerForAddClick}
                handlerForRemClick={handlerForRemClick}
                openprodDetModal={openprodDetModal}
                ForCartContentsDesignType={ForCartContentsDesignType}
                tedad={Tedad}
                idTag={idTag}
                BarcodeKala={item.BarcodeKala}
                FeeMasraf={item.FeeMasraf}
                TozihatKala={TozihatKala}
              />
            );
          })}

          {/* {sabadRows.map((item, index) => {
            if (index < 5) {
              return (
                <div
                  key={item.IdKala}
                  className="cardd"
                  style={{ height: "0px" }}
                ></div>
              );
            }
          })} */}

          {sabadRows?.slice(0, 5).map((item) => (
            <div
              key={item.IdKala}
              className="cardd"
              style={{ height: "0px" }}
            ></div>
          ))}
        </>
      )}
    </div>
  );
}
