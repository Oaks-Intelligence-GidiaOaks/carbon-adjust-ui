import { DState } from "@/types/general";
import { useEffect } from "react";

export const useModalCloser = (
  ref: any,
  state: DState,
  closeDialog: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref?.current && !ref.current.contains(event.target) && state) {
        closeDialog();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeDialog, state]);
};
