import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Reports = ({ incomeList, expenseList, budgetGoals }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredIncome, setFilteredIncome] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const filterData = () => {
    const filteredIncome = incomeList.filter(
      (item) => new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate)
    );
    const filteredExpenses = expenseList.filter(
      (item) => new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate)
    );
    setFilteredIncome(filteredIncome);
    setFilteredExpenses(filteredExpenses);
  };

  const allDates = Array.from(
    new Set([
      ...filteredIncome.map((item) => item.date),
      ...filteredExpenses.map((item) => item.date),
    ])
  ).sort((a, b) => new Date(a) - new Date(b));

  const incomeData = allDates.map(
    (date) => filteredIncome.find((item) => item.date === date)?.amount || 0
  );
  const expenseData = allDates.map(
    (date) => filteredExpenses.find((item) => item.date === date)?.amount || 0
  );

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const incomeExpenseData = {
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

  const incomeSourceData = {
    labels: Array.from(new Set(filteredIncome.map((item) => item.source))),
    datasets: [
      {
        label: 'Income by Source',
        data: Array.from(new Set(filteredIncome.map((item) => item.source))).map(
          (source) =>
            filteredIncome
              .filter((item) => item.source === source)
              .reduce((acc, item) => acc + parseFloat(item.amount), 0)
        ),
        backgroundColor: 'green',
      },
    ],
  };

  const spendingPatternData = {
    labels: Array.from(new Set(filteredExpenses.map((item) => item.category))),
    datasets: [
      {
        label: 'Spending by Category',
        data: Array.from(new Set(filteredExpenses.map((item) => item.category))).map(
          (category) =>
            filteredExpenses
              .filter((item) => item.category === category)
              .reduce((acc, item) => acc + parseFloat(item.amount), 0)
        ),
        backgroundColor: 'red',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses Over Time',
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
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Source / Category',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
    },
  };

  return (
    <Container>
      <Typography variant="h5" className="my-4">Reports & Analytics</Typography>
      <Paper className="p-4 mb-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={filterData} fullWidth>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className="p-4 mb-4">
        <Line data={incomeExpenseData} options={lineOptions} />
      </Paper>

      <Paper className="p-4 mb-4">
        <Typography variant="h6" className="my-4">Income by Source</Typography>
        <Bar data={incomeSourceData} options={barOptions} />
      </Paper>

      <Paper className="p-4 mb-4">
        <Typography variant="h6" className="my-4">Spending by Category</Typography>
        <Bar data={spendingPatternData} options={barOptions} />
      </Paper>
    </Container>
  );
};

export default Reports;
