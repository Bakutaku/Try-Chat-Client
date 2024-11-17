/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

type DnDContextType = [string | null,(type:string)=> void]

interface DnDProviderProps {
    children : ReactNode
}


// DndContext作成
const DnDContext = createContext<DnDContextType>([null,(_) => {}]);

// プロバイダー
export const DnDProvider = ({children}:DnDProviderProps) => {
    // 状態変数
    const [type,setType] = useState<string | null>(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
}

export default DnDContext;

export const useDnD = () => {
    return useContext(DnDContext);
}