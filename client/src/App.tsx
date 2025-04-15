// import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/core/Navbar"
import Dashboard from "./components/pages/Dashboard"
import AllTransactions from "./components/pages/AllTransaction"
import BudgetPage from "./components/pages/BudgetPage"




function App() {
  return (
    <div className="">
      <Navbar/>


      <main className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/all-transactions" element={<AllTransactions/>}/>
          <Route path="/budget" element={<BudgetPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
