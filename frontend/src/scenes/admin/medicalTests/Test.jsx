import React from "react";

import {
  Card,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  Typography,
  CardActions,
  CardContent,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useGetTestsQuery } from "state/api";
import { useDeleteTestMutation } from "state/api";
import TestUpdateDialog from "./TestUpdateDialog";


const Test = ({ _id, name, category, description, price }) => {
  const theme = useTheme();
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [selectedTestId, setSelectedTestId] =
    React.useState(null);

  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [selectedTest, setSelectedTest] = React.useState(null);

  
  // const { refetch: refetchTests } = useGetTestsQuery();
  const {
    data,
    isLoading,
    refetch: refetchTests,
  } = useGetTestsQuery();
  const [deleteTest] = useDeleteTestMutation();
  const handleConfirmDialogOpen = (TestId) => {
    console.log("testId : ",TestId)
    setSelectedTestId(TestId);
    console.log("selectedTestId",selectedTestId)
    setConfirmDialogOpen(true);
  };
  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setSelectedTestId(null);
  };
  const handleDeleteTest = async (TestId) => {
    try {
      setConfirmDialogOpen(true);
      await deleteTest(TestId);
      setSelectedTestId(null);
      refetchTests();
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error("Error deleting Test:", error);
    }
  };

  const handleUpdateTest = (TestId) => {
    // Find the selected Test based on ID
    const TestToUpdate = data.find((p) => p._id === TestId);

    // Set the selected Test and open the update dialog
    setSelectedTest(TestToUpdate);
    setUpdateDialogOpen(true);
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        
        <Typography
          sx={{
            fontSize: 14,
            display: "flex",
            justifyContent: "space-between",
          }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          <span>{category.name}</span>
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{name}</span>
          <Typography variant="h5">{price} pkr</Typography>
        </Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {category.description}
        </Typography>

        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => handleConfirmDialogOpen(_id)}

        >
          Delete
        </Button>
      </CardActions>

      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => handleUpdateTest(_id)}
        >
          Update
        </Button>
      </CardActions>
    </div>

      {/* <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Update
        </Button>
      </CardActions> */}



      {/* <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Test ID: {_id}</Typography>
        </CardContent>
      </Collapse> */}


      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Test information?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteTest(selectedTestId)}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TestUpdateDialog
        open={updateDialogOpen}
        onClose={() => {
          setUpdateDialogOpen(false);
          setSelectedTest(null);
        }}
        Test={selectedTest} 
        refetchTests={refetchTests}
      />

    </Card>
  );
};

export default Test;
