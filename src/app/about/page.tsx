////zare_nk_041010_okk
//src\app\about\page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/components/home.module.css";
import Image002 from "@/assets/images/002.jpg";
import { metadata as layoutMetadata} from "../layout"; //zare_nk_040131_nokteh(mitavan metadata ra az layout import nakard,inja import kardam ta roosh dastkari konam)
// metadata.title = metadata.title + '-abouuttiimm';  //zare_nk_040416_nokteh(in khat az nazare manteghi khatarnake ke metadataye import shodeh ro dastkari konim va momkene dar builde proujeh error bedeh)
export const metadata = {
    title: `${layoutMetadata.title} - About`, 
};

export default function Page() { 
  if (process.env.NODE_ENV === "production") { 
    console.log('zare_nk_040522_process.env.NODE_ENV === "production"');
    notFound(); //نمایش صفحه 404
    // یا redirect("/") // به صفحه اصلی بفرست
    return null;
  }
  return (
    <>
      {/* <title>{metadata.title}</title> */}  {/*zare_nk_040507_nokteh(neveshtane metadata dakhle tage title osooli nist va pishnahad nemishe,barnameh ham automat metadata ro beonvane mohtavaye tage title safhe dar nazar migire)*/} 
      <h1 className={styles.shape}>salam</h1>
      <img src="./images/002.jpg" style={{ border: "4px dashed silver" }} />
      <br />
      <Image alt="ggg" src={Image002} style={{ border: "4px dashed yellow" }} />
      <br />
      <img
        src="https://www.tutorialspoint.com/market/public/assets/newDesign/img/heroSliderItem6.svg"
        style={{ border: "6px dotted blue" }}
      />
      <br />
      <img
        src="https://www.netafraz.com//images/standard_service.png"
        style={{ border: "6px dotted blue" }}
      />
      <br />
      <Image
        alt="Image003"
        width="300"
        height="200"
        src="https://www.netafraz.com/images/standard_service.png"
        style={{ border: "4px dashed orange" }}
      />
    </>
  );
}
