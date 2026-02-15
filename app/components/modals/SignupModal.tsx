"use client"

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useSignupModal from "@/app/hooks/useSignupModal";

import Modal from "./Modal";
import Input from "../inputs/Input";

const SignupModal = () => {
  const signupModal = useSignupModal();
  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSending(true);

    axios.post('/api/signup', data)
      .then(() => {
        toast.success('Welcome to Eosocial!');
        reset();
        signupModal.onClose();
      })
      .catch(() => {
        toast.error("Error creating account. Check your connection.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Input
          id="firstName"
          label="First name"
          register={register}
          errors={errors}
          disabled={isSending}
          required
        />
        <Input
          id="lastName"
          label="Last name"
          register={register}
          errors={errors}
          disabled={isSending}
          required
        />
      </div>
      <Input
        id="email"
        label="Email" 
        type="email"
        register={register}
        errors={errors}
        disabled={isSending}
        required
      />
      <Input
        id="password"
        label="New password" 
        type="password"
        register={register}
        errors={errors}
        disabled={isSending}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isSending}
      isOpen={signupModal.isOpen}
      onClose={signupModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Create an Eosocial Account"
      subtitle="Join the new dawn of social connection."
      actionLabel="Sign Up"
      body={bodyContent}
    />
  );
};

export default SignupModal;
