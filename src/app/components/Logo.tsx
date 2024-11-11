import Image from "next/image";


// 引数
interface Params {
  width? : string
  height? : string
  responsive? : boolean
}

/**
 * Try-Chatのアイコン
 */
export default function Logo({width = "178px",height = "82px", responsive}:Params){
  return (
    <Image className="svg-shadow" width={178} height={82} style={{ width: width, height: height }} src="Try-Chat_icon.svg" alt={"Logo"} layout={responsive? "responsive" : ""} priority/>
  );
}