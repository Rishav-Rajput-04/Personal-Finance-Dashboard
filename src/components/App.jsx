import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Container, Box } from "@mui/material";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Income from "./Income";
import Expenses from "./Expenses";
import BudgetGoals from "./BudgetGoals";
import Reports from "./Reports";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import Home from "./Home";

const App = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [budgetGoals, setBudgetGoals] = useState([]);

  return (
    <Router>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Container component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  incomeList={incomeList}
                  expenseList={expenseList}
                  budgetGoals={budgetGoals}
                />
              }
            />
            <Route
              path="/income"
              element={
                <Income incomeList={incomeList} setIncomeList={setIncomeList} />
              }
            />
            <Route
              path="/expenses"
              element={
                <Expenses
                  expenseList={expenseList}
                  setExpenseList={setExpenseList}
                />
              }
            />
            <Route
              path="/budget-goals"
              element={
                <BudgetGoals
                  budgetGoals={budgetGoals}
                  setBudgetGoals={setBudgetGoals}
                />
              }
            />
            <Route
              path="/reports"
              element={
                <Reports
                  incomeList={incomeList}
                  expenseList={expenseList}
                  budgetGoals={budgetGoals}
                />
              }
            />
            <Route path="/personal-finance-dashboard/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;