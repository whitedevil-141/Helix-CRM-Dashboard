import { Icon } from '@/components/Icon/Icon';
import { Pipeline } from '@/components/Pipeline/Pipeline';
import { STAGES } from '@/data/seed';
import { dispatchNewDeal } from '@/utils/eventBus';
import type { DealsByStage } from '@/types';

interface PipelineViewProps {
  deals: DealsByStage;
}

export function PipelineView({ deals }: PipelineViewProps) {
  const totalValue = Object.values(deals).flat().reduce((s, d) => s + d.value, 0);
  const totalCount = Object.values(deals).flat().length;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Pipeline</h1>
          <div className="sub">
            {totalCount} active deals ·{' '}
            <span style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>${totalValue.toLocaleString()}</span> weighted
          </div>
        </div>
        <div className="right">
          <div className="seg">
            <button className="on">Board</button>
            <button>List</button>
            <button>Forecast</button>
          </div>
          <button className="btn"><Icon name="filter" size={13}/> Filter</button>
          <button className="btn btn-primary" onClick={dispatchNewDeal}><Icon name="plus" size={13}/> New deal</button>
        </div>
      </div>
      <Pipeline deals={deals} stages={STAGES}/>
    </>
  );
}
