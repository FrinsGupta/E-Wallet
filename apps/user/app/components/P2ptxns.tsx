import { Card } from "@repo/ui/card";
import React from "react";

const P2ptxns = ({
  transactions,
  receiver,
}: {
  transactions: {
    id: string,
    timestamp: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific
  }[];
  receiver: string;
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div key={t.id} className="flex justify-between my-1">
            <div>
              <div className="text">Paid to {receiver}</div>
              <div className="text-slate-600 text-sm">
                {t.timestamp?.toDateString()}
              </div>
            </div>
            {/* <div className="flex justify-center items-center"> <p className="text-red-600">Debited </p> Rs {t.amount}</div> */}
            <div className="flex justify-center items-center"> - Rs {t.amount}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default P2ptxns;
