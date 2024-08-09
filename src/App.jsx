import styled from "styled-components"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Account } from "./components/Account"
import { TransactionForm } from "./components/TransactionForm"
import { Statement } from "./components/Statement"
import { useEffect, useState } from "react"
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

  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)

  function fetchTransactions() {
    http.get('transactions')
      .then((response) => {
        setTransactions(response.data.map(t => {
          return {
            id: t._id,
            value: t.value,
            type: t.type,
            date: new Date(t.createdAt)
          }
        }))
      })
      .catch((err) => {
        console.error('Alguma coisa deu errado')
        console.error(err)
      })
  }

  function addTransaction(type, value) {
    http.post('transactions', {
      type,
      value: parseFloat(value)
    })
      .then((response) => {
        console.log(response.data)
        fetchTransactions()
        fetchBalance()
      })
      .catch((err) => {
        console.error('Alguma coisa deu errado ao criar uma transação')
        console.error(err)
      })
  }

  function fetchBalance() {
    http.get('transactions/balance')
    .then((response) => {
      setBalance(response.data.balance)
    })
  }

  useEffect(() => {
    fetchTransactions()
    fetchBalance()
  }, [])


  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <Main>
          <Account balance={balance}/>
          <TransactionForm onFormSubmit={addTransaction}/>
        </Main>
        <div>
          <Statement transactions={transactions} />
        </div>
      </Container>
    </>
  )
}

export default App
