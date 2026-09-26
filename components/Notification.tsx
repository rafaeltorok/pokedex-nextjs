import { useEffect, useRef } from "react";

interface NotificationProps {
  showMessage: boolean;
  setShowMessage: (show: boolean) => void;
  message?: string;
}

export default function Notification({
  showMessage,
  setShowMessage,
  message,
}: NotificationProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showMessage) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [showMessage]);

  return (
    <dialog
      ref={ref}
      className="
        justify-center
        align-center
        p-5
        bg-black
        text-center text-yellow-300
        border-2 border-gray-600 rounded-xl
        mx-auto
        my-auto sm:my-5
        backdrop:bg-black/50
        backdrop:backdrop-blur-[3px]
      "
      onCancel={() => setShowMessage(false)}
    >
      <p
        className="
          text-xl
          font-bold-xl
          p-3
        "
      >
        {message}
      </p>
      <button
        className="
          border-1 border-gray-700 rounded
          bg-gray-900
          p-2
          hover:bg-gray-700 active:bg-gray-600
        "
        onClick={() => setShowMessage(false)}
      >
        Close
      </button>
    </dialog>
  );
}
