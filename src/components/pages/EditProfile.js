import { Fragment, useState } from "react";

const EditProfile = () => {
  const [birthdayMonth, setBirthdayMonth] = useState();
  const [birthdayDay, setBirthdayDay] = useState();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const days = []

  for (let i = 1; i < 32; i++) {
    days.push(<option key={i} value={birthdayDay} name={birthdayDay}>{i}</option>)
  }

  const onMonthChangeHandler = (event) => {
   setBirthdayMonth(event.target.value);
  }

  const onDayChangeHandler = (event) => {
    setBirthdayDay(event.target.value);
   }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(birthdayMonth, birthdayDay);
    alert("birthday updated")
  }

  return (
    <Fragment>
      <h1>Edit Profile</h1>
      <form onSubmit={onSubmitHandler}>
        <label>Bio:</label>
        <textarea></textarea>
        <h4>Birthday:</h4>
        <label htmlFor="birthdayMonth">Month</label>
          <select id="birthdayMonth" onChange={onMonthChangeHandler}>
            <option default>Choose One</option>
            {months.map((month) => <option key={month} value={birthdayMonth} name={month}>{month}</option>)}
          </select>

        <label htmlFor="birthdayDay">Day</label>
          <select id="birthdayDay" onChange={onDayChangeHandler}>
            <option default>Choose One</option>
            {days}
          </select>

        <button type="submit">Update Profile</button>
      </form>
    </Fragment>
   
  )
}

export default EditProfile;