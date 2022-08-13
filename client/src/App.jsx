import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Signup from './components/Signup';
import Login from './components/Login';

import Workout from './components/Workout';
import WorkoutList from './components/WorkoutList';
import Exercise from './components/Exercise';
import ExerciseQueryProvider from './Providers/ExerciseQueryProvider';

import Meals from './components/Meals';
import Foodlist from './components/Foodlist';
import Profile from './components/Profile';
import Summary from './components/Summary';
import Controlpanel from './components/Controlpanel';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {},
    }
  }
  
  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {

    this.setState({
      isLoggedIn: true,
      user: data.user,
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {},
    })
  }

  loginStatus = () => {
    axios.get('/logged_in', 
   {withCredentials: true})    
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  };



  render() {

    return (
      <>
      <Navbar state={this.state}/>
      <BrowserRouter>
        <Routes>
          <Route  exact path='/' element={<Main/>}/>
          <Route  exact path='/login' element={<Login loginStatus={this.loginStatus} />}/>
          <Route  exact path='/signup' element={<Signup handleLogin={this.handleLogin} />}/>
          <Route  exact path='/meals' element={<Meals/>}/>
          <Route  exact path='/diet' element={<Foodlist/>}/>

        <ExerciseQueryProvider>
          <Route  exact path='/workout' element={<Workout state={this.state}/>}/>
          <Route  exact path='/exercise' element={<Exercise/>}/>
          <Route  exact path='/WorkoutList' element={<WorkoutList  state={this.state}/>}/>
        </ExerciseQueryProvider>

          <Route  exact path='/admin' element={<Controlpanel />}/>
          <Route  exact path='/summary' element={<Summary />}/>
          <Route  exact path='/profile' element={<Profile state={this.state} />}/>
          <Route  exact path='/loading' element={<Loading/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
      </>
    );
  }
}

export default App;