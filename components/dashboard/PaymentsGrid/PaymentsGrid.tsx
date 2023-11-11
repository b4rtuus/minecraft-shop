"use client";

import PaymentOption from "./PaymentOption";
import CreatePaymentMethod from "@/components/Modals/CreatePaymentMethod";
import { usePayments } from "./hooks/usePayments";

export default function PaymentsGrid() {
  const { payments, addPayment, removePayment, editPayment } = usePayments();
  return (
    <>
      <CreatePaymentMethod callback={addPayment} />
      <div className="grid grid-cols-3 gap-3 mt-5">
        {payments.length < 1
          ? "Loading..."
          : payments.map((payment) => (
              <PaymentOption
                paymentOption={payment}
                removePayment={removePayment}
                editPayment={editPayment}
                key={payment.id}
              />
            ))}
      </div>
    </>
  );
}
