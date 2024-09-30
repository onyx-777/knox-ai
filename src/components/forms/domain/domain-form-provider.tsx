// "use client";
// import { useDomain } from "@/hooks/domain";
// import React from "react";
// import { FormProvider } from "react-hook-form";
// import { Loader } from "@/components/loader";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// interface Props {
//   children: React.ReactNode;
// }

// const DomainFormProvider = ({ children }: Props) => {
//   const { methods, onFormSubmit, loading } = useDomain();

//   console.log("inside domainformprovider");

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={onFormSubmit} className="h-full">
//         <div className="flex flex-col justify-between gap-3 h-full pb-4">
//           {children}
//         </div>
//         <Button className="w-full" type="submit">
//           {loading ? <Loader2 className="animate-spin" /> : "Submit"}
//         </Button>
//       </form>
//     </FormProvider>
//   );
// };

// export default DomainFormProvider;
