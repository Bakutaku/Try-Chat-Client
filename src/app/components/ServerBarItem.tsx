import Image from "next/image";


/**
 * サイドバーのサーバ選択の選択肢
 */
export default function ServerBarItem(){
    return (
        <li className="bg-text text-white rounded-circle m-2 d-flex justify-content-center align-items-center">
            <Image src={"Try-Chat_icon.svg"} alt={"Server Icon"} width={50} height={50} />
        </li>
    );
}