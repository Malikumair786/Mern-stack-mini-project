import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useGetTestsQuery } from "state/api";

const AddMedicalTestForm = ({ open, handleClose, handleSave }) => {
  const { refetch: refetchTests } = useGetTestsQuery();

  const [testData, setTestData] = useState({
    name: "",
    category: {
      name: "",
      description: "",
    },
    price: 0,
    description: "",
    picture: "",
  });

  const handleChange = (field) => (event) => {
    setTestData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleCategoryChange = (field) => (event) => {
    setTestData((prevData) => ({
      ...prevData,
      category: {
        ...prevData.category,
        [field]: event.target.value,
      },
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post("http://localhost:5001/client/medical-tests", testData);
      handleSave(response.data);
      handleClose();
      refetchTests();
    } catch (error) {
      console.error("Error saving medical test:", error);
    }
  };
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Medical Test</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details for the new medical test.
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Test Name"
          type="text"
          fullWidth
          value={testData.name}
          onChange={handleChange("name")}
        />
        <TextField
          margin="dense"
          id="categoryName"
          label="Category Name"
          type="text"
          fullWidth
          value={testData.category.name}
          onChange={handleCategoryChange("name")}
        />
        <TextField
          margin="dense"
          id="categoryDescription"
          label="Category Description"
          type="text"
          fullWidth
          value={testData.category.description}
          onChange={handleCategoryChange("description")}
        />
        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="number"
          fullWidth
          value={testData.price}
          onChange={handleChange("price")}
        />
        <TextField
          margin="dense"
          id="description"
          label="Test Description"
          type="text"
          fullWidth
          value={testData.description}
          onChange={handleChange("description")}
        />
        <TextField
          margin="dense"
          id="picture"
          label="Picture URL"
          type="text"
          fullWidth
          value={testData.picture}
          onChange={handleChange("picture")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick}>Save Test</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMedicalTestForm;
