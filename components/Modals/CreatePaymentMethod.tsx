"use client";

import { PaymentProvider } from "@prisma/client";
import Input from "../Input";
import Modal from "../Modal";
import { useRef, useState } from "react";

export default function CreatePaymentMethod() {
  const secretKeyRef = useRef<HTMLInputElement>(null);
  const providerRef = useRef<HTMLSelectElement>(null);
  const [secretErr, setSecretErr] = useState("");

  const validate = async () => {
    if (!secretKeyRef.current?.value) {
      setSecretErr("You have to provide secret key");
      secretKeyRef.current?.focus();
      return false;
    }
    setSecretErr("");
    if (!providerRef.current?.value || providerRef.current.value === "def") {
      providerRef.current?.focus();
      return false;
    }
    return true;
  };

  const request = async () => {
    const body = {
      provider: providerRef.current?.value,
      secret: secretKeyRef.current?.value,
    };
    const response = await fetch("/api/payments", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return response;
  };

  return (
    <Modal
      btn={"Create a Payment Method"}
      label="Creating a Payment Method"
      request={request}
      validation={validate}
      style={"bright"}
    >
      <Input err={secretErr} name="Secret Key" ref={secretKeyRef} />
      <div className="form-control w-full mt-3">
        <label className="label">
          <span className="label-text">Choose a payment method</span>
        </label>
        <select
          defaultValue={"def"}
          ref={providerRef}
          className="select bg-secondary"
        >
          <option value="def" disabled>
            Select Provider
          </option>
          {Object.keys(PaymentProvider).map((provider) => (
            <option value={provider}>{provider}</option>
          ))}
        </select>
      </div>
    </Modal>
  );
}
