"use client";

import { Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import type { CreateComplaintValues } from "@/lib/validations/create-complaint";

interface LocationFieldsProps {
  register: UseFormRegister<CreateComplaintValues>;
  setValue: UseFormSetValue<CreateComplaintValues>;
  errors: FieldErrors<CreateComplaintValues>;
}

export function LocationFields({
  register,
  setValue,
  errors,
}: LocationFieldsProps) {
  const [busy, setBusy] = useState(false);

  const locate = () => {
    if (!navigator.geolocation) {
      toast.error("Location is not supported in this browser");
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const options = { shouldValidate: true };
        setValue("latitude", coords.latitude.toFixed(6), options);
        setValue("longitude", coords.longitude.toFixed(6), options);
        toast.success("Location added");
        setBusy(false);
      },
      () => {
        toast.error("Could not get your location. Please allow access.");
        setBusy(false);
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  };

  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">Complaint location</p>
          <p className="text-sm text-muted-foreground">
            Optional. Add your current GPS location.
          </p>
        </div>
        <Button type="button" variant="outline" disabled={busy} onClick={locate}>
          {busy ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MapPin className="size-4" />
          )}
          Use my location
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="latitude"
          label="Latitude"
          inputMode="decimal"
          error={errors.latitude?.message}
          {...register("latitude")}
        />
        <FormField
          id="longitude"
          label="Longitude"
          inputMode="decimal"
          error={errors.longitude?.message}
          {...register("longitude")}
        />
      </div>
    </div>
  );
}