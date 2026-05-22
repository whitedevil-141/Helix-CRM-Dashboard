import { Icon } from '@/components/Icon/Icon';
import { CustomersTable } from '@/components/Customers/CustomersTable';
import { CUSTOMERS } from '@/data/seed';
import { dispatchNewContact } from '@/utils/eventBus';
import type { Customer } from '@/types';

interface ContactsViewProps {
  onSelect: (customer: Customer) => void;
}

export function ContactsView({ onSelect }: ContactsViewProps) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Contacts</h1>
          <div className="sub">All customers across active and historical engagements.</div>
        </div>
        <div className="right">
          <button className="btn"><Icon name="download" size={13}/> Export</button>
          <button className="btn btn-primary" onClick={dispatchNewContact}><Icon name="plus" size={13}/> Add contact</button>
        </div>
      </div>
      <div className="card">
        <CustomersTable rows={CUSTOMERS} onSelect={onSelect}/>
      </div>
    </>
  );
}
