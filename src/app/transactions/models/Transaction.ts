import { Category } from "./Category";

export class Transaction {
  constructor(
    public _id: string, // Ajoutez cette ligne pour inclure l'identifiant
    public description: string,
    public amount: number,
    public category: Category,
    public tags: string[], // Changez `[String]` en `string[]` pour suivre les conventions TypeScript
    public createdAt: Date,
    public typePayment: string,
  ) {}
}
