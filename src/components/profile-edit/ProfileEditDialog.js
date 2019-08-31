import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import { createFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { auth, firestore, database } from "../../config/fbConfig.js";
import { compose } from 'redux'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import { 
          MDBBtn,
          MDBCard,
          MDBContainer,
          MDBCardHeader,
          MDBInput,
          MDBCardBody
        } from "mdbreact";

// @material-ui/core components

const ProfileEditModal = ( props, firebase ) => {
  const user = props.userInfo;

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
    <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
      <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
      </DialogActions>
    </Dialog>
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

export default connect(mapStateToProps)(ProfileEditModal);
