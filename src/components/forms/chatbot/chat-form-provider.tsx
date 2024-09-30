// "use client"
// import { Button } from "@/components/ui/button";
// import { useChatbot } from "@/hooks/chatbot";
// import { Loader2 } from "lucide-react";
// import React from "react";
// import { FormProvider } from "react-hook-form";

// type Props = {
//   children: React.ReactNode;
//   domainId: string;
// };

// const ChatBotFormProvider = ({ children, domainId }: Props) => {
//   const { methods, onFormSubmit, loading } = useChatbot(domainId);
//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={onFormSubmit} className="h-full w-fit">
//         <div className="flex flex-col justify-between gap-3 w-fit h-full pb-4">
//           {children}
//         </div>
//         <Button className="w-full" type="submit">
//           {loading ? <Loader2 className="animate-spin" /> : "Submit"}
//         </Button>
//       </form>
//     </FormProvider>
//   );
// };

// export default ChatBotFormProvider;
