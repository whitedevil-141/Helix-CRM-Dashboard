import { useState } from 'react';
import { moveDeal } from '@/data/inMemoryDb';
import { avatarColor } from '@/utils/avatarColor';
import { dispatchNewDeal } from '@/utils/eventBus';
import type { DealsByStage, Stage } from '@/types';

interface PipelineProps {
  deals: DealsByStage;
  stages: Stage[];
}

export function Pipeline({ deals, stages }: PipelineProps) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', id); } catch (_) {}
  };
  const onDragEnd = () => { setDragId(null); setDragOverCol(null); };
  const onDragOver = (e: React.DragEvent, col: string) => { e.preventDefault(); setDragOverCol(col); };
  const onDrop = (e: React.DragEvent, col: string) => {
    e.preventDefault();
    if (!dragId) return;
    moveDeal(dragId, col);
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
            className={'pipe-col' + (dragOverCol === stage.id ? ' drag-over' : '')}
            onDragOver={(e) => onDragOver(e, stage.id)}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => onDrop(e, stage.id)}
          >
            <div className="pipe-col-head">
              <div className="pipe-col-title">
                <span className="swatch" style={{ background: stage.color }}></span>
                {stage.name}
                <span className="pipe-col-count">{items.length}</span>
              </div>
              <span className="pipe-col-sum">${(total/1000).toFixed(1)}k</span>
            </div>

            {items.map(d => (
              <div
                key={d.id}
                className={'deal' + (dragId === d.id ? ' dragging' : '')}
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
                  <span className={'tag ' + d.tag}>{d.tag}</span>
                  <div className="avatars">
                    {d.members.map((m, i) => (
                      <div key={i} className="avatar" style={{ background: avatarColor(m), color: '#fff', borderColor: 'transparent' }}>{m}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button className="pipe-col-add" onClick={dispatchNewDeal}>+ Add deal</button>
          </div>
        );
      })}
    </div>
  );
}
