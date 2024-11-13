import PostItem from "./components/postItem";


export default function Home() {
  return (
    <div className="">
      <div className="fs-1 text-shadow">Try{"{"}</div>
      <div className="mx-5">
        <PostItem userName="UserName" title="タイトル" message="質問内容" userIcon="Try-Chat_icon.svg" />
      </div>
    </div>
  );
}
