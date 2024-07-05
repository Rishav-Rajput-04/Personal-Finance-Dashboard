import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Grid, LinearProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const BudgetGoals = ({ budgetGoals, setBudgetGoals }) => {
  const [goal, setGoal] = useState({ amount: '', period: '', category: '' });
  const [amountToAdd, setAmountToAdd] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleSubmit = () => {
      const newGoal = { ...goal, currentAmount: 0 };
      setBudgetGoals([...budgetGoals, newGoal]);
      setGoal({ amount: '', period: '', category: '' });
  };

  const updateProgress = (index, amount) => {
    const updatedGoals = [...budgetGoals];
    updatedGoals[index].currentAmount += parseFloat(amount);
    setBudgetGoals(updatedGoals);
    setAmountToAdd('');
  };

  const deleteGoal = (index) => {
    const updatedGoals = budgetGoals.filter((_, i) => i !== index);
    setBudgetGoals(updatedGoals);
  };

  const isGoalAccomplished = (currentAmount, goalAmount) => {
    return currentAmount >= goalAmount;
  };

  return (
    <Container>
      <Typography variant="h5" className="my-4">Set Budget Goals</Typography>
      <Paper className="p-4 mb-4">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={goal.amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Period"
              name="period"
              value={goal.period}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Category"
              name="category"
              value={goal.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Set Goal
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" className="mt-4">Current Budget Goals:</Typography>
      {budgetGoals.length > 0 ? (
        budgetGoals.map((g, index) => (
          <Paper key={index} className="p-3 mt-2">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography>Category: {g.category}</Typography>
                <Typography>Goal: ₹{g.amount} ({g.period})</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(g.currentAmount / g.amount) * 100}
                  style={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: isGoalAccomplished(g.currentAmount, g.amount) ? 'green' : undefined,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  Current Amount: ₹{g.currentAmount}
                </Typography>
                {isGoalAccomplished(g.currentAmount, g.amount) && (
                  <Typography variant="body2" color="primary">
                    <CheckCircleIcon /> Goal Accomplished!
                  </Typography>
                )}
              </Grid>
              <Grid item xs={2} container alignItems="center">
                {!isGoalAccomplished(g.currentAmount, g.amount) && (
                  <TextField
                    label="Amount to Add"
                    type="number"
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                )}
              </Grid>
              <Grid item xs={1} container justifyContent="center" alignItems="center">
                {!isGoalAccomplished(g.currentAmount, g.amount) && (
                  <IconButton
                    color="primary"
                    onClick={() => updateProgress(index, amountToAdd)}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={1} container justifyContent="center" alignItems="center">
                <IconButton
                  color="secondary"
                  onClick={() => deleteGoal(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography>No budget goals set yet.</Typography>
      )}
    </Container>
  );
};

export default BudgetGoals;
