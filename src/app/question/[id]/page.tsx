// ページの引数
interface Params {
  params: {
    id: string; // 投稿ID
  };
}

export default function QuestionItemPage({ params }: Params) {
  return <>{params.id}の質問</>;
}
