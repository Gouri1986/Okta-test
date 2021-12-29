// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Third Party Components
import { X, Layers, Command, Plus, Database } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  FormFeedback,
  Alert
} from 'reactstrap'

import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'

import axios from 'axios'
import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'

const AddNewModal = ({ open, handleModal, fetchData }) => {
  // ** State
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [nameCloud, setnameCloud] = useState("")
  const [ownerCity, setownerCity] = useState("")
  const [ownerCityPincode, setownerCityPincode] = useState()
  const [ownerCountryCode, setownerCountryCode] = useState()
  const [address1, setaddress1] = useState("")
  const [address2, setaddress2] = useState("")
  const [address3, setaddress3] = useState("")
  const [ownerName, setownerName] = useState("")
  const [primaryEmail, setprimaryEmail] = useState("")
  const [primaryPhone, setprimaryPhone] = useState()
  const [secondaryEmail, setsecondaryEmail] = useState("")
  const [secondaryPhone, setsecondaryPhone] = useState()
  const [typeCloud, settypeCloud] = useState("Private")
  const [cloudConfig, setcloudConfig] = useState("Default")
  const [cloudNamePrivate, setcloudNamePrivate] = useState("")


  const [idCustomer, setidCustomer] = useState("")
  const [customername, setCustomerName] = useState("")
  console.log("Name = ", customername)
  console.log("cid = ", idCustomer)

  const index = data.findIndex(obj => obj.customerBusinessName === customername)
  console.log("Index Name = ", index)
  useEffect(() => {
    try {
      setidCustomer(data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  const CustomerDropDown = (event) => {
    setCustomerName(event.target.value)
  }

  //-Dropdown selection handler-
  const [customercountry, setCustomerCountry] = useState("")
  const [states, setStates] = useState([])

  const index2 = datatwo.findIndex(obj => obj.country_name === customercountry)
  console.log("Index value country= ", index2)

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setStates(datatwo[index2].states)
    } catch (error) {
      console.log('Spec', error)
    }
  })

  const changeSelectOptionHandlerCountry = (event) => {
    setCustomerCountry(event.target.value)
  }
  console.log(states)
  //-Dropdown selection handler End-

  //-Dropdown selection handler-
  const [customerstate, setCustomerState] = useState("")
  const changeSelectOptionHandlerState = (event) => {
    setCustomerState(event.target.value)
  }
  console.log(customerstate)
  //-Dropdown selection handler End-


  //-------------Address repeater component state------------------ 
  const [count, setCount] = useState(1) //address component count
  const increaseCount = () => {
    setCount(count + 1)
  }

  const [addrcount, setAddrCount] = useState(1) //address component hook check
  const addressno = (data) => {
    setAddrCount(data)
  }
  // input box checking
  const address = (event) => {
    if (addrcount === 1) {
      console.log("setAddress1")
      setaddress1(event.target.value)
    } else if (addrcount === 2) {
      setaddress2(event.target.value)
    } else {
      setaddress3(event.target.value)
    }
  }
  // button counter
  const [addbuttoncount, setaddbuttoncount] = useState(1)  //address button counter

  //Secondary phone repeater component state 
  const [phonecount, setphonecount] = useState(1)  //phone component count
  const increaseCountPh = () => {
    setphonecount(phonecount + 1)
  }
  const [phcount, setPhCount] = useState(1)   //phone component hook check
  const phno = (data) => {
    setPhCount(data)
  }
  // input box checking
  const phone = (event) => {
    if (phcount === 1) {
      console.log("setAddress1")
      setprimaryPhone(event.target.value)
    } else {
      setsecondaryPhone(event.target.value)
    }
  }
  const [phbuttoncount, setphbuttoncount] = useState(1)  //phone button counter

  //Secondary phone repeater component state 
  const [emailcount, setemailcount] = useState(1)  //email component count
  const increaseCountEmail = () => {
    setemailcount(emailcount + 1)
  }
  const [emcount, setemcount] = useState(1) //email component hook check
  const emailno = (data) => {
    setemcount(data)
  }
  // input box checking
  const email = (event) => {
    if (emcount === 1) {
      console.log("setAddress1")
      setprimaryEmail(event.target.value)
    } else {
      setsecondaryEmail(event.target.value)
    }
  }
  const [emailbuttoncount, setemailbuttoncount] = useState(1) //email button counter

  const handlePost = (evt) => {
    console.log("adrress 1 =", address1)
    console.log("adrress 1 =", address2)
    console.log("adrress 1 =", address3)
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-master`, {
      cloudName: nameCloud,
      cloudOwnerCity: ownerCity,
      cloudOwnerCityPincode: ownerCityPincode,
      cloudOwnerCountry: customercountry,
      cloudOwnerCountryCode: ownerCountryCode,
      cloudOwnerLocationAddress1: address1,
      cloudOwnerLocationAddress2: address2,
      cloudOwnerLocationAddress3: address3,
      cloudOwnerName: ownerName,
      cloudOwnerPrimaryEmail: primaryEmail,
      cloudOwnerPrimaryPhone: primaryPhone,
      cloudOwnerSecondaryEmail: secondaryEmail,
      cloudOwnerSecondaryPhone: secondaryPhone,
      cloudOwnerState: customerstate,
      cloudType: typeCloud,
      customerBusinessName: customername,
      customerId: idCustomer,
      privateCloudConfig: cloudConfig,
      privateCloudName: cloudNamePrivate
    },
      {
        headers: {
          "Content-Type": "application/json",
          "access-token": `${token}`
        }
      }
    )
      .then((response) => {
        // Handle success.
        console.log("Well done!", response)
        // setisSucess(true)
        if (response.data.message === "You are trying to insert duplicate records") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else if (response.data.message === "An unexpected internal application error has occurred. Please Contact System Administrator") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else if (response.data.message === "Parent key not found") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else {
          const Notification_msg = "Added!"
          const Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, { fetchData })
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
      
    //Making state to initial after ppost method

    setCount(1)//address component count
    setAddrCount(1)//address component hook check
    setaddbuttoncount(1)//address button counter
    setaddress1('')//address hook

    setphonecount(1)//phone component count
    setPhCount(1)//phone component hook check
    setphbuttoncount(1)//phone button counter
    setprimaryPhone()//phone hook

    setemailcount(1)//email component count
    setemcount(1)//email component hook check
    setemailbuttoncount(1)//email button counter
    setprimaryEmail('')//email hook
  }

  //--Fetching Dropdown
  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
        setData(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  //--Fetching Dropdown ends

  //--Fetching Dropdown

  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/get-countries`

    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
        setDataTwo(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  //--Fetching Dropdown ends

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    PrimaryEmail: yup.string().email().required(),
    SecondaryEmail: yup.string().email().required(),
    PrimaryPhone: yup.number().required().positive().integer(),
    SecondaryPhone: yup.number().required().positive().integer(),
    Pincode: yup.number().required().positive().integer(),
    CountryCode: yup.number().required().positive().integer(),
    Address1: yup.string().min(10).required(),
    Address2: yup.string().min(10).required(),
    Address3: yup.string().min(10).required(),
    PrivateCloudName: yup.string().min(10).required(),
    CloudName: yup.string().min(10).required(),
    OwnerName: yup.string().min(10).required(),
    RegionLocation: yup.string().min(10).required(),
    City: yup.string().required('Please Enter the City Name'),
    setIscOsCategoryDescription: yup.string().max(500).required()
  })

  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  // Validation Part 

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title' style={{ color: 'black' }}> New Cloud Master Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='cloudtype' style={{ fontSize: '1rem' }}>Cloud Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudtype' type="select" onChange={(e) => settypeCloud(e.target.value)}>
              <option disabled hidden selected> Cloud Type </option>
              <option> Private </option>
              <option> Public </option>
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Customer' style={{ fontSize: '1rem' }}>Customer </Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='cid'
              onChange={CustomerDropDown}
            >
              <option disabled hidden selected> Customer Name </option>
              {data.map(item => (
                <option
                  key={data.customerBusinessName}
                  value={data.customerBusinessName}
                >
                  {item.customerBusinessName}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='PrivateCloud' style={{ fontSize: '1rem' }}>Private Cloud Config</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrivateCloud' type="select" onChange={(e) => setcloudConfig(e.target.value)}>
              <option disabled hidden selected> Private Cloud Config </option>
              <option> Default </option>
              <option> Custom </option>
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrivateCloudName' style={{ fontSize: '1rem' }}>Private Cloud Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrivateCloudName' name='PrivateCloudName' innerRef={register({ required: true })} invalid={errors.PrivateCloudName && true} placeholder='' onChange={(e) => setcloudNamePrivate(e.target.value)} />
            {errors && errors.PrivateCloudName && <FormFeedback>Private Cloud Name must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='CloudName' style={{ fontSize: '1rem' }}>Cloud Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='CloudName' name='CloudName' innerRef={register({ required: true })} invalid={errors.CloudName && true} placeholder='' onChange={(e) => setnameCloud(e.target.value)} />
            {errors && errors.CloudName && <FormFeedback>Cloud Name must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OwnerName' style={{ fontSize: '1rem' }}>Owner Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OwnerName' name='OwnerName' innerRef={register({ required: true })} invalid={errors.OwnerName && true} placeholder='' onChange={(e) => setownerName(e.target.value)} />
            {errors && errors.OwnerName && <FormFeedback>Owner Name must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        {/* Address repeater component */}
        <Repeater count={count}>
          {i => {
            const Tag = i === 0 ? 'div' : SlideDown
            setaddbuttoncount(i)
            console.log("i", i + 1)
            return (
              <Tag key={i}>
                <FormGroup>
                  <Label for='TechCategorytag' style={{ fontSize: '1rem' }}>Address {i + 1}</Label>
                  <InputGroup>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Command size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='textarea' row='1' id='TechCategorytag' name='TechCategorytag' innerRef={register({ required: true })} invalid={errors.TechCategorytag && true}
                      placeholder=''
                      onChange={address}
                      onClick={(e) => addressno(i + 1)}
                    />
                    {errors && errors.TechCategorytag && <FormFeedback>Tag must be at least 10 characters</FormFeedback>}
                  </InputGroup>
                </FormGroup>
              </Tag>
            )
          }}
        </Repeater>
        {
          (address1) ? ((count !== 3) ? <Alert color='warning'
            className='mt-1'>
            <div className='alert-body'>
              Do you want to add more address?.<span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  increaseCount()
                }}
                color='flat-warning'
                className='ml-1'> <Plus size={14} disabled={count === 1} className='' />
                <span style={{ borderBottom: '1px solid ' }}>Add Address {addbuttoncount + 2}</span>
              </span>
            </div></Alert> : ''
          ) : ''
        }

        <FormGroup className='mt-1'>
          <Label for='Country' style={{ fontSize: '1rem' }}>Country Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='Country' onChange={changeSelectOptionHandlerCountry}>
              <option selected disabled hidden>Choose country</option>
              {datatwo.map(item => (
                <option
                  key={datatwo.country_name}
                  value={datatwo.country_name}

                >
                  {item.country_name}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='State' style={{ fontSize: '1rem' }}>State</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='State' onChange={changeSelectOptionHandlerState}>
              <option selected hidden disabled>Choose state</option>
              {states.map(item => (
                <option
                  key={data.state_name}
                  value={data.state_name}
                >
                  {item.state_name}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='CountryCode' style={{ fontSize: '1rem' }}>Country Code</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='CountryCode' name='CountryCode' innerRef={register({ required: true })} invalid={errors.CountryCode && true} placeholder='' onChange={(e) => setownerCountryCode(e.target.value)} />
            {errors && errors.CountryCode && <FormFeedback>{errors.CountryCode.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='City' style={{ fontSize: '1rem' }}>Owner City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='City' name='City' innerRef={register({ required: true })} invalid={errors.City && true} placeholder='' onChange={(e) => setownerCity(e.target.value)} />
            {errors && errors.City && <FormFeedback>{errors.City.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Pincode' style={{ fontSize: '1rem' }}>Owner Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Pincode' name='Pincode' innerRef={register({ required: true })} invalid={errors.Pincode && true} placeholder='' onChange={(e) => setownerCityPincode(e.target.value)} />
            {errors && errors.Pincode && <FormFeedback>{errors.Pincode.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <Repeater count={phonecount}>
          {i => {
            const Tag = i === 0 ? 'div' : SlideDown
            setphbuttoncount(i)
            console.log("i", i + 1)
            return (
              <Tag key={i}>
                <FormGroup>
                  <Label for='PrimaryPhone' style={{ fontSize: '1rem' }}>Phone {i + 1}</Label>
                  <InputGroup>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Database size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id='PrimaryPhone' name='PrimaryPhone' innerRef={register({ required: true })} invalid={errors.PrimaryPhone && true}
                      onChange={phone}
                      onClick={(e) => phno(i + 1)} />
                    {errors && errors.PrimaryPhone && <FormFeedback>{errors.PrimaryPhone.message}</FormFeedback>}
                  </InputGroup>
                </FormGroup>
              </Tag>
            )
          }}
        </Repeater>
        {
          (primaryPhone) ? ((phonecount !== 2) ? <Alert color='warning'
            className='mt-1'>
            <div className='alert-body'>
              Do you want to add Secondary Phone ?.<span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  increaseCountPh()
                }}
                color='flat-warning'
                className='ml-1'> <Plus size={14} disabled={count === 1} className='' />
                <span style={{ borderBottom: '1px solid ' }}>Add Phone {phbuttoncount + 2}</span>
              </span>
            </div></Alert> : ''
          ) : ''
        }
        <Repeater count={emailcount}>
          {i => {
            const Tag = i === 0 ? 'div' : SlideDown
            setemailbuttoncount(i)
            console.log("i", i + 1)
            return (
              <Tag key={i}>
                <FormGroup>
                  <Label for='SecondaryEmail' style={{ fontSize: '1rem' }}>Email {i + 1}</Label>
                  <InputGroup>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Database size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id='SecondaryEmail' name='SecondaryEmail' innerRef={register({ required: true })} invalid={errors.SecondaryEmail && true}
                      onChange={email}
                      onClick={(e) => emailno(i + 1)} />
                    {errors && errors.SecondaryEmail && <FormFeedback>{errors.SecondaryEmail.message}</FormFeedback>}
                  </InputGroup>
                </FormGroup>
              </Tag>
            )
          }}
        </Repeater>
        {
          (primaryEmail) ? ((emailcount !== 2) ? <Alert color='warning'
            className='mt-1'>
            <div className='alert-body'>
              Do you want to add Secondary Email ?.<span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  increaseCountEmail()
                }}
                color='flat-warning'
                className='ml-1'> <Plus size={14} disabled={count === 1} className='' />
                <span style={{ borderBottom: '1px solid ' }}>Add Email {emailbuttoncount + 2}</span>
              </span>
            </div></Alert> : ''
          ) : ''
        }

        <Button className='mr-1' color='primary' onClick={() => {
          handlePost()
          handleModal()
        }
        }>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal