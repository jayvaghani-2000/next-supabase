import InlineSpinner from "@/app/components/Shared/InlineSpinner";
import { useAddressStore } from "@/app/store/address";
import { useGetUserAddressQuery } from "@/app/store/address/api";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "./addressForm";

const Address = () => {
  const [isGeolocationSupported, setIsGeolocationSupported] = useState(false);
  const { isFetching } = useGetUserAddressQuery({});
  const { address, loading } = useAddressStore();
  const [addNewAddress, setAddNewAddress] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsGeolocationSupported(true);
    } else {
      setIsGeolocationSupported(false);
    }
  }, []);

  useEffect(() => {
    if (address.length === 0 && !loading) {
      setAddNewAddress(true);
    }
  }, [address, loading]);

  return (
    <div className="col-span-9 sm:col-span-5 lg:col-span-6">
      <Typography variant="subtitle2" fontWeight={"500"} className="text-black">
        {addNewAddress ? "Add New Address" : "Select address"}
      </Typography>
      {addNewAddress ? (
        <AddressForm isGeolocationSupported={isGeolocationSupported} />
      ) : (
        <div className=" flex justify-center items-center mt-1 sm:mt-2 px-4 sm:px-5 md:px-7 py-3 sm:py-4 md:py-5  bg-coffee">
          {isFetching && address.length === 0 ? <InlineSpinner /> : null}
        </div>
      )}
    </div>
  );
};

export default Address;
