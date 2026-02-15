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
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] p-4">
      {/* Eos Branding Section */}
      <div className="flex flex-col items-center lg:items-start max-w-[500px] text-center lg:text-left">
        <img 
          src="/logo.png" 
          width="120" 
          height="120" 
          alt="Eos Logo" 
          className="mb-6 rounded-2xl shadow-sm" 
        />
        <h1 className="text-6xl font-bold text-[#ff8c00] tracking-tight">
          Eosocial
        </h1>
        <p className="text-2xl mt-3 text-gray-700 dark:text-gray-300 leading-tight">
          A new dawn for social connection.
        </p>
      </div>

      {/* Login Box Section */}
      <div className="w-full max-w-[400px] bg-white dark:bg-[#242526] p-6 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input 
            id="email" 
            label="Email" 
            disabled={isLoading} 
            register={register} 
            errors={errors} 
            required 
          />
          <Input 
            id="password" 
            label="Password" 
            type="password" 
            disabled={isLoading} 
            register={register} 
            errors={errors} 
            required 
          />
          <Button 
            label="Log In" 
            onClick={handleSubmit(onSubmit)} 
            disabled={isLoading} 
            className="bg-[#ff8c00] hover:bg-[#e67e00]"
          />
        </form>
        
        <div className="text-center my-4">
          <span className="text-blue-600 text-sm cursor-pointer hover:underline">
            Forgotten password?
          </span>
        </div>
        
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
        
        <div className="flex justify-center">
          <button 
            type="button"
            onClick={signupModal.onOpen}
            className="bg-[#42b72a] hover:bg-[#36a420] text-white font-bold py-3 px-6 rounded-md transition"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
