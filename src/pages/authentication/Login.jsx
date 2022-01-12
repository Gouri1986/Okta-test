import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginUser } from "../../shared/apis/login/login";
import { addUser } from "../../redux/user/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user !== null) {
      dispatch(addUser(user));
      navigate("/environmentcatelogue");
    }
  }, []);

  const [loginForm, setLoginForm] = useState({
    username: "adamya@banyandata.com",
    password: "password",
  });

  const authenticate = async () => {
    const loginRes = await loginUser(loginForm);
    const {
      data: { token },
    } = loginRes;
    if (token) {
      sessionStorage.setItem("user", token);
      dispatch(addUser(token));
      navigate("/environmentcatelogue");
    }
  };

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      className='flex-r-jc-ac mt-200'
      autoComplete='off'
    >
      <div className='flex-c '>
        <TextField
          required
          value={loginForm.username}
          onChange={(e) =>
            setLoginForm({ ...loginForm, username: e.target.value })
          }
          id='outlined-required'
          label='Email'
        />
        <TextField
          id='outlined-required'
          label='Password'
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <Button
          onClick={authenticate}
          variant='contained'
          className='bg-primary'
        >
          Login
        </Button>
      </div>
    </Box>
  );
};

export default Login;
