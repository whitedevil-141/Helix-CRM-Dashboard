/* global React */
const { useState, useRef } = React;

function Pipeline({ deals, setDeals, stages }) {
  const [dragId, setDragId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const onDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', id); } catch (_) {}
  };
  const onDragEnd = () => { setDragId(null); setDragOverCol(null); };
  const onDragOver = (e, col) => { e.preventDefault(); setDragOverCol(col); };
  const onDrop = (e, col) => {
    e.preventDefault();
    if (!dragId) return;
    // find current column
    let sourceCol = null, deal = null;
    for (const k of Object.keys(deals)) {
      const d = deals[k].find(d => d.id === dragId);
      if (d) { sourceCol = k; deal = d; break; }
    }
    if (!deal || sourceCol === col) { setDragId(null); setDragOverCol(null); return; }
    setDeals(prev => {
      const next = { ...prev };
      next[sourceCol] = prev[sourceCol].filter(d => d.id !== dragId);
      // bump progress when moved forward
      const stageIdx = stages.findIndex(s => s.id === col);
      const progressMap = [18, 40, 60, 80, 100];
      const moved = { ...deal, progress: progressMap[stageIdx] ?? deal.progress };
      next[col] = [moved, ...prev[col]];
      return next;
    });
    setDragId(null); setDragOverCol(null);
  };

  return (
    <div className="pipe">
      {stages.map(stage => {
        const items = deals[stage.id] || [];
        const total = items.reduce((s, d) => s + d.value, 0);
        return (
          <div
            key={stage.id}
            className={"pipe-col" + (dragOverCol === stage.id ? " drag-over" : "")}
            onDragOver={(e) => onDragOver(e, stage.id)}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => onDrop(e, stage.id)}
          >
            <div className="pipe-col-head">
              <div className="pipe-col-title">
                <span className="swatch" style={{ background: stage.color, color: stage.color }}></span>
                {stage.name}
                <span className="pipe-col-count">{items.length}</span>
              </div>
              <span className="pipe-col-sum">${(total/1000).toFixed(1)}k</span>
            </div>

            {items.map(d => (
              <div
                key={d.id}
                className={"deal" + (dragId === d.id ? " dragging" : "")}
                draggable
                onDragStart={(e) => onDragStart(e, d.id)}
                onDragEnd={onDragEnd}
              >
                <div className="deal-top">
                  <div>
                    <div className="deal-name">{d.name}</div>
                    <div className="deal-co">{d.co}</div>
                  </div>
                  <div className="deal-value">${d.value >= 1000 ? `${(d.value/1000).toFixed(1)}k` : d.value}</div>
                </div>
                <div className="deal-progress"><div style={{ width: `${d.progress}%` }}/></div>
                <div className="deal-foot">
                  <span className={"tag " + d.tag}>{d.tag}</span>
                  <div className="avatars">
                    {d.members.map((m, i) => <div key={i} className="avatar" style={{ background: avatarColor(m), color: '#fff', borderColor: 'transparent' }}>{m}</div>)}
                  </div>
                </div>
              </div>
            ))}

            <button className="pipe-col-add" onClick={() => window.dispatchEvent(new CustomEvent('helix:new-deal'))}>+ Add deal</button>
          </div>
        );
      })}
    </div>
  );
}

const AVATAR_PALETTES = {
  SK: '#475569',
  MO: '#6B7280',
  AR: '#525B6E',
  DV: '#5C6776',
};
function avatarColor(init) {
  return AVATAR_PALETTES[init] || 'var(--card-hover)';
}

window.Pipeline = Pipeline;
window.avatarColor = avatarColor;
