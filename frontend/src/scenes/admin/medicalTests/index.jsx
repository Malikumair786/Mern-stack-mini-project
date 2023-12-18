import React from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Header from "component/Header";
import FlexBetween from "component/FlexBetween";
import { useGetTestsQuery } from "state/api";
import Test from "./Test";
import AddMedicalTestDialog from "./AddMedicalTestDialog"; // Import the new component

const MedicalTests = () => {
  const { data, isLoading } = useGetTestsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTest = (testData) => {
    // Implement the logic to save the test data to the database
    console.log("Saving test:", testData);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Tests" subtitle="See your list of tests." />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Add new Test
          </Button>
          {/* Pass the necessary props to the dialog component */}
          <AddMedicalTestDialog
            open={open}
            handleClose={handleClose}
            handleSave={handleSaveTest}
          />
        </Box>
      </FlexBetween>

      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(({ _id, name, category, description, price }) => (
            <Test
              key={_id}
              _id={_id}
              name={name}
              category={category}
              description={description}
              price={price}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default MedicalTests;
