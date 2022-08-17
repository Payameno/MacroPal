import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Exercise from "./Exercise";
import '../App.scss'


export default function WorkoutList (props) {

  const [userWorkoutData, setUserWorkoutData] = useState([]);
//this state contains selected day
const [startDate, setStartDate] = useState(null);


//Calculate today date
let dateObj = new Date();
let month = dateObj.getMonth() + 1; //months from 1-12
if (month < 10) {
  month = '0' + month
}
let day = dateObj.getDate();
let year = dateObj.getFullYear();
const todayDate = year + "-" + month + "-" + day;

console.log('props.state', props.state)
////Fetch Today workout data on mount
useEffect(() => {


Axios.get(`/api/workouts/user/${props.state.user.id}`).then(res => {
  const workouts = res.data
  const todayWorkouts = workouts.filter(workout => workout.date === todayDate)

  setUserWorkoutData(todayWorkouts);
})

}, [props.state]);

console.log('##userworkout##', userWorkoutData );


  // Get work out data for a specific user and date//
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {
      const workouts = res.data
      const todayWorkouts = workouts.filter(workout => workout.date === startDate.toISOString().substring(0, 10))
      setUserWorkoutData(todayWorkouts);
    })
  }

  }, [startDate]);

  return (

    <Container className="container-margins">

    <Row>

    <Col className="calendar-header " xs={3}>


        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          maxDate={new Date()}
          showDisabledMonthNavigation
          className="mb-3"
          inline
        />
        <div className="mb-1">Please select a date</div>

      <Card className="background-img card mt-2">
        <Card.Body>
          <h3>Overview</h3>
        <div>
          <h5><span>Calories</span></h5>
          <h5 className="heading">Carbs</h5>
        </div>
        <div>
          <h5 className="heading">Fat</h5>
        </div>
        <div>
          <h5 className="heading">Protein g</h5>
        </div>
        </Card.Body>
      </Card>

      {/* <Col className="mt-3">
        <Button 
        className="mr-5" 
        variant="info" 
        type="submit"
        onClick={() => {navigateToAddMeal()}}
        >
          Add a meal
        </Button>
      </Col>  */}
    </Col>

        <Col>
        {userWorkoutData &&
        <Card className="top-section">
        <div className="app-header-bar">
          Activities on {todayDate}
          </div>
        <Card.Body>
            {userWorkoutData.map(workoutData => (
                        <div className="exercise-items" key={workoutData.id}>
                        <Exercise workoutId={workoutData.id} />
                        </div>
            ))}
        </Card.Body>
         </Card>
         }
        </Col>

    </Row>

    </Container>
  );

}

