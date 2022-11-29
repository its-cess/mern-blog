import { Fragment } from "react";

const EditProfile = () => {
  return (
    <Fragment>
      <h1>Edit Profile</h1>
      <form>
        <label>About me:</label>
        <textarea></textarea>
        <h4>Birthday:</h4>
        <label htmlFor="birthdayMonth">Month</label>
          <select id="birthdayMonth">
            <option default>Choose One</option>
            <option value="January">January</option>
            <option value="February">February</option>
          </select>

        <label htmlFor="birthdayDay">Day</label>
          <select id="birthdayDay">
            <option default>Choose One</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>

        <h4>Member Since:</h4>
        <button type="submit">Update Profile</button>
      </form>
    </Fragment>
   
  )
}

export default EditProfile;