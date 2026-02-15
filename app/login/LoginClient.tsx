"use client"

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

import useSignupModal from "../hooks/useSignupModal";
import { UserContext } from "../providers/UserProvider";
import setTheme from "../lib/theme";

import Button from "../components/common/Button";
import Input from "../components/inputs/Input";

const LoginClient = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  // set theme on load
  useEffect(() => {
    setTheme();
  }, []);

  // reset user state on login page
  useEffect(() => {
    setUser({ id: "", name: "", image: "" });
  }, [setUser]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false })
      .then((callback) => {
        if (callback?.ok) {
          toast.success('Logged in!');
          router.push('/');
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col lg:
