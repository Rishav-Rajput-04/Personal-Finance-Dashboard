import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = ({ incomeList, expenseList }) => {
  const calculateTotal = (list) => list.reduce((acc, item) => acc + parseFloat(item.amount), 0);

  const totalIncome = calculateTotal(incomeList);
  const totalExpenses = calculateTotal(expenseList);
  const savings = totalIncome - totalExpenses;

  const allDates = Array.from(
    new Set([
      ...incomeList.map((item) => item.date),
      ...expenseList.map((item) => item.date),
    ])
  ).sort((a, b) => new Date(a) - new Date(b));

  const incomeData = allDates.map(
    (date) => incomeList.find((item) => item.date === date)?.amount || 0
  );
  const expenseData = allDates.map(
    (date) => expenseList.find((item) => item.date === date)?.amount || 0
  );

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const data = {
    labels: allDates.map(formatDate),
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'green',
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'green',
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: 'red',
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'red',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <Typography variant="h5" className="my-4">Dashboard Overview</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h4" color="green">₹{totalIncome}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h4" color="red">₹{totalExpenses}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Savings</Typography>
            <Typography variant="h4">₹{savings}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper className="p-4 mt-4">
        <Line data={data} options={options} />
      </Paper>
    </Container>
  );
};

export default Dashboard;
