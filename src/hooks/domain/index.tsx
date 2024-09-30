import {
  domainDelete,
  integrateDomain,
  allDomainsDelete,
  getAllDomainsData,
  getDomain,
} from "@/actions/domain";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/providers/modal-provider";
import { AddDomainSchema, DomainSettingsProps } from "@/schemas/domain.schema";
import { currentUser } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { Domain } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useDomain = () => {
  console.log("inside domainhook");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  // const [values, setValues] = useState<DomainSettingsProps>();
  const { setClose } = useModal();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(AddDomainSchema),
    mode: "onChange",
  });

  const onFormSubmit = handleSubmit(async (values) => {
    console.log("onFormSubmit function called");
    try {
      setLoading(true);
      const newDomain = await integrateDomain(values);
      if (newDomain) {
        reset();
        setLoading(false);
        toast({
          title: "Success",
        });
        router.refresh();
        setClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
      });
    }
  });

  const deleteDomain = async (id: string) => {
    console.log("id in useDomainHook : ", id);
    try {
      setLoading(true);
      await domainDelete(id);
      setLoading(false);
      toast({
        title: "Success",
        description: "Domain deleted successfully!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't delete domain",
      });
      console.log("error in deleting domain", error);
    }
  };

  const deleteAllDomains = async () => {
    try {
      setLoading(true);
      const response = await allDomainsDelete();
      if (response) {
        setLoading(false);
        toast({
          title: "Success",
          description: "All Domains deleted successfully!",
        });
        router.refresh();
      }
    } catch (error) {
      console.log("error in useDomain hook in deleteAllDomains", error);
      toast({
        title: "Error",
        description: "Something went wrong!",
      });
    }
  };

  return {
    onFormSubmit,
    loading,
    register,
    setValue,
    errors,
    watch,
    deleteDomain,
    deleteAllDomains,
  };
};
