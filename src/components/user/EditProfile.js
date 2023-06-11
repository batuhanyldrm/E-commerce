import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { postLogout, updateUserApi } from '../api/userApi';
import { updateUser } from '../actions/userActions';
import { connect } from 'react-redux';

const EditProfile = (props) => {

    const {
        open,
        handleClose,
        updateUser,
        user,
    } = props;

    const [company, setCompany] = useState(user.company)
    const [name, setName] = useState(user.name)
    const [surname, setSurname] = useState(user.surname)
    const [email, setEmail] = useState(user.email)
    const [tel, setTel] = useState(user.tel)

    useEffect(() => {
      setCompany(user.company)
      setName(user.name)
      setSurname(user.surname)
      setEmail(user.email)
      setTel(user.tel)
    }, [user])

    const handleChangeUserInfo = async () => {
        const data = {
            id: user.id,
            company : company,
            name : name,
            surname: surname,
            email: email,
            tel: tel,
        }
        if (user.email !== email) {
            await updateUserApi(data)
            .then(() => {
                updateUser(data)
            }).finally(() =>{
                handleClose(false)
            })
            await postLogout()
            setTimeout(() => {
                window.location = window.location.origin + "/login";
            }, 2000);
            return;
        }
        await updateUserApi(data)
        .then(() => {
            updateUser(data)
        }).finally(() =>{
            handleClose(false)
        })
    }

  return (
    <>
        <Dialog maxWidth="sm"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
        <DialogTitle id="alert-dialog-title">
        <div style={{ textAlign : "center" }}>
            Edit Profile
        </div>
        </DialogTitle>
        <DialogContent>
        <div style={{display:"grid"}}>
        {user.company ?
            <TextField
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                margin="normal"
                label="Company Name"
                variant="outlined"
                size='small'
            /> : ""
        }
        <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="normal"
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            size='small'
        />
        <TextField
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            autoFocus
            margin="normal"
            id="surname"
            label="Surname"
            type="text"
            variant="outlined"
            size='small'
        />
        <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            margin="normal"
            id="email"
            label="Email"
            type="text"
            variant="outlined"
            size='small'
        />
        <TextField
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            autoFocus
            margin="normal"
            id="tel"
            label="Phone Number"
            type="text"
            variant="outlined"
            size='small'
        />
        </div>
        </DialogContent>
        <DialogActions>
        <Button style={{color: 'rgba(186,130,57,255)', borderColor: 'rgba(186,130,57,255)',}} onClick={handleClose}>Cancel</Button>
        <Button style={{color: 'rgba(186,130,57,255)', borderColor: 'rgba(186,130,57,255)',}} onClick={handleChangeUserInfo} >EDIT</Button>
        </DialogActions>
        </Dialog>
   </>
  )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (data) => {
      dispatch(updateUser(data))
  },
});

export default connect(mapStateToProps,mapDispatchToProps) (EditProfile)