import { toast } from "react-toastify";

export const errorMessageToast = (message: string) => {
  toast.dismiss();
  toast.error(message, { toastId: message });
};

export const successMessageToast = (message: string) => {
  toast.dismiss();
  toast.success(message, { toastId: message });
};

export const infoMessageToast = (message: string) => {
  toast.dismiss();
  toast.info(message, { toastId: message });
};

export const warningMessageToast = (message: string) => {
  toast.dismiss();
  toast.warn(message, { toastId: message });
};
