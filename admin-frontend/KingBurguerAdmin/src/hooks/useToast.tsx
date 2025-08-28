import toast from "react-hot-toast";
import { useCallback } from "react";

type ToastType = "success" | "error" | "loading";

export default function useToast() {
  const showToast = useCallback((type: ToastType, mesage: string) => {
    switch (type) {
      case "success":
        toast.success(`${mesage}`, {
          style: {
            border: "1px solid var(--default-gray)",
            padding: "15px",
            backgroundColor: "var(--bg-light-gray)",
          },
          iconTheme: {
            primary: "var(--green)",
            secondary: "var(--bg-light-gray)",
          },
          duration: 4000,
        });
        break;
      case "error":
        toast.error(`${mesage}`, {
          style: {
            border: "1px solid var(--default-gray)",
            padding: "15px",
            backgroundColor: "var(--bg-light-gray)",
          },
          duration: 4000,
        });
        break;
      case "loading":
        {
          /*Arrumar depois*/
        }
        break;
      default:
        toast(mesage);
    }
  }, []);

  return { showToast };
}
