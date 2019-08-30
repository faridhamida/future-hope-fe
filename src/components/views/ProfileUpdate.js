import React from 'react'
import PropTypes from 'prop-types'
import { createFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { auth, firestore, database } from "../../config/fbConfig.js";
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";


// @material-ui/core components
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import Button from "../shared/components/Button";
import CustomInput from "../shared/components/CustomInput";
import Card from "../shared/components/card/Card";
import CardBody from "../shared/components/card/CardBody";
import CardAvatar from "../shared/components/card/CardAvatar";
import CardHeader from "../shared/components/card/CardHeader";
import CardFooter from "../shared/components/card/CardFooter";

// withFirebase
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


const ProfileUpdate = ( props, firebase ) => {
  const classes = useStyles();
  const user = props.userInfo;

  // const userRef = firestore.collection("users").doc(props.userInfo.uid);
  // const userRef = firestore.collection("users").doc(user);



  async function writeUserData(){
    try {
    const userRef = firestore.collection("users").doc(props.userInfo.uid);
    const userInfo = await userRef.get();
    console.log(userInfo.data())
    } catch (err) {
    // handle error
    }
  }
  return (
    

    <div>
      <h2>Update User Profile</h2>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={user.photoUrl} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{user.userType}</h6>
              <h4 className={classes.cardTitle}>{user.fullName}</h4>
              <p className={classes.description}>
                {user.aboutMe}
              </p>
              <Button color="primary" onClick={() => writeUserData()} round>
                Update
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            </Card>
        </GridItem>
      </GridContainer> */}

      {/* <button onClick={() => firebase.updateProfile({ aboutMe: 'admin' })}> */}


      {/* <div>
        {
          isLoaded(profile)
            ? JSON.stringify(profile, null, 2)
            : 'Loading...'
        }
      </div> */}

    </div>
  )
}

ProfileUpdate.propTypes = {
  profile: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ProfileUpdate);


// export default compose(
//   createFirebaseConnect, // add props.firebase (firebaseConnect() can also be used)
//   connect(
//     ({ firebase: { profile } }) => ({
//       profile
//     })
//   )
// )(ProfileUpdate)