import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';


// 引数
interface Props{
  text : string;
  setText : Dispatch<SetStateAction<string>>;
}


const ReactSimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

/**
 * Markdownのエディタ
 */
export default function MarkdownEditor({text,setText}:Props){
  return (
    <ReactSimpleMdeEditor value={text} onChange={setText} />
  );
}