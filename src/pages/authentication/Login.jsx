import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginUser } from "../../apis/login/login";

const Login = ({ setUser }) => {
  const [loginForm, setLoginForm] = useState({
    username: "adamya@banyandata.com",
    password: "password",
  });

  const authenticate = async () => {
    const loginRes = await loginUser(loginForm);
    const {
      data: { token },
    } = loginRes;
    setUser(token);
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
        <Button onClick={authenticate} variant='contained'>
          Login
        </Button>
      </div>
    </Box>
  );
};

export default Login;
