import React, { useState, useEffect }  from 'react'
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import { auth, firestore, database } from "../../config/fbConfig.js";
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";

import { 
          MDBBtn,
          MDBCard,
          MDBContainer,
          MDBCardHeader,
          MDBInput,
          MDBCardBody
        } from "mdbreact";

import { toggleEditProfile } from "../../actions/auth.js";

// @material-ui/core components

import CardAvatar from "../shared/components/card/CardAvatar";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
const useStyles = makeStyles(styles);

const ProfileUpdate = props => {

  const [user, setUser] = useState({});
  useEffect(() => {
        const userData =  props.userInfo;
        setUser(userData);
        console.log(userData)
  }, [props.userInfo.isLoaded]);

  const handleInputChange = event => {
    const updatedUser = { ...user, [event.target.name]: event.target.value };
    console.log(user);
    setUser(updatedUser);
  };

  const [elem, setElem] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setElem(!elem)
    dispatch(toggleEditProfile());
  }

  // async function writeUserData(){
  //   try {
  //   const userRef = firestore.collection("users").doc(props.userInfo.uid);
  //   const userInfo = await userRef.get();
  //   console.log(userInfo.data())
  //   } catch (err) {
  //   // handle error
  //   }
  // }
  return (
    
      <MDBContainer>
        {!props.userInfo.isLoaded ? <div> Please Wait </div> : ( 
      <MDBCard>
        <MDBCardHeader className="font-weight-bold" color="purple darken-1"  tag="h3">
          Update Your Profile
        </MDBCardHeader>
        <CardAvatar profile>
          <a href="#" onClick={e => e.preventDefault()}>
            <img src={props.userInfo.photoUrl} alt="..." />
          </a>
        </CardAvatar>
        <MDBCardBody>
        <input value={user.fullName} type="text" disabled={elem} className="form-control" label="Name" onChange={handleInputChange} name="fullName" />
        {/* <input type="text" disabled={elem} readOnly={elem} className="form-control-plaintext" label="Name" value={user.fullName} /> */}
          <MDBInput value={user.city} label="City" onChange={handleInputChange} name="city" />
          {/* <MDBInput label="Country" value={user.country} name="country" onChange={handleInputChange} /> */}
          {/* <MDBInput label="About Me" value={user.about} name="about" onChange={handleInputChange} /> */}
          {/* <h6 className={classes.cardCategory}>Role: {user.role}</h6> */}
          {/* <MDBBtn outline color="purple darken-1" onClick={() => writeUserData()} round> */}
          <MDBBtn outline color="purple darken-1" onClick={() => handleClick()} round>
            Update
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      )}
    </MDBContainer>
    

  )
}

ProfileUpdate.propTypes = {
  profile: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(ProfileUpdate);
