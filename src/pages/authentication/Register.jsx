import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    cloudTenantName: "",
    ctgName: "",
    roleType: "",
    roleRegion: "",
  });

  const [customRoleType, setCustomRoleType] = useState([]);
  const [defaultRoleType, setDefaultRoleType] = useState([]);

  const createUser = async () => {
    console.log(form);
    const response = await axios.post(
      "/okta-nodejs/us-central1/createUser",
      form
    );
    const { data } = response;
    if (data.done) {
      setOpenSnack(true);
      setTimeout(() => {
        history.push("/o_login");
      }, 3000);
    }
  };

  const getRoleType = async () => {
    const response1 = await axios.get(
      "http://172.16.1.240:32247/api/v1/list-custom-cloud-role-id"
    );
    const response2 = await axios.get(
      "http://172.16.1.240:32247/api/v1/list-default-cloud-role-id"
    );
    if (response1.data.data?.length > 0) {
      setCustomRoleType(response1.data.data);
    }
    if (response2.data.data?.length > 0) {
      setDefaultRoleType(response2.data.data);
    }
  };

  useEffect(() => {
    getRoleType();
  }, []);

  return (
    <div className='flex-c-jc-ac wp-100 hp-100'>
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete='off'
      >
        <InputLabel id='demo-multiple-name-label'>Basic Information</InputLabel>

        <div>
          <TextField
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            fullWidth
            required
            id='first-name'
            label='First Name'
          />
        </div>
        <div>
          <TextField
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            fullWidth
            required
            id='last-name'
            label='Last Name'
          />
        </div>
        <div>
          <TextField
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
            required
            id='email'
            label='Email Address'
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            id='primary-phone-number'
            label='Primary Phone Number'
          />
        </div>
        <div>
          <TextField
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
            required
            id='password'
            label='Password'
          />
        </div>

        <div>
          <TextField
            value={form.cloudTenantName}
            onChange={(e) =>
              setForm({ ...form, cloudTenantName: e.target.value })
            }
            fullWidth
            required
            id='cloudTenantName'
            label='cloud Tenant Name'
          />
        </div>
        <div>
          <TextField
            value={form.ctgName}
            onChange={(e) => setForm({ ...form, ctgName: e.target.value })}
            fullWidth
            required
            id='ctgName'
            label='ctgName'
          />
        </div>
        <div>
          <InputLabel style={{ marginTop: 50 }} id='demo-multiple-name-label'>
            Role Assignment
          </InputLabel>
          <Select
            value={form.roleType}
            onChange={(e) => setForm({ ...form, roleType: e.target.value })}
            fullWidth
            required
            id='roleType'
          >
            <MenuItem value={"Custom"}>Custom</MenuItem>
            <MenuItem value={"Default"}>Default</MenuItem>
          </Select>
        </div>
        {form.roleType === "Custom" && (
          <div>
            <Select
              value={form.customCloudRoleName}
              onChange={(e) =>
                setForm({
                  ...form,
                  customCloudRoleId: customRoleType.find(
                    (i) => i.customCloudRoleId === e.target.value
                  ).customCloudRoleId,
                  customRoleCloud: customRoleType.find(
                    (i) => i.customCloudRoleId === e.target.value
                  ).cloud_name,
                })
              }
              fullWidth
              required
              id='roleType'
            >
              {customRoleType.map((e) => (
                <MenuItem value={e.customCloudRoleId}>
                  {e.customCloudRoleId}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
        {form.roleType === "Default" && (
          <div>
            <Select
              value={form.defaultCloudRoleName}
              onChange={(e) =>
                setForm({
                  ...form,

                  defaultCloudRoleId: defaultRoleType.find(
                    (i) => i.defaultCloudRoleId === e.target.value
                  ).defaultCloudRoleId,
                  defaultRoleCloud: defaultRoleType.find(
                    (i) => i.defaultCloudRoleId === e.target.value
                  ).cloudName,
                })
              }
              fullWidth
              required
              id='roleType'
            >
              {defaultRoleType.map((e) => (
                <MenuItem value={e.defaultCloudRoleId}>
                  {e.defaultCloudRoleId}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
        {form.roleType === "Custom" && (
          <div>
            <TextField
              value={form.customCloudRoleName}
              onChange={(e) =>
                setForm({ ...form, customCloudRoleName: e.target.value })
              }
              fullWidth
              required
              id='customCloudRoleName'
              label='custom Cloud Role Name'
            />
          </div>
        )}
        <div>
          <TextField
            value={form.roleRegion}
            onChange={(e) => setForm({ ...form, roleRegion: e.target.value })}
            fullWidth
            required
            id='roleRegion'
            label='Role Region'
          />
        </div>
        <Button
          onClick={createUser}
          className='mt-10'
          size={"large"}
          fullWidth
          variant='contained'
        >
          Create Account
        </Button>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnack(false);
        }}
        message='User Created Successfully'
      />
    </div>
  );
};

export default Register;
