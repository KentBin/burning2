export type TransactionType =
  | 'earn'
  | 'spend';

export interface Transaction {
  id: string;

  type: TransactionType;

  amount?: number;

  points: number;

  description: string;

  createdAt: number;
}