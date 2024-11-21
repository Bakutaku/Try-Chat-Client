'use client';
import Image from "next/image";
import { useState } from 'react';

const EditPage = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<string | null>(null);

  const handleIconClick = () => {
    // アイコン選択ロジックを実装する（例: モーダルを表示してアイコンを選択）
    const defaultIcons = [
      '/悪い忍者のフリーアイコン.png', 
      '/和食の大将.png', 
      '/社長のアイコン.png' // サンプルアイコンのパスを追加
    ];
    const selectedIcon = defaultIcons[Math.floor(Math.random() * defaultIcons.length)];
    setIcon(selectedIcon);
  };

  const handleSave = () => {
    alert(`保存しました\n名前: ${name}\nアイコン: ${icon}`);
    
  };

  return (
    <div className="container">
      <h1 className="header">編集画面</h1>
      <div
        className="icon-selector"
        onClick={handleIconClick}
        style={{
          backgroundImage: icon ? `url(${icon})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!icon && 'アイコンを選択'}
      </div>
      <div className="input-container">
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        保存
      </button>
    </div>
  );
};

export default EditPage;
