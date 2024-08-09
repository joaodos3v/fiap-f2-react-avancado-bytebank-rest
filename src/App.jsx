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

  useEffect(() => {
    http.get('transactions')
      .then((response) => {
        setTransactions(response.data)
      })
      .catch((err) => {
        console.error('Alguma coisa deu errado')
        console.error(err)
      })
  }, [])


  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <Main>
          <Account />
          <TransactionForm />
        </Main>
        <div>
          <Statement transactions={transactions}/>
        </div>
      </Container>
    </>
  )
}

export default App
