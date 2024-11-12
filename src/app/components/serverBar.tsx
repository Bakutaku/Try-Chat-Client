import ServerBarItem from "./ServerBarItem";

/**
 * サイドバーのサーバ選択欄
 */
export default function ServerBar(){
    return(
        <ul className="fs-3 bg-base-4 list-group rounded-pill server m-auto mt-2" style={{maxHeight:"20rem",width:"4rem"}}>
            
            <ServerBarItem />
            <ServerBarItem />
            <ServerBarItem />
            <ServerBarItem />
            <ServerBarItem /><ServerBarItem /><ServerBarItem /><ServerBarItem /><ServerBarItem />
            
            <li className="mt-auto server-add text-white rounded-circle m-2 d-flex justify-content-center align-items-center" style={{width:"3rem",height:"3rem"}}>
                <i className="bi bi-plus-lg"></i>
            </li>
        </ul>
    );
}