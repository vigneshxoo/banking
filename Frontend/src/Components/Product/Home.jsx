import React from 'react'
import { Navbar } from '../Product/HomepageComponets/Navigation'
import { Perfectplan ,} from './HomepageComponets/Loancard'
import {UserDetails} from './HomepageComponets/UserDetails'
import {GeneralQues} from './HomepageComponets/GeneralQues'
import AutoPlay from './HomepageComponets/Currsol'
import { CreateAccount } from './HomepageComponets/CreateAccount'
import { Footer } from './HomepageComponets/Footer'

export const Home = () => {
    return (
        <div className='bg' >
            <Navbar />
            <Perfectplan />
             <UserDetails />
            <CreateAccount />
            <GeneralQues />
            <AutoPlay />
            <Footer /> 
            {/* {/* <Testing/> */}
        </div>
    )
}
