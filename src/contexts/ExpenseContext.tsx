import { createContext, useContext, useEffect, useRef, useState } from "react";

import type { Expense } from "../types/expense";

import { getExpenses, saveExpense } from "../services/expenseStorage";

import { useAuth } from "./AuthContext";

// Dados e funções disponíveis através do contexto.
type ExpenseContextProps = {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expense: Omit<Expense, "id" | "userId">) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
};

// Criamos o contexto para partilhar as despesas entre componentes.
const ExpenseContext = createContext<ExpenseContextProps | undefined>(
  undefined,
);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Vamos buscar o user autenticado.
  const { user, loading: authLoading } = useAuth();

  // Estado que guarda a lista de despesas.
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Indica se as despesas ainda estão a ser carregadas.
  const [loading, setLoading] = useState(true);

  // Mantém uma referência à lista mais recente de despesas.
  const expensesRef = useRef<Expense[]>([]);

  // Carrega as despesas sempre que o user muda.
  useEffect(() => {
    let active = true;

    async function loadExpenses() {
      // Espera que a autenticação termine.
      if (authLoading) {
        return;
      }

      // Se não houver user, limpamos a lista.
      if (!user) {
        expensesRef.current = [];
        setExpenses([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Carrega as despesas guardadas para este user.
        const storedExpenses = await getExpenses(user.id);

        if (active) {
          expensesRef.current = storedExpenses;
          setExpenses(storedExpenses);
        }
      } catch (error) {
        console.error("Erro ao carregar despesas:", error);

        if (active) {
          expensesRef.current = [];
          setExpenses([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadExpenses();

    // Impede que um carregamento antigo atualize os estados.
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  // Adiciona uma nova despesa.
  const addExpense = async (
    expense: Omit<Expense, "id" | "userId">,
  ): Promise<void> => {
    if (!user) {
      throw new Error("É necessário iniciar sessão.");
    }

    // Criamos a despesa com um ID e o ID do user.
    const newExpense: Expense = {
      ...expense,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId: user.id,
    };

    // Juntamos a nova despesa às restantes.
    const updatedExpenses = [...expensesRef.current, newExpense];

    // Guardamos a lista atualizada.
    await saveExpense(user.id, updatedExpenses);

    expensesRef.current = updatedExpenses;
    setExpenses(updatedExpenses);
  };

  // Atualiza uma despesa existente.
  const updateExpense = async (updatedExpense: Expense): Promise<void> => {
    if (!user) {
      throw new Error("É necessário iniciar sessão.");
    }

    // Substituímos a despesa antiga pela atualizada.
    const updatedExpenses = expensesRef.current.map((expense) =>
      expense.id === updatedExpense.id
        ? { ...updatedExpense, userId: user.id }
        : expense,
    );

    await saveExpense(user.id, updatedExpenses);

    expensesRef.current = updatedExpenses;
    setExpenses(updatedExpenses);
  };

  // Elimina uma despesa através do seu ID.
  const deleteExpense = async (expenseId: string): Promise<void> => {
    if (!user) {
      throw new Error("É necessário iniciar sessão.");
    }

    // Criamos uma lista sem a despesa selecionada.
    const updatedExpenses = expensesRef.current.filter(
      (expense) => expense.id !== expenseId,
    );

    await saveExpense(user.id, updatedExpenses);

    expensesRef.current = updatedExpenses;
    setExpenses(updatedExpenses);
  };

  // Disponibiliza os dados e funções aos restantes componentes.
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

// Hook para aceder ao contexto sem repetir useContext.
export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses deve ser utilizado dentro de ExpenseProvider.",
    );
  }

  return context;
};
