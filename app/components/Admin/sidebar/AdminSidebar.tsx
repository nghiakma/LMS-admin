"use client";
import { FC, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";
import avatarDefault from "../../../../public/assests/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

interface itemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
    return (
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
        className="hover:!bg-[unset]"//ghi đè lên bất kỳ màu nền nào khác 
      >
        <Link href={to} className="hover:!bg-[unset]">
          <Typography className="!text-[16px] !font-Poppins text-black dark:text-white">
            {title}
          </Typography>
        </Link>
      </MenuItem>
    );
};

const AdminSidebar = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [logout, setlogout] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
      return null;
    }

    const logoutHandler = async () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.reload();
    };

    return (
        <Box
        sx={{
            "& .pro-sidebar-inner": {
              background: `${
                theme === "dark" ? "#111C43 !important" : "#fff !important"
              }`,
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item:hover": {
              color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
              color: "#6870fa !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
              opacity: 1,
            },
            "& .pro-menu-item": {
              color: `${theme !== "dark" && "#000"}`,
            },
          }}
          className="!bg-white dark:bg-[#111C43]"
        >
          <Sidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99999999999999,
          width: isCollapsed ? "0%" : "16%",
        }}
      >

         </Sidebar>

        </Box>
    )
}