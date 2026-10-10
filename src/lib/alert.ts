import Swal from "sweetalert2";

interface ConfirmOptions {
  title: string;
  text?: string;
  confirmText?: string;
}

export async function confirmAlert(options: ConfirmOptions) {
  const result = await Swal.fire({
    title: options.title,
    text: options.text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: options.confirmText ?? "Yes",
    cancelButtonText: "No, keep it",
    confirmButtonColor: "#dc2626",
    reverseButtons: true,
  });
  return result.isConfirmed;
}

export function successAlert(title: string, text?: string) {
  return Swal.fire({
    title,
    text,
    icon: "success",
    timer: 1800,
    showConfirmButton: false,
  });
}

export async function promptAlert(options: {
  title: string;
  placeholder?: string;
}) {
  const result = await Swal.fire({
    title: options.title,
    input: "textarea",
    inputPlaceholder: options.placeholder,
    showCancelButton: true,
    confirmButtonText: "Submit",
    reverseButtons: true,
  });
  return result.isConfirmed ? String(result.value ?? "").trim() : null;
}
