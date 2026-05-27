export default function NoteHeader({ isFollowing, onFollow }) {
  return (
    <>
      <div className="sb">
        <span className="sb-t">9:41</span>
        <span className="sb-r">📶 🔋</span>
      </div>
      <div className="tnav">
        <button className="tn-back" aria-label="返回">‹</button>
        <div className="tn-av">PM</div>
        <span className="tn-name">产品小陈 · 在新加坡</span>
        <button
          className={`tn-follow${isFollowing ? ' ing' : ''}`}
          onClick={onFollow}
        >
          {isFollowing ? '已关注' : '+ 关注'}
        </button>
        <span className="tn-share">···</span>
      </div>
    </>
  );
}
