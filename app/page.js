import Image from "next/image";
import styles from "./page.module.scss";
import Brain from "@/components/Brain/Brain";

export default function Home() {
  return (
    <>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Brain />
        <div style={{ position: "absolute", top: "40%", left: "30%" }}>
          {" "}
          <h1 style={{ color: "white" }}>HERE THOUGHTS</h1>
          <h1 style={{ color: "white" }}>BECOME BRAND</h1>
        </div>
      </div>
      <Brain curve={"curve"} />
    </>
  );
}
