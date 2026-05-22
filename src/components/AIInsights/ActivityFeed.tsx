import { Icon } from '@/components/Icon/Icon';
import type { ActivityItem } from '@/types';

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="feed">
      {items.map(a => (
        <div key={a.id} className="feed-item">
          <div className={'feed-ic ' + a.kind}>
            <Icon name={a.kind === 'success' ? 'check' : a.kind === 'warn' ? 'flame' : 'mail'} size={11}/>
          </div>
          <div className="feed-body">
            <div className="feed-text" dangerouslySetInnerHTML={{ __html: a.text }}/>
            <div className="feed-time">{a.time}{a.meta ? ` · ${a.meta}` : ''}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
