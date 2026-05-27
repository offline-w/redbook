export default function InteractionBar({ liked, likeCount, saved, saveCount, onLike, onSave }) {
  return (
    <div className="bbar">
      <input className="bb-in" placeholder="说点什么…" readOnly />
      <div className="bbactions">
        <div className="bba" onClick={onLike}>
          <span className="bba-ico" style={{ color: liked ? 'var(--red)' : undefined }}>
            {liked ? '❤️' : '🤍'}
          </span>
          <span className="bba-num">{likeCount}</span>
        </div>
        <div className="bba">
          <span className="bba-ico">💬</span>
          <span className="bba-num">32</span>
        </div>
        <div className="bba" onClick={onSave}>
          <span className="bba-ico" style={{ color: saved ? '#facc15' : undefined }}>
            {saved ? '⭐' : '☆'}
          </span>
          <span className="bba-num">{saveCount}</span>
        </div>
      </div>
    </div>
  );
}
