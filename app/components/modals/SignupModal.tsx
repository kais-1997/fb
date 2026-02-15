"use client"

import { useState } from "react";
import useSetupModal from "@/app/hooks/useSetupModal";
import Modal from "./Modal";

const SetupModal = () => {
  const setupModal = useSetupModal();
  const [isSending, setIsSending] = useState(false);

  const onSubmit = () => {
    setupModal.onClose();
    // This usually opens the ProfileModal we just fixed
  };

  const bodyContent = (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
      <h1 className="text-3xl font-bold text-black dark:text-white">
        Welcome to Eosocial, Eos!
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-lg">
        Let's create a profile. Don't worry, it will only take a minute.
      </p>
      <p className="text-neutral-500 dark:text-neutral-400">
        Click Next to get started...
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isSending}
      isOpen={setupModal.isOpen}
      onClose={setupModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Next"
      title="Welcome"
      subtitle="Account created successfully"
      body={bodyContent}
    />
  );
};

export default SetupModal;
