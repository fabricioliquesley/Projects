"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeBadge } from "../_components/type-badge";
import { currencyConverter } from "@/app/_lib/currencyConverter";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import { dateFormatter } from "@/app/_lib/dateFormatter";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TypeBadge type={transaction.type} />;
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_CATEGORY_LABELS[transaction.category];
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod];
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return dateFormatter(transaction.date);
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(currencyConverter.toMoney(transaction.amount));
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <div className="flex gap-1">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-muted-foreground"
        >
          <PencilIcon />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-muted-foreground"
        >
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
