import { useEffect, useState } from "react"
import styled from "styled-components"
import { Account } from "./components/Account"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Statement } from "./components/Statement"
import { TransactionForm } from "./components/TransactionForm"
import http from "./http"

const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 1200px;
  margin: 24px auto;
`

const Main = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 34px;
`

function App() {
  const [transactions, setTransactions] = useState([]);

  function fetchTransactions() {
    http.get('transactions')
      .then(response => {
        setTransactions(response.data.map(transaction => ({
            ...transaction,
            id: transaction._id,
            value: transaction.value,
            type: transaction.type,
            date: new Date(transaction.createdAt)
          })
        ));
      }).catch(error => {
        console.error("Error fetching transactions:", error);
      });
  }

  function addTransaction(type, value) {
    return http.post('transactions', { type, value: parteFloat(value) })
      .then(response => {
        fetchTransactions();
      }).catch(error => {
        console.error("Error creating transaction:", error);
      });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <Main>
          <Account />
          <TransactionForm onFormSubmit={addTransaction} />
        </Main>
        <div>
          <Statement transactions={transactions} />
        </div>
      </Container>
    </>
  )
}

export default App
