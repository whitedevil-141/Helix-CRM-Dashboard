import type { DealsByStage, Stage, Customer, ActivityItem, FunnelStage } from '@/types';
import { getHelixData } from '@/data/inMemoryDb';

const DATA = getHelixData();

export const SEED_DEALS: DealsByStage = DATA.SEED_DEALS;
export const STAGES: Stage[] = DATA.STAGES;
export const CUSTOMERS: Customer[] = DATA.CUSTOMERS;
export const ACTIVITY: ActivityItem[] = DATA.ACTIVITY;
export const REV_THIS = DATA.REV_THIS;
export const REV_LAST = DATA.REV_LAST;
export const MONTHS = DATA.MONTHS;
export const FUNNEL: FunnelStage[] = DATA.FUNNEL;
export const HEAT = DATA.HEAT;
