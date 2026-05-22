import { useState } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { dispatchNewEvent } from '@/utils/eventBus';

interface CalEvent {
  t: string;
  name: string;
  color: string;
}

const EVENTS: Record<number, CalEvent[]> = {
  3:  [{ t: '9:00',  name: 'Pipeline review',           color: '#6366F1' }],
  6:  [{ t: '14:00', name: 'Atlas Freight renewal call', color: '#10B981' }],
  8:  [{ t: '10:30', name: 'Vertex Health intro',        color: '#D97706' }],
  12: [{ t: '11:00', name: 'Quarterly board prep',       color: '#6366F1' }, { t: '15:30', name: 'Glasswing demo', color: '#10B981' }],
  14: [{ t: '9:30',  name: 'Wavelet AI QBR',             color: '#10B981' }],
  17: [{ t: '13:00', name: 'Pearl Maritime check-in',    color: '#6366F1' }],
  18: [{ t: '10:00', name: 'Aether Bank signoff',        color: '#E11D48' }, { t: '15:00', name: 'Team standup', color: '#475569' }],
  20: [{ t: '11:30', name: 'Lumen Mobility kickoff',     color: '#10B981' }],
  22: [{ t: '9:00',  name: 'Pipeline review',            color: '#6366F1' }],
  25: [{ t: '14:00', name: 'Helios Robotics demo',       color: '#D97706' }],
  27: [{ t: '10:00', name: 'Northwind expansion call',   color: '#10B981' }],
};

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const FIRST_OFFSET = 4;
const MONTH = 'May 2026';
const TODAY = 20;

const THIS_WEEK = [
  { d: 'Mon · May 18', n: '2 events' },
  { d: 'Tue · May 19', n: '0 events' },
  { d: 'Wed · May 20', n: '1 event' },
  { d: 'Thu · May 21', n: '3 events' },
  { d: 'Fri · May 22', n: '1 event' },
];

export function CalendarView() {
  const [selected, setSelected] = useState(TODAY);
  const todays = EVENTS[selected] || [];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Calendar</h1>
          <div className="sub">{MONTH} · 14 events · synced from Google Cal</div>
        </div>
        <div className="right">
          <div className="seg">
            <button>Day</button>
            <button>Week</button>
            <button className="on">Month</button>
            <button>Schedule</button>
          </div>
          <button className="btn"><Icon name="chevron" size={13} style={{ transform: 'rotate(90deg)' }}/></button>
          <button className="btn">{MONTH}</button>
          <button className="btn"><Icon name="chevron" size={13} style={{ transform: 'rotate(-90deg)' }}/></button>
          <button className="btn btn-primary" onClick={dispatchNewEvent}><Icon name="plus" size={13}/> New event</button>
        </div>
      </div>

      <div className="row" style={{ gridTemplateColumns: '2.4fr 1fr' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="cal-head">
            {WEEK_DAYS.map(d => (
              <div key={d} className="cal-head-cell">{d}</div>
            ))}
          </div>
          <div className="cal-grid">
            {Array.from({ length: FIRST_OFFSET }, (_, i) => (
              <div key={'pad' + i} className="cal-cell empty"></div>
            ))}
            {DAYS.map(d => {
              const evs = EVENTS[d] || [];
              return (
                <button
                  key={d}
                  className={'cal-cell' + (d === TODAY ? ' today' : '') + (d === selected ? ' selected' : '')}
                  onClick={() => setSelected(d)}
                >
                  <div className="cal-day-num">{d}</div>
                  <div className="cal-events">
                    {evs.slice(0, 2).map((e, i) => (
                      <div key={i} className="cal-event">
                        <span className="cal-event-dot" style={{ background: e.color }}/>
                        <span className="cal-event-name">{e.t} · {e.name}</span>
                      </div>
                    ))}
                    {evs.length > 2 && <div className="cal-more">+{evs.length - 2} more</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">{selected === TODAY ? 'Today' : `May ${selected}`}</div>
              <div className="card-sub">{todays.length} event{todays.length === 1 ? '' : 's'}</div>
            </div>
          </div>
          {todays.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No events scheduled.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todays.map((e, i) => (
                <div key={i} className="schedule-row">
                  <div className="schedule-time">{e.t}</div>
                  <div className="schedule-bar" style={{ background: e.color }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="schedule-name">{e.name}</div>
                    <div className="schedule-meta">30 min · Google Meet</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 22, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>This week</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              {THIS_WEEK.map(d => (
                <div key={d.d} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ color: 'var(--text)' }}>{d.d}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{d.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
