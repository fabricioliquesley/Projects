import { Badge } from "@/app/_components/ui/badge";
import { TransactionType } from "@prisma/client";

const transactionTypeMap = {
  DEPOSIT: {
    text: "Depósito",
    style: "bg-[#55B02E14] text-[#55B02E] hover:bg-[#55B02E14]",
  },
  EXPENSE: {
    text: "Despesa",
    style: "bg-[#E9303014] text-[#E93030] hover:bg-[#E9303014]",
  },
  INVESTMENT: {
    text: "Investimento",
    style: "bg-[#FFFFFF14] text-[#FFFFFF] hover:bg-[#FFFFFF14]",
  },
};

type TypeBadgeProps = {
  type: TransactionType;
};

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const { text, style } = transactionTypeMap[type];

  return (
    <Badge className={`font-bold ${style}`}>
      <div className="mr-2 size-2 rounded-full bg-current" />
      {text}
    </Badge>
  );
};
