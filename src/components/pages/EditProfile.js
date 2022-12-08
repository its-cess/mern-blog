import { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const defaultFormFields = {
  bio: "",
  month: "",
  day: ""
};

const EditProfile = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const username = user.username;  
  const userId = auth.userId;
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { bio, month, day } = formFields;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const days = [];

  for (let i = 1; i < 32; i++) {
    days.push(i);
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    alert("profile updated");

    try {
      const response = await fetch(`http://localhost:4000/profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth.token
        },
        body: JSON.stringify({
          bio: formFields.bio,
          birthday: {
            month: formFields.month,
            day: formFields.day
          }
        })
      })

      await response.json();
      if (response.status === 200) {
        navigate(`../${username}`)
      }
    } catch (err) {
      console.log(err);
    }
    resetFormFields();
  };

  return (
    <Fragment>
      <h1>Edit Profile</h1>
      <form onSubmit={onSubmitHandler}>
        <label>Bio:</label>
        <textarea name="bio" value={bio} onChange={onChangeHandler}></textarea>
        <h4>Birthday:</h4>
        <label htmlFor="month">Month</label>
        <select id="month" name="month" onChange={onChangeHandler}>
          <option default>Choose One</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="day">Day</label>
        <select id="day" name="day" onChange={onChangeHandler}>
          <option default>Choose One</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <button type="submit">Update Profile</button>
      </form>
    </Fragment>
  );
};

export default EditProfile;
