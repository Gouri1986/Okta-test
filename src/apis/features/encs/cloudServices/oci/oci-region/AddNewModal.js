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
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [regionid, setregionid] = useState("")
  const [city, setcity] = useState("")
  const [pincode, setpincode] = useState()
  const [countrycode, setcountryCode] = useState()
  const [location, setlocation] = useState("")
  const [address1, setaddress1] = useState("")
  const [address2, setaddress2] = useState("")
  const [address3, setaddress3] = useState("")
  const [primaryEmail, setprimaryEmail] = useState("")
  const [primaryPhone, setprimaryPhone] = useState()
  const [secondryEmail, setsecondryEmail] = useState("")
  const [secondryphone, setsecondryPhone] = useState()

  const [cloudname, setcloudName] = useState("")
  const [cloudId, setcloudId] = useState("")
  const index = data.findIndex(obj => obj.cloudName === cloudname)
  console.log("Index Name = ", index)
  useEffect(() => {
  try {
    setcloudId(data[index].cloudMasterId)
  } catch (error) {
    console.log('Spec', error)
  }
  })
  console.log('cloudId', cloudId)

  const CustomerDropDown = (event) => {
    setcloudName(event.target.value)
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
      setsecondryPhone(event.target.value)
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
      setsecondryEmail(event.target.value)
    }
  }
  const [emailbuttoncount, setemailbuttoncount] = useState(1) //email button counter

  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-oci-region-details`, {
           cloudName : cloudname,
           regionCity : city,
           regionCityPincode : pincode,
           regionCloudId : cloudId,
           regionCountryCode : countrycode,
           regionCountry : customercountry,
           regionId : regionid,
           regionLocationAddress1 : address1,
           regionLocationAddress2 : address2,
           regionLocationAddress3 : address3,
           regionLocation : location,
           regionPrimaryEmail : primaryEmail,
           regionPrimaryPhone : primaryPhone,
           regionSecondaryEmail : secondryEmail,
           regionSecondaryPhone : secondryphone,
           regionState : customerstate
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
          const  Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, {fetchData})
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-cloudNames`
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
    RegionID: yup.string().min(10).required(),
    RegionLocation: yup.string().min(5).required(),
    City: yup.string().required('Please Enter the City Name'),
    setIscOsCategoryDescription: yup.string().max(500).required()
  })

  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    console.log(data)
  }
  // Validation Part Ends
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>New OCI Region Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
          <Label for='RegionID' style={{fontSize:'1rem'}}>Region</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='RegionID' name='RegionID' 
            innerRef={register({ required: true })} invalid={errors.RegionID && true} placeholder=''
            onChange={(e) => setregionid(e.target.value)} />
            {errors && errors.RegionID && <FormFeedback>Region ID must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
        <Label for='RegionCloud' style={{fontSize:'1rem'}}>Region Cloud  </Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='RegionCloud'
            onChange={CustomerDropDown}
           >
           <option disabled hidden selected>Region Cloud</option>
            {data.map(item => (
              <option
                key={data.cloudName}
                value={data.cloudName}
              >
                {item.cloudName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='RegionLocation' style={{fontSize:'1rem'}}>Region Location</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='RegionLocation' name='RegionLocation' innerRef={register({ required: true })} invalid={errors.RegionLocation && true} placeholder='' onChange={(e) => setlocation(e.target.value)} />
            {errors && errors.RegionLocation && <FormFeedback>Region Location must be at least 5 characters</FormFeedback>}
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
        <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Country Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
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
          <Label for='State' style={{fontSize:'1rem'}}>State</Label>
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
          <Label for='CountryCode' style={{fontSize:'1rem'}}>Country Code</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='CountryCode' name='CountryCode' innerRef={register({ required: true })} invalid={errors.CountryCode && true} placeholder='' onChange={(e) => setcountryCode(e.target.value)} />
            {errors && errors.CountryCode && <FormFeedback>{errors.CountryCode.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
       
        <FormGroup>
          <Label for='City' style={{fontSize:'1rem'}}>Region City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Command size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='City' name='City' innerRef={register({ required: true })} invalid={errors.City && true} placeholder='' onChange={(e) => setcity(e.target.value)}/>
            {errors && errors.City && <FormFeedback>{errors.City.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Pincode' style={{fontSize:'1rem'}}>Region Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='Pincode' name='Pincode' innerRef={register({ required: true })} invalid={errors.Pincode && true} placeholder='' onChange={(e) => setpincode(e.target.value)}/>
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

        <Button className='mr-1' color='primary' onClick={ () => {
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