import { Icon } from '@/components/Icon/Icon';
import { STAGES } from '@/data/seed';
import { avatarColor } from '@/utils/avatarColor';
import { dispatchNewDeal } from '@/utils/eventBus';
import type { DealsByStage } from '@/types';

interface DealsViewProps {
  deals: DealsByStage;
}

export function DealsView({ deals }: DealsViewProps) {
  const flat = Object.entries(deals).flatMap(([stage, list]) => list.map(d => ({ ...d, stage })));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Deals</h1>
          <div className="sub">{flat.length} deals across {Object.keys(deals).length} stages</div>
        </div>
        <div className="right">
          <button className="btn btn-primary" onClick={dispatchNewDeal}><Icon name="plus" size={13}/> New deal</button>
        </div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Deal</th><th>Company</th><th>Stage</th><th style={{ textAlign: 'right' }}>Value</th><th>Tag</th><th>Owners</th></tr>
            </thead>
            <tbody>
              {flat.map(d => {
                const stage = STAGES.find(s => s.id === d.stage);
                return (
                  <tr key={d.id}>
                    <td><div className="cust-name">{d.name}</div></td>
                    <td>{d.co}</td>
                    <td>
                      {stage && (
                        <span className="status active" style={{ color: stage.color, background: stage.color + '26' }}>{stage.name}</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 500 }}>${d.value.toLocaleString()}</td>
                    <td><span className={'tag ' + d.tag}>{d.tag}</span></td>
                    <td>
                      <div className="avatars">
                        {d.members.map((m, i) => (
                          <div key={i} className="avatar" style={{ width: 22, height: 22, fontSize: 9, background: avatarColor(m), color: '#fff', borderColor: 'transparent' }}>{m}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
