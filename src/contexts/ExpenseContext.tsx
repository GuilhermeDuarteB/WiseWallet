
import { createContext, useContext, useEffect, useState } from "react";

import type { Expense } from "../types/expense";
import { useAuth } from "./AuthContext";

// Define os dados e funções disponíveis através do Context.
type ExpenseContextProps = {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expense: Omit<Expense, "id" | "userId">) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
};

// Cria o Context que vai partilhar as despesas entre os componentes.
const ExpenseContext = createContext<ExpenseContextProps | undefined>(
  undefined
);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Obtém o utilizador autenticado.
  const { user, loading: authLoading } = useAuth();

  // Lista de despesas guardada em memória.
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Limpa as despesas quando o utilizador muda ou termina sessão.
  useEffect(() => {
    setExpenses([]);
  }, [user?.id]);

  // Indica se a autenticação ainda está a ser verificada.
  const loading = authLoading;

  // Adiciona uma nova despesa à lista.
  const addExpense = async (
    expense: Omit<Expense, "id" | "userId">
  ): Promise<void> => {
    if (!user) {
      throw new Error("É necessário iniciar sessão.");
    }

    // Criamos a despesa com um ID e o ID do utilizador.
    const newExpense: Expense = {
      ...expense,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId: user.id,
    };

    // Adicionamos a nova despesa à lista atual.
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      newExpense,
    ]);
  };

  // Atualiza uma despesa existente.
  const updateExpense = async (updatedExpense: Expense): Promise<void> => {
    if (!user) {
      throw new Error("É necessário iniciar sessão.");
    }

    // Substituímos a despesa antiga pela versão atualizada.
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? { ...updatedExpense, userId: user.id }
          : expense
      )
    );
  };

  // Elimina uma despesa através do seu ID.
  const deleteExpense = async (expenseId: string): Promise<void> => {
    if (!user) {
      throw new Error("É necessário iniciar sessão.");
    }

    // Criamos uma lista sem a despesa selecionada.
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId)
    );
  };

  // Disponibiliza a lista e as funções aos restantes componentes.
  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Hook para utilizar o Context sem repetir useContext.
export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses deve ser utilizado dentro de ExpenseProvider."
    );
  }

  return context;
};
