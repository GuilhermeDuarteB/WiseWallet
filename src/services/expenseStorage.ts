import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types/expense";

const getExpenseKey = (userId: string) => `@WiseWallet:expenses:${userId}`; //definir o id do user e conectar as despesas

export async function getExpenses(userId: string): Promise<Expense[]> {
  //vai devolver a lista de desoesas Expense[], se n tiver fca vazio

  const storedExpenses = await AsyncStorage.getItem(getExpenseKey(userId)); //cria a variavel e guarda as despesas do user

  if (!storedExpenses) {
    return [];
  }

  return JSON.parse(storedExpenses) as Expense[]; //converte a lista em json
}

export async function saveExpense(
  userId: string,
  expenses: Expense[],
): Promise<void> {
  await AsyncStorage.setItem(getExpenseKey(userId), JSON.stringify(expenses));
}
