import React, { useState, useEffect } from "react";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";
import axios from "axios";
import { Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import BreakdownChart from "component/BreakdownChart";
import OverviewChart from "component/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "component/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [todaySales, setTodaySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState(0);
  const [yearlySales, setYearlySales] = useState(0);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");


  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/appointment/all");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchTodaySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/payments/today-sales"
      );
      setTodaySales(response.data);
    } catch (error) {
      console.error("Error fetching today's sales:", error);
    }
  };

  const fetchMonthlySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/payments/monthly-sales"
      );
      setMonthlySales(response.data);
    } catch (error) {
      console.error("Error fetching monthly sales:", error);
    }
  };

  const fetchYearlySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/payments/yearly-sales"
      );
      setYearlySales(response.data);
    } catch (error) {
      console.error("Error fetching yearly sales:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchTodaySales();
    fetchMonthlySales();
    fetchYearlySales();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Appointments"
          value={appointments.length}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Today Sales"
          value={todaySales.length}
          increase={`+${Math.floor(Math.random() * 30)}%`}
          description="Since yesterday"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Monthly Sales"
          value={monthlySales}
          increase={`+${Math.floor(Math.random() * 10)}%`}
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={yearlySales}
          increase={`+${Math.floor(Math.random() * 20)}%`}
          description="Since last year"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;