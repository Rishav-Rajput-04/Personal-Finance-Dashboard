import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Income = ({ incomeList, setIncomeList }) => {
  const [income, setIncome] = useState({ amount: '', source: '', date: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
  };

  const handleSubmit = () => {
    if (income.amount === '' || income.source === '' || income.date === '') {
      alert("All fields are required.");
      return;
    }

    if (editingIndex !== null) {
      const updatedList = [...incomeList];
      updatedList[editingIndex] = income;
      setIncomeList(updatedList);
      setEditingIndex(null);
    } else {
      setIncomeList([...incomeList, income]);
    }
    setIncome({ amount: '', source: '', date: '' });
  };

  const handleEdit = (index) => {
    setIncome(incomeList[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setIncomeList(incomeList.filter((_, i) => i !== index));
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <Container>
      <Typography variant="h5" className="my-4">Manage Income</Typography>
      <Paper className="p-4 mb-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Amount"
              name="amount"
              value={income.amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Source"
              name="source"
              value={income.source}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={income.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" className="mt-3" onClick={handleSubmit}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </Button>
      </Paper>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeList.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.source}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(index)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)} color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Income;
