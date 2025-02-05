"use client";
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import Script from "next/script";
import React, { HTMLProps, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import Footer from "../components/Footer";
import WithAuth from "../components/HOC/withAuth";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Toast from "../components/Shared/Toast";
import store from "../store";
import CartProvider from "../utils/context/localCartProvider";
import theme from "./index";

const ThemeProvider = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: HTMLProps<HTMLElement>["className"];
}) => {
  const ref = useRef<HTMLBodyElement>(null!);
  const scrollRef = useRef(false);
  const [active, setActive] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const screen = window.innerHeight;
    if (scrollY > screen && !scrollRef.current) {
      setActive(true);
      scrollRef.current = true;
    } else if (scrollY < screen && scrollRef.current) {
      setActive(false);
      scrollRef.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <html lang="en">
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
              <meta
                property="og:image"
                content={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/logo/logo.png`}
              />
            </head>
            <body className={className} ref={ref}>
              <WithAuth>
                <CartProvider>
                  <Navbar />
                  {children}
                  <ScrollToTop
                    handleScrollToTop={handleScrollToTop}
                    active={active}
                  />
                  <Footer />
                  <Toast />
                </CartProvider>
              </WithAuth>
              <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            </body>
          </html>
        </MuiThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
