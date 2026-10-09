"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, MapPin, Send } from "lucide-react";

import { clientApi } from "@/lib/client-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { z } from "zod";

const complaintSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Address is required")
    .max(300, "Address cannot exceed 300 characters"),

  categoryId: z.string().min(1, "Please select a category"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),

  latitude: z.number().optional(),

  longitude: z.number().optional(),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

interface Category {
  id: string;
  name: string;
  description?: string | null;
  slaHours: number;
  serviceFee?: number | null;
  department?: {
    id: string;
    name: string;
  } | null;
}

export default function CreateComplaintForm() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      categoryId: "",
      priority: "MEDIUM",
    },
  });

  const selectedCategoryId = watch("categoryId");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await clientApi("/categories");

        const raw = (response as any)?.data ?? response;

        const data = Array.isArray(raw) ? raw : (raw?.data ?? raw?.items ?? []);

        setCategories(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load complaint categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);

        toast.success("Location added successfully");

        setGettingLocation(false);
      },
      () => {
        toast.error(
          "Unable to get your location. Please allow location permission.",
        );

        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  const onSubmit = async (values: ComplaintFormValues) => {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        address: values.address,
        categoryId: values.categoryId,
        priority: values.priority,
        ...(values.latitude !== undefined && {
          latitude: values.latitude,
        }),
        ...(values.longitude !== undefined && {
          longitude: values.longitude,
        }),
      };

      await clientApi("/complaints", {
        method: "POST",
        body: payload,
      });

      toast.success("Complaint submitted successfully!");

      router.push("/dashboard/citizen/complaints");
      router.refresh();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.message || "Failed to submit complaint. Please try again.",
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Submit a Complaint</CardTitle>

        <p className="text-sm text-muted-foreground">
          Tell us about the problem in your area. Our team will review and
          handle your complaint.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Complaint Title</Label>

            <Input
              id="title"
              {...register("title")}
              placeholder="e.g. Water pipe leaking near market"
              disabled={isSubmitting}
            />

            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the problem in detail..."
              className="min-h-32 resize-none"
              disabled={isSubmitting}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>

            <Input
              id="address"
              {...register("address")}
              placeholder="e.g. Station Road, Narsingdi"
              disabled={isSubmitting}
            />

            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={selectedCategoryId}
              onValueChange={(value) =>
                setValue("categoryId", value, {
                  shouldValidate: true,
                })
              }
              disabled={loadingCategories || isSubmitting}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loadingCategories
                      ? "Loading categories..."
                      : "Select complaint category"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex flex-col">
                      <span>{category.name}</span>

                      {category.department?.name && (
                        <span className="text-xs text-muted-foreground">
                          {category.department.name}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.categoryId && (
              <p className="text-sm text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority</Label>

            <Select
              value={watch("priority")}
              onValueChange={(value) =>
                setValue("priority", value as "LOW" | "MEDIUM" | "HIGH", {
                  shouldValidate: true,
                })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>

                <SelectItem value="MEDIUM">Medium</SelectItem>

                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Complaint Location</p>

                <p className="text-sm text-muted-foreground">
                  You can automatically add your current GPS location.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={getLocation}
                disabled={gettingLocation || isSubmitting}
              >
                {gettingLocation ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Getting location...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 size-4" />
                    Use my location
                  </>
                )}
              </Button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                type="number"
                step="any"
                placeholder="Latitude"
                {...register("latitude", {
                  valueAsNumber: true,
                })}
              />

              <Input
                type="number"
                step="any"
                placeholder="Longitude"
                {...register("longitude", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/citizen/complaints")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Submit Complaint
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
