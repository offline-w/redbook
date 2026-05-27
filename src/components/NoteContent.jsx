export default function NoteContent() {
  return (
    <>
      <h1 className="note-title">
        用 AI 把"今天好累"变成一条城市微冒险路线 🗺️
      </h1>
      <div className="note-body">
        <p>
          上周下午三点，我盯着屏幕发呆，突然想——<strong>能不能把我的"当下状态"直接变成一条可以走的城市路线？</strong>
        </p>
        <p>
          于是我花了两周做了这个 Demo：输入你的心情和约束，AI 会帮你生成一条专属城市微冒险路线，带路线图、任务清单，还有小红书格式的分享文案。
        </p>
        <p>下面是交互 Demo，可以直接试玩 👇</p>
      </div>
      <div className="note-tags">
        <span className="ntag">#城市微冒险</span>
        <span className="ntag">#AI产品</span>
        <span className="ntag">#新加坡</span>
        <span className="ntag">#产品经理日常</span>
        <span className="ntag">#side project</span>
      </div>
    </>
  );
}
