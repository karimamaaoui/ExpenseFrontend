import { Category } from "./Category";

export class Transaction {
  constructor(
    public description: string,

    public amount: number,

    public category: Category,

    public tags: [String],
    public createdAt: Date,
    public typePayment: string,

  ) {}
}
