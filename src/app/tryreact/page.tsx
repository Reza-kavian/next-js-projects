////zare_nk_050131_okk
"use client";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import Styles from "@/styles/components/dooz.module.css";

type SquareProps = {
  // value: string | null;
  value: string | null | number;
  onSquareClick: () => void;
  andis: number;
  refForBtn: React.RefObject<(HTMLButtonElement | null)[]>;
  buttonContClassName?: string;
  buttonClassName?: string;
};

function Square({ value, onSquareClick, andis, refForBtn, buttonContClassName, buttonClassName }: SquareProps) {
  return (  //zare_nk_050122_nokteh(tahlilshe ke be key niaz dare ya na!!) 
    <div className={buttonContClassName}>
      <button
        ref={(e) => {
          refForBtn.current[andis] = e;
        }}
        id={andis.toString()}
        className={buttonClassName}
        onClick={onSquareClick}
        style={{ padding: "0px" }}
      >
        {value}
      </button>
    </div>
  );
}

// type SquareValue = "X" | "O" | null ;   //zare_nk_041015_nokteh(SquareValue yek type ast ke ya X ya O ya null hast)  ////zare_nk_050409_commented
type SquareValue = "X" | "O" | null | number;   //zare_nk_041015_nokteh(SquareValue yek type ast ke ya X ya O ya null hast)  ////zare_nk_050409_added(ta andise akharin mohreh ra ham dar har archive dashteh bashim ke range mokhodi bedim beheshon(yani vaghti ke jump mizanim be archive haye ghabli akharin mohre ro nokhodi bala biare))
type Squares = SquareValue[];   //zare_nk_041015_nokteh(Squares yek type ast ke arayeh ei az noe SquareValue hast,yani maghadiresh faghat X ya O ya null hast) 
type BtnColor = string | null;   //zare_nk_041015_nokteh(BtnColor range dokmeh ra moshakhas mikoneh ke noe reshtei ast)

type BoardProps = {
  squares: Squares; //zare_nk_040528_nokteh(arayeye 9 khanehiye haviye vaziate feliye chineshe dooz(ba clicke dokmehaye dooz ya ba clicke dokmehaye archiv in vaziat avaz misheh))
  onPlay: (nextSquares: Squares) => void; //az methode handlePlaye componente Game meghdar migire,handlePlaye dar renderhaye Game zamani ke masalan dokmehaye dooz
  // ya dokmehaye arshiv click beshan va vazite jadide chineshe dooz shekl begire amal mikoneh)   //zare_nk_050122_nokteh(rahnamaei gofteham ghablan archive ham handlePlaye seda mizaneh,alan cheshmbaste migam na,cheshm baz va tahlilshe!)
  refForBtn: React.RefObject<(HTMLButtonElement | null)[]>;  //zare_nk_040528_nokteh(useRefe dokmehaye dooz ke harkodam tage button hastand)
  timer: number; //zare_nk_040525_nokteh(state shamele meghdare timer)
  setTimer: React.Dispatch<React.SetStateAction<number>>;  //zare_nk_040525_nokteh(setState meghdardehiye state timer)
  xIsNextState: boolean;  //zare_nk_040525_nokteh(state ke mige nobate x hast ya o)
  setXIsNextState: React.Dispatch<React.SetStateAction<boolean>>;  //zare_nk_040525_nokteh(setState meghdardehiye state xIsNextState)
  lastMove: boolean;  ////zare_nk_050410_added
  setLastMove: React.Dispatch<React.SetStateAction<boolean>>;  //zare_nk_040525_nokteh(state ke mige dokmehaye dooz click shodeh ya dokmehaye archiv) 
  BtnsColor: BtnColor[];    //zare_nk_040528_nokteh(arayehei 9 khanehi ke moadele range har dokmeye dooz ast)
  setBtnsColor: React.Dispatch<React.SetStateAction<BtnColor[]>>;  ////zare_nk_050410_added
  intervalRef: React.RefObject<NodeJS.Timeout | null>;  //zare_nk_040525(useRefe modiriate timer)
  timerDisplay: string;  //zare_nk_040528(useRefe taeine khasiate display tage namayeshe timer)
  setTimerDisplay: React.Dispatch<React.SetStateAction<string>>;   //zare_nk_040528_nokteh(setState meghdardehiye state timerDisplay)
  hToString: string | null;  //zare_nk_040528_nokteh(state meghdare saate timer)
  setHToString: React.Dispatch<React.SetStateAction<string | null>>;    //zare_nk_040528_nokteh(setState meghdardehiye state hToString)
  mToString: string | null;  //zare_nk_040528_nokteh(state meghdare daghighe timer)
  setMToString: React.Dispatch<React.SetStateAction<string | null>>;   //zare_nk_040528_nokteh(setState meghdardehiye state mToString)
  sToString: string | null;  //zare_nk_040528_nokteh(state meghdare saniyeh timer)
  setSToString: React.Dispatch<React.SetStateAction<string | null>>;   //zare_nk_040528_nokteh(setState meghdardehiye state sToString)

  currentMove: number;   ////zare_nk_050410_added
  refFornextSquares: React.RefObject<SquareValue[]|null>;  ////zare_nk_050410_added
};

function Board({
  squares,
  onPlay,
  refForBtn,
  timer,
  setTimer,
  xIsNextState,
  setXIsNextState,
  lastMove,     ////zare_nk_050410_added
  setLastMove,
  BtnsColor,
  setBtnsColor,
  intervalRef,
  timerDisplay,
  setTimerDisplay,
  hToString,
  setHToString,
  mToString,
  setMToString,
  sToString,
  setSToString,
  currentMove,    ////zare_nk_050410_added
  refFornextSquares,  ////zare_nk_050410_added
}: BoardProps) {
  console.log('zare_nk_050126-Board called!!-squares: ' + squares);
  console.log(
    "050411-BtnsColor is: " + JSON.stringify(BtnsColor)
  );
  const [lastButton, setLastButton] = useState<number | null>(  //zare_nk_040528_nokteh(state ke andise dokmeh ra dar arayeye Squares midahad,va dar har handleClick ke haman rooydade clicke dokmehaye dooz ast meghdar migireh)
    localStorage.getItem("lastButton") != null
      ? JSON.parse(localStorage.getItem("lastButton")!)
      : null
  );
  var refForTimer = useRef(null);  //zare_nk_040528_nokteh(useRefe tage namayeshe timer hast)
  var refForTimerCont = useRef(null);  //zare_nk_040528_nokteh(useRefe tage pedare tage namayeshe timer hast)
  const refForWinnerOrNobat = useRef<HTMLDivElement | null>(null);   //zare_nk_040528_nokteh(useRefe tage namayeshe lafze nobat ya barandeh)
  const xIsNextRef = useRef(xIsNextState);   //zare_nk_040528_nokteh(useRefe haviye meghdare feliye xIsNextState,xIsNextState ra dar useRef 
  // rikhtim ke dar renderhaye component meghdarash hefz shavad)

  const [status, setStatus] = useState<string | null>(
    localStorage.getItem("status") != null
      ? JSON.parse(localStorage.getItem("status")!)
      : null
  );  ////zare_nk_050410_added

  useEffect(() => {
    xIsNextRef.current = xIsNextState;
    intervalRef.current = setInterval(function () {
      const winner = calculateWinner(squares);
      if (winner) {
        // setTimerDisplay("none");  ////zare_nk_050410_commented
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        setTimer(-1);

        // ////zare_nk_050410_added_st
        // let tempArray = null;
        // tempArray = [...Array(9)].map((item1, index1) => {
        //   let thisStyles = Styles.mohreh;
        //   winner.map((item, index2) => {
        //     if (index2 == 0) {
        //       //khaneye avvale winner nobat ra taein mikone(X ya Y)
        //       return;
        //     }
        //     if (
        //       typeof item === "number" && // تضمین عدد بودن  
        //       item == index1 &&
        //       item != lastButton
        //     ) {
        //       // BtnsColor[winner[index]] = Styles.lineWined;
        //       // return(Styles.lineWined);
        //       thisStyles = Styles.lineWined;
        //     } else if (
        //       typeof item === "number" && // تضمین عدد بودن  
        //       item == index1 &&
        //       item == lastButton
        //     ) {
        //       // BtnsColor[winner[index]] = Styles.mohrehWined;
        //       // return(Styles.mohrehWined);
        //       thisStyles = Styles.mohrehWined;
        //     }
        //     // else{
        //     //   thisStyles = Styles.mohreh;
        //     // }                 
        //   })
        //   console.log("thisStyles oo: " + thisStyles);
        //   return (thisStyles);
        // })
        //   setBtnsColor(() => {
        //   return (
        //     tempArray
        //   )
        // });

        // console.log("1212-tempArray2: " + JSON.stringify(tempArray))
        // localStorage.setItem("BtnsColor", JSON.stringify(tempArray));
        // ////zare_nk_050410_added_end

        return;
      }
      ////  //zare_nk_040120_added_st(baraye disable kardane dokmeha baraye entezar)(and commented)
      //   [...Array(9)].map((_, index) => {
      //     refForBtn.current[index]?.removeAttribute("disabled");
      // });
      ////  //zare_nk_040120_added_end(baraye disable kardane dokmeha baraye entezar)(and commented)

      setTimer((curTimer) => {
        if (curTimer < 0) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
          setXIsNextState(!xIsNextRef.current);
          // setXIsNextState(!xIsNextState);   
          // setXIsNextState((cur) =>{return !cur} );  //not ok //zare_nk_040528_nokteh(nadorost hast,ehtemalan chon yek setState booleani dakhele setState dige mokhtal mishe)
          // squares[squares.length - 1] = !xIsNextRef.current ? "X" : "O";  //zare_nk_041016_nokteh(tavize nobat bekhatere etmame mohlate zamani)  ////zare_nk_050409_commented
          squares[squares.length - 2] = !xIsNextRef.current ? "X" : "O";  //zare_nk_041016_nokteh(tavize nobat bekhatere etmame mohlate zamani)  ////zare_nk_050409_added
          localStorage.setItem(   //zare_nk_041016_nokteh(tavize nobat bekhatere etmame mohlate zamani)
            "xIsNextState",
            JSON.stringify(!xIsNextRef.current)
          );
          localStorage.setItem("timer", JSON.stringify(5000));
          return 5000;
        }
        let h = Math.floor(timer / (1000 * 60 * 60));
        let hToString = h.toString();
        hToString = hToString.length === 1 ? "0" + hToString : hToString;
        let m = Math.floor((timer - h * 60 * 60 * 1000) / (60 * 1000));
        let mToString = m.toString();
        mToString = mToString.length === 1 ? "0" + mToString : mToString;
        let s = Math.floor((timer - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
        let sToString = s.toString();
        sToString = sToString.length === 1 ? "0" + sToString : sToString;
        try {
          ////zar_nk_040331_commented_st
          // refForTimer.current.innerHTML =
          //   hToString != "00"
          //     ? '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
          //       hToString +
          //       "</span>" +
          //       '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
          //       '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
          //       mToString +
          //       "</span>" +
          //       '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
          //       '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
          //       sToString +
          //       "</span>"
          //     : '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
          //       mToString +
          //       "</span>" +
          //       '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
          //       '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
          //       sToString +
          //       "</span>";
          ////zar_nk_040331_commented_end

          ////zar_nk_040331_added_st
          //     hToString != "00" ? (
          //       setHToString(hToString)
          //     setMToString(mToString)
          //     setSToString(sToString)
          //     ): (
          //   setMToString(mToString)
          // setSToString(sToString)
          //     )
          if (hToString != "00") {
            setHToString(hToString);
            setMToString(mToString);
            setSToString(sToString);
          } else {
            setMToString(mToString);
            setSToString(sToString);
          }
          ////zar_nk_040331_added_end
        } catch (error) {
          // console.log("zare_nk_040123-0004-Error:" + error.message);  //zare_nk_040412_commented
          if (error instanceof Error) {
            console.log("zare_nk_040123-0004-Error:" + error.message);
          } else {
            console.log("zare_nk_040123-0004-Error: Unknown error");
          }
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
        }
        localStorage.setItem("timer", JSON.stringify(curTimer - 1000));
        return curTimer - 1000;
      });

    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); //in dastoor bayad bashe ta az anbashte shodane intervale yad shodeh dar hafezehye system(anbashtegi) hengame unmount shodane component(yani dastoorate router ra bezanim va be componenthaye dige berim) jologiri beshe
      }
    };
  }, [timer, xIsNextState]);

  // const refFornextSquares = useRef<SquareValue[]>(null);
  async function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    ////zare_nk_041016_nokteh(be in khat residim yani na barandeh moshakhas shodeh va na squares[i] meghdar dare,yani squares[i] null hast)
    setLastButton(() => {
      return i;
    });
    localStorage.setItem("lastButton", JSON.stringify(i));
    // const nextSquares = squares.slice();
    refFornextSquares.current = squares.slice();
    if (xIsNextState == true) {
      // nextSquares[i] = "X";  //zare_nk_041016_nokteh(az null be X)
      refFornextSquares.current[i] = "X";  //zare_nk_041016_nokteh(az null be X)
    } else {
      // nextSquares[i] = "O";  //zare_nk_041016_nokteh(az null be O)
      refFornextSquares.current[i] = "O";  //zare_nk_041016_nokteh(az null be O)
    }
    // nextSquares[nextSquares.length - 1] = i; ////zare_nk_050409_added
    refFornextSquares.current[refFornextSquares.current.length - 1] = i; ////zare_nk_050409_added
    //zare_nk_040225_commented_st(rahe1-vali dalili be comment nist,chon dakhaele yek setState digeh nabood ke chon boolean barmigardoone amal nakoneh va majboor shim az rahe2 estefadeh konim)
    setXIsNextState((cur) => {
      localStorage.setItem("xIsNextState", JSON.stringify(!cur));
      // squares[squares.length - 1] = !cur ? "X" : "O";   ////zare_nk_050409_commented
      // squares[squares.length - 2] = cur ? "X" : "O";      ////zare_nk_050409_added(khaneye akhar marboot be akharin click va khaneye ghable akhar marboot be nobate x ya y hast)  
      // nextSquares[squares.length - 2] = cur ? "X" : "O";      ////zare_nk_050409_added(khaneye akhar marboot be akharin click va khaneye ghable akhar marboot be nobate x ya y hast)    
      if (refFornextSquares.current) {
        refFornextSquares.current[refFornextSquares.current.length - 2] = cur ? "X" : "O";      ////zare_nk_050409_added(khaneye akhar marboot be akharin click va khaneye ghable akhar marboot be nobate x ya y hast)    
      }
      return !cur;
    });
    //zare_nk_040225_commented_end(rahe1-vali dalili be comment nist,chon dakhaele yek setState digeh nabood ke chon boolean barmigardoone amal nakoneh va majboor shim az rahe2 estefadeh konim)
    // //zare_nk_040225_added_st(rahe2-rahe1 chon biniaz az ref hast az nazare chatGpt behtare)
    // setXIsNextState(!xIsNextRef.current); //ok
    // localStorage.setItem("xIsNextState", JSON.stringify(!xIsNextRef.current)); //ok
    // squares[squares.length - 1] = !xIsNextRef.current ? "X" : "O; //ok
    // //zare_nk_040225_added_end(rahe2-rahe1 chon biniaz az ref hast az nazare chatGpt behtare)
    setTimer(5000);
    localStorage.setItem("timer", JSON.stringify(5000));

    ////zare_nk_050410_added_st  
    // const winner = calculateWinner(refFornextSquares.current);
    // // let status;  ////zare_nk_050410_commented(be jaye moteghayer az useState estefadeh shod)

    // if (winner) {
    //   console
    //   let tempArray = null;
    //   tempArray = [...Array(9)].map((item1, index1) => {
    //     let thisStyles = Styles.mohreh;
    //     winner.map((item, index2) => {
    //       if (index2 == 0) {
    //         //khaneye avvale winner nobat ra taein mikone(X ya Y)
    //         return;
    //       }
    //       if (
    //         typeof item === "number" && // تضمین عدد بودن  
    //         item == index1 &&
    //         item != i// lastButton
    //       ) {
    //         console.log('1313-1-item: ' + item + '-lastButton: ' + lastButton + '-i: ' + i);
    //         // BtnsColor[winner[index]] = Styles.lineWined;
    //         // return(Styles.lineWined);
    //         thisStyles = Styles.lineWined;
    //       } else if (
    //         typeof item === "number" && // تضمین عدد بودن  
    //         item == index1 &&
    //         item == i //lastButton
    //       ) {
    //         console.log('1313-2-item: ' + item + '-lastButton: ' + lastButton + '-i: ' + i);
    //         // BtnsColor[winner[index]] = Styles.mohrehWined;
    //         // return(Styles.mohrehWined);
    //         thisStyles = Styles.mohrehWined;
    //       }
    //       // else{
    //       //   thisStyles = Styles.mohreh;
    //       // }                 
    //     })
    //     console.log("thisStyles oo: " + thisStyles);
    //     return (thisStyles);
    //   })
    //   setBtnsColor(() => {
    //     return (
    //       tempArray
    //     )
    //   });

    //   console.log("1212-tempArray2: " + JSON.stringify(tempArray))
    //   localStorage.setItem("BtnsColor", JSON.stringify(tempArray));

    //   // status = winner[0] + " : برنده";  ////zare_nk_050410_commented


    //   setStatus(winner[0] + " : برنده");  ////zare_nk_050410_added
    //   localStorage.setItem("status", JSON.stringify(winner[0] + " : برنده")); ////zare_nk_050410_added
    //   setTimerDisplay("none");  ////zare_nk_050410_added
    //   localStorage.setItem("timerDisplay", JSON.stringify("none"));  ////zare_nk_050410

    //   console.log(
    //     "winner not nul-typeof(winner):" +
    //     typeof winner +
    //     "-winner.lenght: " +
    //     winner.length +
    //     "-winner: " +
    //     JSON.stringify(winner) +
    //     "---status: " +
    //     status
    //   );

    //   console.log(
    //     "050411-storedBtnsColor is: " + localStorage.getItem("BtnsColor")
    //   );

    //   if (refForWinnerOrNobat.current) {
    //     refForWinnerOrNobat.current.style.color = "blue";
    //   }

    // }
    // else {
    //   let tempArray = [...Array(9)].map((item, index) => {
    //         if (index == i) {
    //           // ////zare_nk_050410_commented_st
    //           // // refForBtn.current[index]?.classList.add(Styles.mohrehCliked);
    //           // // refForBtn.current[index]?.classList.remove(
    //           // //   Styles.mohreh,
    //           // //   Styles.mohrehWined,
    //           // //   Styles.lineWined
    //           // // );
    //           // ////zare_nk_050410_commented_end
    //           // BtnsColor[index] = Styles.mohrehCliked;   
    //           return (Styles.mohrehCliked);
    //         } else {
    //           // ////zare_nk_050410_commented_st
    //           // // refForBtn.current[index]?.classList.add(Styles.mohreh);
    //           // // refForBtn.current[index]?.classList.remove(
    //           // //   Styles.mohrehCliked,
    //           // //   Styles.mohrehWined,
    //           // //   Styles.lineWined
    //           // // );
    //           // ////zare_nk_050410_commented_end
    //           // BtnsColor[index] = Styles.mohreh;
    //           return (Styles.mohreh);
    //         }
    //         // refForBtn.current[index].disabled="disabled";  //zare_nk_040120(baraye disable kardane dokmeha baraye entezar)  
    //       });

    //   await setBtnsColor(() => {
    //     return (
    //       tempArray   
    //     )
    //   });
    //   console.log("050411-tempArray: " + tempArray)

    //   // localStorage.setItem("BtnsColor", JSON.stringify(BtnsColor));
    //   localStorage.setItem("BtnsColor", JSON.stringify(tempArray));

    //   console.log("winner nulle-xIsNextState: " + xIsNextState);

    //   // status = (xIsNextState ? "X" : "O") + " : نوبت بازیکن ";  ////zare_nk_050410_commented
    //   setStatus((xIsNextState ? "X" : "O") + " : نوبت بازیکن ");  ////zare_nk_050410_added
    //   localStorage.setItem("status", JSON.stringify((xIsNextState ? "X" : "O") + " : نوبت بازیکن ")); ////zare_nk_050410_added

    //   if (refForWinnerOrNobat.current) {
    //     refForWinnerOrNobat.current.style.color = "inherit";
    //   }
    // }
    ////zare_nk_050410_added_end

    setLastMove(true);
    localStorage.setItem("lastMove", JSON.stringify(true));
    // onPlay(nextSquares);  ////zare_nk_050410_commented
    onPlay(refFornextSquares.current);  ////zare_nk_050410_added
  }

  ////zare_nk_050410_added_st
  useEffect(() => {
    console.log('11111');
    ////zare_nk_050410_added_st 
    let winner = null;
    if (refFornextSquares.current) {
      winner = calculateWinner(refFornextSquares.current);
    }

    // let status;  ////zare_nk_050410_commented(be jaye moteghayer az useState estefadeh shod)

    if (winner) {
      console.log('11111-winner');
      let tempArray = null;
      tempArray = [...Array(9)].map((item1, index1) => {
        let thisStyles = Styles.mohreh;
        winner.map((item, index2) => {
          if (index2 == 0) {
            //khaneye avvale winner nobat ra taein mikone(X ya Y)
            return;
          }
          if (
            typeof item === "number" && // تضمین عدد بودن  
            item == index1 &&
            item != lastButton// lastButton
          ) {
            console.log('1313-1-item: ' + item + '-lastButton: ' + lastButton + '-currentMove: ' + currentMove);
            // BtnsColor[winner[index]] = Styles.lineWined;
            // return(Styles.lineWined);
            thisStyles = Styles.lineWined;
          } else if (
            typeof item === "number" && // تضمین عدد بودن  
            item == index1 &&
            item == lastButton //lastButton
          ) {
            console.log('1313-2-item: ' + item + '-lastButton: ' + lastButton + '-i: ' + currentMove);
            // BtnsColor[winner[index]] = Styles.mohrehWined;
            // return(Styles.mohrehWined);
            thisStyles = Styles.mohrehWined;
          }
          // else{
          //   thisStyles = Styles.mohreh;
          // }                 
        })
        console.log("thisStyles oo: " + thisStyles);
        return (thisStyles);
      });

      setBtnsColor(() => {
        return (
          tempArray
        )
      });

      console.log("1212-tempArray2: " + JSON.stringify(tempArray))
      localStorage.setItem("BtnsColor", JSON.stringify(tempArray));

      // status = winner[0] + " : برنده";  ////zare_nk_050410_commented

      setStatus(winner[0] + " : برنده");  ////zare_nk_050410_added
      localStorage.setItem("status", JSON.stringify(winner[0] + " : برنده")); ////zare_nk_050410_added
      setTimerDisplay("none");  ////zare_nk_050410_added
      localStorage.setItem("timerDisplay", JSON.stringify("none"));  ////zare_nk_050410

      console.log(
        "winner not nul-typeof(winner):" +
        typeof winner +
        "-winner.lenght: " +
        winner.length +
        "-winner: " +
        JSON.stringify(winner) +
        "---status: " +
        status
      );

      console.log(
        "050411-storedBtnsColor is: " + localStorage.getItem("BtnsColor")
      );

      if (refForWinnerOrNobat.current) {
        refForWinnerOrNobat.current.style.color = "blue";
      }
    }
    else {
      console.log('11111-!!winner');
      let tempArray = [...Array(9)].map((item, index) => {
        if (index == currentMove) {
          // ////zare_nk_050410_commented_st
          // // refForBtn.current[index]?.classList.add(Styles.mohrehCliked);
          // // refForBtn.current[index]?.classList.remove(
          // //   Styles.mohreh,
          // //   Styles.mohrehWined,
          // //   Styles.lineWined
          // // );
          // ////zare_nk_050410_commented_end
          // BtnsColor[index] = Styles.mohrehCliked;   
          return (Styles.mohrehCliked);
        } else {
          // ////zare_nk_050410_commented_st
          // // refForBtn.current[index]?.classList.add(Styles.mohreh);
          // // refForBtn.current[index]?.classList.remove(
          // //   Styles.mohrehCliked,
          // //   Styles.mohrehWined,
          // //   Styles.lineWined
          // // );
          // ////zare_nk_050410_commented_end
          // BtnsColor[index] = Styles.mohreh;
          return (Styles.mohreh);
        }
        // refForBtn.current[index].disabled="disabled";  //zare_nk_040120(baraye disable kardane dokmeha baraye entezar)  
      });

      setBtnsColor(() => {
        return (
          tempArray
        )
      });
      console.log("050411-tempArray: " + tempArray)

      // localStorage.setItem("BtnsColor", JSON.stringify(BtnsColor));
      localStorage.setItem("BtnsColor", JSON.stringify(tempArray));

      console.log("winner nulle-xIsNextState: " + xIsNextState);

      // status = (xIsNextState ? "X" : "O") + " : نوبت بازیکن ";  ////zare_nk_050410_commented
      setStatus((xIsNextState ? "X" : "O") + " : نوبت بازیکن ");  ////zare_nk_050410_added
      localStorage.setItem("status", JSON.stringify((xIsNextState ? "X" : "O") + " : نوبت بازیکن ")); ////zare_nk_050410_added

      if (refForWinnerOrNobat.current) {
        refForWinnerOrNobat.current.style.color = "inherit";
      }
    }
    ////zare_nk_050410_added_end
    // }, [currentMove]);
  }, [refFornextSquares.current]);
  ////zare_nk_050410_added_end

  // const winner = calculateWinner(squares);
  // let status;
  // if (winner) {
  //   status = winner[0] + " : برنده";
  //   console.log(
  //     "winner not nul-typeof(winner):" +
  //     typeof winner +
  //     "-winner.lenght: " +
  //     winner.length +
  //     "-winner: " +
  //     JSON.stringify(winner) +
  //     "---status: " +
  //     status
  //   );

  //   console.log(
  //     "050411-storedBtnsColor is: " + localStorage.getItem("BtnsColor")
  //   ); 

  //   if (refForWinnerOrNobat.current) {
  //     refForWinnerOrNobat.current.style.color = "blue";
  //   }
  // } else {
  //   console.log("winner nulle-xIsNextState: " + xIsNextState);
  //   status = (xIsNextState ? "X" : "O") + " : نوبت بازیکن ";
  //   if (refForWinnerOrNobat.current) {
  //     refForWinnerOrNobat.current.style.color = "inherit";
  //   }
  // }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          marginBottom: "15px",
          marginTop: "15px",
        }}
      >
        <div
          ref={refForWinnerOrNobat}
          className="status"
          style={{
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            marginRight: "10px",
            color: "#4b494a",
          }}
        >
          {status}
        </div>
        {timerDisplay == 'flex' &&

          <div
            ref={refForTimerCont}
            id="timermoveOpportunityCont"
            style={{
              display: timerDisplay,
              flexFlow: "row",
            }}
          >
            <div
              ref={refForTimer}
              id="timermoveOpportunity"
              style={{ display: "flex", flexFlow: "row", color: "red" }}
            >
              {hToString != null && (
                <>
                  <span
                    style={{
                      borderRadius: "5px",
                      width: "30px",
                      height: "30px",
                      backgroundColor: "red",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {hToString}
                  </span>
                  <span
                    style={{
                      color: "red",
                      padding: "0px 5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    :
                  </span>
                </>
              )}

              {mToString && (
                <span
                  style={{
                    borderRadius: "5px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "red",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {mToString}
                </span>
              )}
              {sToString && (
                <>
                  <span
                    style={{
                      color: "red",
                      padding: "0px 5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      borderRadius: "5px",
                      width: "30px",
                      height: "30px",
                      backgroundColor: "red",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {sToString}
                  </span>
                </>
              )}
              {/* : <span style={{ borderRadius: '5px', width: '30px', height: '30px', backgroundColor: 'red', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {mToString}
          </span>
          <span style={{ color: 'red', padding: '0px 5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>:</span>
          <span style={{ borderRadius: '5px', width: '30px', height: '30px', backgroundColor: 'red', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            sToString
          </span> */}
            </div>

            <span
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            >
              {" "}
              :{" "}
            </span>
            <span
              style={{ display: "flex", flexFlow: "row", alignItems: "center" }}
            >
              فرصت حرکت
            </span>
          </div>
        }
      </div>

      <div
        style={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          width: "200px",
          height: "200px",
          border: "2px solid #6A6A6A",
          borderRadius: "10px",
          boxShadow: "0px 0px 3px 1px #6A6A6A",
          overflow: "hidden",
        }}
      >
        {squares.map((_, index) => {
          console.log('squares.length: ' + squares.length)
          // if (index == squares.length - 1) {  ////zare_nk_050409_commented
          if (index == squares.length - 1 || index == squares.length - 2) {  ////zare_nk_050409_added
            return;
          }

          const storedBtnsColor = localStorage.getItem("BtnsColor");
          let jsonedBtnsColor;
          let buttonClassName = Styles.mohreh;
          if (storedBtnsColor && storedBtnsColor != "undefined") {
            console.log('storedBtnsColor iss: ' + storedBtnsColor)
            jsonedBtnsColor = JSON.parse(storedBtnsColor);
          } else {
            jsonedBtnsColor = null; // یا مقدار پیش‌فرض دیگه
          }
          if (jsonedBtnsColor) {
            buttonClassName = jsonedBtnsColor[index];
          }

          return (
            <Square
              key={index}
              buttonContClassName={Styles.tripleInRow}
              buttonClassName={buttonClassName}
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              andis={index}
              refForBtn={refForBtn}
            />
          );
        })}
      </div>
    </>
  );
}
// SquareValue = "X" | "O" | null | number ; 
export default function Game() {
  console.log("zare_nk_050126-Game called!!");
  const refForBtn = useRef<(HTMLButtonElement | null)[]>(Array(9).fill(null)); ////zare_nk_041015_nokteh(refForBtn yek useref ast ke arayeei az dokmehaye dooz ast)
  // const BtnsColor: (string | null)[] = [...Array(9)].map(() => null);  ////zare_nk_050411_commented 
  const [BtnsColor, setBtnsColor] = useState<(string | null)[]>([...Array(9)].map(() => null));  ////zare_nk_050411_added 
  const storedHistory = localStorage.getItem("history");
  // console.log("ddddd-storedHistory: "+JSON.stringify(storedHistory))
  const [history, setHistory] = useState(
    // storedHistory !== null ? JSON.parse(storedHistory) : [Array(10).fill(null)]  ////zare
    storedHistory !== null ? JSON.parse(storedHistory) : [Array(11).fill(null)]
  );
  console.log(
    "zare_nk_040131-BtnsColor: " +
    BtnsColor +
    "-history.len: " +
    history.length +
    "-history: " +
    JSON.stringify(history)
  );
  console.log(
    "050410-history.len: " + history.length + "-history: " + JSON.stringify(history)
  );

  const storedCurrentMove = localStorage.getItem("currentMove");
  const [currentMove, setCurrentMove] = useState(  ////zare_nk_040528_nokteh(shamele andise akhare arayeye history ast ke be vaziate feliye chineshe mohrehaye dooz eshare mikoneh)
    storedCurrentMove !== null ? JSON.parse(storedCurrentMove) : 0
  );
  const currentSquares = history[currentMove];
  console.log("050410-storedHistory: " + JSON.stringify(storedHistory) + '-currentMove: ' + currentMove);
  console.log("050410-currentSquares: " + JSON.stringify(currentSquares));
  const storedxIsNextState = localStorage.getItem("xIsNextState");
  const [xIsNextState, setXIsNextState] = useState(
    storedxIsNextState !== null ? JSON.parse(storedxIsNextState) : true
  );
  const storedTimer = localStorage.getItem("timer");
  const [timer, setTimer] = useState(
    storedTimer !== null ? JSON.parse(storedTimer) : 5000
  );
  const storedLastMove = localStorage.getItem("lastMove");

  const [lastMove, setLastMove] = useState(  //zare_nk_040525_nokteh(state ke mige dokmehaye dooz click shodeh ya dokmehaye archiv)
    // (baraye dokmeh boodan ya h6 boodane akharin dikmeye arshiv karbord dareh)
    storedLastMove !== null ? JSON.parse(storedLastMove) : false
  );

  const intervalRef = useRef(null);

  const storedTimerDisplay = localStorage.getItem("timerDisplay");
  const [timerDisplay, setTimerDisplay] = useState(
    storedTimerDisplay !== null ? JSON.parse(storedTimerDisplay) : "flex"
  );

  const [hToString, setHToString] = useState<string | null>(null);
  const [mToString, setMToString] = useState<string | null>(null);
  const [sToString, setSToString] = useState<string | null>(null);

  const refFornextSquares = useRef<SquareValue[]>(null);  ////zare_nk_050410_added

  const handlePlay = //useCallback(   
    (nextSquares: any) => {
      console.log("zare_nk_040109-handlePlay called!!");
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      localStorage.setItem("history", JSON.stringify(nextHistory));
      setCurrentMove(nextHistory.length - 1);
      console.log("currentMove iss: " + currentMove);
      localStorage.setItem("currentMove", JSON.stringify(nextHistory.length - 1));
    }
  //   , [history, currentMove]
  // );

  async function jumpTo(nextMove: number) {
    setTimerDisplay("flex");
    localStorage.setItem("timerDisplay", JSON.stringify("flex"));  ////zare_nk_050410

    console.log("zare_nk_040123-jumpTo called!!");
    // clearInterval(intervalRef.current);  //zare_nk_040214_commented(chon vaghti setTimer(5000) ma ra be useEffecte meghdardehiye intervalRef.current mibare va 
    // anja bad az setInterval dastore return clearInterval darim )
    setTimer(5000);
    localStorage.setItem("timer", JSON.stringify(5000));
    setCurrentMove(nextMove);
    localStorage.setItem("currentMove", JSON.stringify(nextMove));

    refFornextSquares.current = history[nextMove].slice();   ////zare_nk_050410_added

    let tempArray = null;
    await setBtnsColor(() => {
      return (
        tempArray = [...Array(9)].map((item, index) => {
          if (index == history[nextMove][history[nextMove].length - 1]) {
            // ////zare_nk_050410_commented_st
            // // refForBtn.current[index]?.classList.add(Styles.mohrehCliked);
            // // refForBtn.current[index]?.classList.remove(
            // //   Styles.mohreh,
            // //   Styles.mohrehWined,
            // //   Styles.lineWined
            // // );
            // ////zare_nk_050410_commented_end
            // BtnsColor[index] = Styles.mohrehCliked;   
            return (Styles.mohrehCliked);
          } else {
            // ////zare_nk_050410_commented_st
            // // refForBtn.current[index]?.classList.add(Styles.mohreh);
            // // refForBtn.current[index]?.classList.remove(
            // //   Styles.mohrehCliked,
            // //   Styles.mohrehWined,
            // //   Styles.lineWined
            // // );
            // ////zare_nk_050410_commented_end
            // BtnsColor[index] = Styles.mohreh;
            return (Styles.mohreh);
          }
          // refForBtn.current[index].disabled="disabled";  //zare_nk_040120(baraye disable kardane dokmeha baraye entezar)  
        })
      )
    });
    console.log("050411-tempArray::: " + tempArray)
    // localStorage.setItem("BtnsColor", JSON.stringify(BtnsColor));
    localStorage.setItem("BtnsColor", JSON.stringify(tempArray));

    setLastMove(false);
    localStorage.setItem("lastMove", JSON.stringify(false));
    console.log(
      "zare_nk_040225-currentSquareee???: " +
      // JSON.stringify(history[nextMove][history[nextMove]])
      JSON.stringify(history[nextMove][history[nextMove].length - 1])
    );

    // if (history[nextMove][history[nextMove].length - 1] == "X") {   ////zare_nk_050409_commented(khaneye akhar marboot be akharin click va khaneye ghable akhar marboot be nobate x ya y hast)
    if (history[nextMove][history[nextMove].length - 2] == "X") {   ////zare_nk_050409_added(khaneye akhar marboot be akharin click va khaneye ghable akhar marboot be nobate x ya y hast)
      setXIsNextState(false);
      localStorage.setItem("xIsNextState", JSON.stringify(false));
    } else {
      setXIsNextState(true);
      localStorage.setItem("xIsNextState", JSON.stringify(true));
    }
  }

  // const moves = history.map((squares: string, move: number) => {  //zare_nk_041124_commented
  const moves = history.map((squares: Squares, move: number) => {  //zare_nk_041124_addeed
    //item_: string, index: number
    let mokhtasatInDescription = " ترتیب مهره های آرشیو : ";
    let SquareInHistory = history[move];
    SquareInHistory.map((square: string | null, index: number) => {
      // if (index == SquareInHistory.length - 1) {  ////zare_nk_050409_commented
      if (index == SquareInHistory.length - 1 || index == SquareInHistory.length - 2) {  ////zare_nk_050409_added(khaneye akhar marboot be akharin click va khaneye ghable akhar marboot be nobate x ya y hast)
        return;
      }
      if (move == 0) {
        mokhtasatInDescription = "";
      }
      else if (SquareInHistory[index] != null) {
        if (mokhtasatInDescription != " ترتیب مهره های آرشیو : ") {
          mokhtasatInDescription += " - ";
        }
        mokhtasatInDescription += index;
      }
    });

    let description;
    const parsedStoredCurrentMove = storedCurrentMove !== null ? JSON.parse(storedCurrentMove) : 0
    if (move == parsedStoredCurrentMove) {
      description = "شما در آرشیو " + (move + 1) + " هستید ";
    } else {
      description = "بروهه به آرشیو " + (move + 1);
    }

    return history.length <= 1 ? (
      <li key={move} className={Styles.historyItem}>
        <h5 style={{ color: "red" }}>
          {description} {mokhtasatInDescription}
        </h5>
      </li>
    ) : move < history.length - 1 ? (
      <li key={move} className={Styles.historyItem}>
        <button
          onClick={() => jumpTo(move)}
          className={Styles.historyItemBottun}
        >
          {description}
        </button>
        <span> {mokhtasatInDescription}</span>
      </li>
    ) : !lastMove ? (
      <li key={move} className={Styles.historyItem}>
        <button
          onClick={() => jumpTo(move)}
          className={Styles.historyItemBottun}
        >
          {description}
        </button>
        <span> {mokhtasatInDescription}</span>
      </li>
    ) : (
      <li key={move} className={Styles.historyItem}>
        <span style={{ color: "red" }}> {description}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>{mokhtasatInDescription}</span>
      </li>
    );
  });

  return (
    <div className="game">
      <div className={Styles.gameBoard}>
        <Board
          squares={currentSquares}
          onPlay={handlePlay}
          refForBtn={refForBtn}
          timer={timer}
          setTimer={setTimer}
          xIsNextState={xIsNextState}
          setXIsNextState={setXIsNextState}
          setLastMove={setLastMove}
          lastMove={lastMove}  ////zare_nk_050410_added
          BtnsColor={BtnsColor}
          setBtnsColor={setBtnsColor}  ////zare_nk_050410_added
          intervalRef={intervalRef}
          timerDisplay={timerDisplay}
          setTimerDisplay={setTimerDisplay}
          hToString={hToString}
          setHToString={setHToString}
          mToString={mToString}
          setMToString={setMToString}
          sToString={sToString}
          setSToString={setSToString}
          currentMove={currentMove}    ////zare_nk_050410_added
          refFornextSquares={refFornextSquares}   ////zare_nk_050410_added          
        />
      </div>
      <div className="game-info">
        <ol style={{ listStyle: "none" }}>{moves}</ol>
      </div>
    </div>
  );
}

type WinnerResult = [SquareValue, number, number, number];

function calculateWinner(squares: Squares): WinnerResult | null {
  console.log("zare_nk_040109-calculateWinner called!!");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}
