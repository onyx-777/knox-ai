import { getSubscriptionDetails } from "@/actions/subscription";
import { pricingCards } from "@/constants/landing-page";

export const useSubscription = () => {
  const getPlanDetails = async () => {
    try {
      const response = await getSubscriptionDetails();
      if (response){
        const plan = pricingCards.find(({title})=>response.plan === title.toUpperCase())
        return plan?.title
      }
    } catch (error) {
      console.log("error in useSubscription hook : ", error);
    }
  };

  return {
    getPlanDetails
  }
};
