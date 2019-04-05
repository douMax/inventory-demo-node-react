import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const Header = () => <h2>Header</h2>
const Malls = () => <h2>Malls</h2>
const Mallnew = () => <h2>Mallnew</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {
    return(
        <div>
            <BrowserRouter >
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/malls" component={Malls} />
                    <Route path="/malls/new" component={Mallnew} />
                </div>
            </BrowserRouter>
        </div>
    )
}


export default App