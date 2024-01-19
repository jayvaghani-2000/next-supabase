import Nova from "@/app/components/Font/nova";
import Icon from "@/app/components/Icon";
import Button from "@/app/components/Shared/Button";
import InlineSpinner from "@/app/components/Shared/InlineSpinner";
import { useAppDispatch } from "@/app/store";
import { useAuthStore } from "@/app/store/authentication";
import { useInitiateOrderMutation } from "@/app/store/checkout/api";
import { setGlobalData } from "@/app/store/global";
import { currency } from "@/app/utils/constant";
import { Typography } from "@mui/material";
import { INormalizeError } from "razorpay/dist/types/api";
import { activeStep } from "..";
import {
  getCartType,
  getVisitorCartType,
} from "../../../../../../pages/api/types";

type propType = {
  userCart: getCartType | getVisitorCartType;
  handleUpdateCurrentStep: (step: activeStep) => void;
  currentStep: activeStep;
  shippingAddress: string;
  isSuccess: boolean;
};

const PriceSummary = (props: propType) => {
  const {
    userCart,
    handleUpdateCurrentStep,
    currentStep,
    shippingAddress,
    isSuccess,
  } = props;
  const dispatch = useAppDispatch();
  const { profile } = useAuthStore();
  const [initiateOrder] = useInitiateOrderMutation();

  const total = userCart.reduce((prev, curr) => {
    prev += curr.quantity * curr.sticker.price;
    return prev;
  }, 0);

  const handleInitiateOrder = async () => {
    const res = await initiateOrder({ total: total });
    if ("data" in res && res.data) {
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        amount: res.data.amount,
        currency: "INR",
        name: "Sticker Verse",
        description: "Place order on stickerverse",
        image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/logo/logo.png`,
        order_id: res.data.id,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/payment-verification`,
        prefill: {
          name: profile.user_metadata.name,
          email: profile.email,
          contact: profile.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#383838",
        },
      };
      //@ts-ignore
      const rzp1 = new Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", (response: INormalizeError) => {
        console.log("##############", { response: response });
      });
    }
  };

  const getOrderButtonText = () => {
    if (currentStep === activeStep.CART) {
      return "Place Order";
    } else if (currentStep === activeStep.ADDRESS) {
      return "Continue";
    }
    return "Make Payment";
  };

  return (
    <div className="sm:sticky top-5 col-span-9 md:col-span-4 lg:col-span-3 h-fit ">
      <div className="flex gap-1 items-center justify-center">
        <div className=" h-[18px] w-[18px] md:h-[30px] md:w-[30px]">
          <Icon name="secure" className="h-full w-full" />{" "}
        </div>
        <Nova className="text-green">100% Secure</Nova>
      </div>

      <div className=" bg-white rounded-2xl  py-4 sm:py-5 md:py-8  px-4 sm:px-5 md:px-7 mt-6 mb-5">
        <div className="flex justify-between items-center">
          <Typography variant="body2" fontWeight={400}>
            Bag Total
          </Typography>
          <Typography variant="h5" fontWeight={500}>
            {currency}
            {total}
          </Typography>
        </div>
      </div>

      <Button
        variant="mild-rounded-shadow"
        className="w-full bg-lightGreen hover:bg-lightGreen"
        onClick={() => {
          if (currentStep === activeStep.CART) {
            handleUpdateCurrentStep(activeStep.ADDRESS);
          } else if (currentStep === activeStep.ADDRESS) {
            if (!shippingAddress) {
              return dispatch(
                setGlobalData({
                  toast: {
                    message: "Please select address!",
                    show: true,
                    type: "info",
                  },
                })
              );
            }
            handleUpdateCurrentStep(activeStep.PLACE_ORDER);
          } else {
            handleInitiateOrder();
          }
        }}
        disabled={currentStep === activeStep.PLACE_ORDER && !isSuccess}
      >
        {getOrderButtonText()}
        {currentStep === activeStep.PLACE_ORDER && !isSuccess ? (
          <InlineSpinner />
        ) : null}
      </Button>
    </div>
  );
};

export default PriceSummary;
