import {React, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      display: "flex",
    },
  });

function User() {
    const { userId} = useParams();
    const classes = useStyles();
    const [user, setUser] = useState();
    
    const getUser = () => {
        fetch('http://localhost:3000/users/' + userId,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization" : localStorage.getItem("tokenKey"),
        },
      })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setUser(result);
            },
            (error) => {
                console.log(error)
            },
        )
       
        }

        useEffect(() => {
            getUser()
        }, [])

    return(
        <div className={classes.root}>
            {user? <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName}/> : "" }
            {localStorage.getItem("currentUser") === userId ?<UserActivity userId={userId} /> : ""}
        </div>
    )
}

export default User;