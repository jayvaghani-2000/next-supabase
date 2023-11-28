import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import Icon from "../Icon";
import Link from "next/link";
import classNames from "classnames";
import styles from "./navbar.module.scss";
import { Typography } from "@mui/material";

type propType = {
  open: boolean;
  toggleNav: (value: boolean) => void;
};

const UN_AUTH_TABS = [
  { title: "Stickers", path: "/stickers" },
  { title: "Category", path: "/categories" },
  { title: "Contact Us", path: "/contact-us" },
];

export default function Drawer(props: propType) {
  const { open, toggleNav } = props;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      toggleNav(open);
    };

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className="w-[300px] flex flex-col relative min-h-full overflow-auto max-w-[100vw] bg-cream">
        <Image
          src="/assets/png/navSticker.png"
          width={300}
          height={160}
          alt="nav"
        />
        <div className="h-[105px] w-[105px] absolute top-[90px] left-4">
          <Icon name="logo" className="scale-[0.75] origin-top-left" />
        </div>

        <div className="px-4 pt-[58px] pb-[38px] flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-[22px]">
            {UN_AUTH_TABS.map(i => (
              <Link
                href={i.path}
                key={i.title}
                className={classNames(
                  "flex justify-between items-center px-[10px] border-b-2 border-lightGray pb-1",
                  styles.navItems
                )}
              >
                <Typography variant="subtitle1" className="pl-5 uppercase">
                  {i.title}
                </Typography>
                <Icon name="ChevronRight" />
              </Link>
            ))}
          </div>

          <button className="px-[10px] flex gap-2 items-center">
            <Typography variant="subtitle1" className="uppercase">
              Sign In
            </Typography>
            <Icon name="signIn" />
          </button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
