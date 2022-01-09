// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Command, Clipboard, Database } from 'react-feather'
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
  FormFeedback
} from 'reactstrap'

import axios from 'axios'

import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'

const AddNewModal = ({ open, handleModal, fetchData}) => {
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
  const [customerlocationname, setcustomerLocationName] = useState("")
  const [customerid, setcustomerId] = useState("")
  const [customerlocationaddress1, setcustomerLocationAddress1] = useState("")
  const [customerlocationaddress2, setcustomerLocationAddress2] = useState("")
  const [customerlocationaddress3, setcustomerLocationAddress3] = useState("")
  const [customerlocationcity, setcustomerLocationCity] = useState("")
  const [customercitypincode, setcustomerCityPincode] = useState()
  // const [customerstate, setcustomerState] = useState("")
  const [countrycode, setcountryCode] = useState()
  const [customerlocationphone1, setcustomerLocationPhone1] = useState()
  const [customerlocationphone2, setcustomerLocationPhone2] = useState()
  const [customerlocationemail1, setcustomerLocationEmail1] = useState()
  const [customerlocationemail2, setcustomerLocationEmail2] = useState()
  const [dummy, setDummy] = useState([])

   //-Dropdown selection handler-
   const [customerbusinessname, setcustomerBusinessName] = useState('')
   
    // Variale to store the index value of selected option
    const index = data.findIndex(obj => obj.customerBusinessName === customerbusinessname)
    console.log("Index value = ", index)// Printing the index value of selected option

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setDummy(data[index].customerId)
        //console.log("Direct = ", data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log(dummy)

    const changeSelectOptionHandlecustomerId = (event) => {
      setcustomerBusinessName(event.target.value)
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
  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-customer-location-info`, {
         countryCode : countrycode,
         customerBusinessName : customerbusinessname,
         customerCityPincode : customercitypincode,
         customerCountry : customercountry,
         customerId : dummy,
         customerLocationAddress1 : customerlocationaddress1,
         customerLocationAddress2 : customerlocationaddress2,
         customerLocationAddress3 : customerlocationaddress3,
         customerLocationCity : customerlocationcity,
         customerLocationEmail1 : customerlocationemail1,
         customerLocationEmail2 : customerlocationemail2,
         customerLocationName : customerlocationname,
         customerLocationPhone1 : customerlocationphone1,
         customerLocationPhone2 : customerlocationphone2,
         customerState : customerstate
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
        console.log("Well done!")
        console.log("Response = ", response)
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
    LocationName: yup.string().min(5).required(),
    City: yup.string().required('Please Enter the City Name')
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
        <h5 className='modal-title'style={{color:'black'}}>New Customer Location Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      
      <FormGroup>
        <Label for='Customer' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='cid'
            onChange={changeSelectOptionHandlecustomerId}
           >
           <option> Choose Customer Business </option>
            {data.map(item => (
              <option
                key={data.customerBusinessName}
                value={data.customerBusinessName}
                // onClick={dropAction}
              >
                {item.customerBusinessName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

      <FormGroup>
          <Label for='LocationName' style={{fontSize:'1rem'}}>Location Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='LocationName' 
              name='LocationName' 
              innerRef={register({ required: true })} invalid={errors.LocationName && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationName(e.target.value)} 
            />
            {errors && errors.LocationName && <FormFeedback>Location Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Address1' style={{fontSize:'1rem'}}>Address 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Address1' 
              name='Address1' 
              innerRef={register({ required: true })} invalid={errors.Address1 && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationAddress1(e.target.value)} 
            />
            {errors && errors.Address1 && <FormFeedback>Address1 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Address2' style={{fontSize:'1rem'}}>Address 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Address2' 
              name='Address2' 
              innerRef={register({ required: true })} invalid={errors.Address2 && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationAddress2(e.target.value)} 
            />
            {errors && errors.Address2 && <FormFeedback>Address2 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Address3' style={{fontSize:'1rem'}}>Address 3</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Address3' 
              name='Address3' 
              innerRef={register({ required: true })} invalid={errors.Address3 && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationAddress3(e.target.value)} 
            />
            {errors && errors.Address3 && <FormFeedback>Address3 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Country Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='select-basic' onChange={changeSelectOptionHandlerCountry}>
            <option>- Choose country -</option>
            {datatwo.map(item => (
              <option
                key={data.country_name}
                value={data.country_name}
                
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
            <option>- Choose state -</option>
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
          <Label for='City' style={{fontSize:'1rem'}}>City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='City' 
              name='City' 
              innerRef={register({ required: true })} invalid={errors.City && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationCity(e.target.value)} 
            />
            {errors && errors.City && <FormFeedback>{errors.City.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
         
        <FormGroup>
          <Label for='Pincode' style={{fontSize:'1rem'}}>Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Pincode' 
              name='Pincode' 
              innerRef={register({ required: true })} invalid={errors.Pincode && true} 
              placeholder='' 
              onChange={(e) => setcustomerCityPincode(e.target.value)} 
            />
            {errors && errors.Pincode && <FormFeedback>{errors.Pincode.message}</FormFeedback>}
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
            <Input id='CountryCode' 
              name='CountryCode' 
              innerRef={register({ required: true })} invalid={errors.CountryCode && true} 
              placeholder='' 
              onChange={(e) => setcountryCode(e.target.value)} 
            />
            {errors && errors.CountryCode && <FormFeedback>{errors.CountryCode.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='PrimaryPhone' style={{fontSize:'1rem'}}>Primary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryPhone' 
              name='PrimaryPhone' 
              innerRef={register({ required: true })} invalid={errors.PrimaryPhone && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationPhone1(e.target.value)} 
            />
            {errors && errors.PrimaryPhone && <FormFeedback>{errors.PrimaryPhone.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryPhone' style={{fontSize:'1rem'}}>Secondary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryPhone' 
              name='SecondaryPhone' 
              innerRef={register({ required: true })} invalid={errors.SecondaryPhone && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationPhone2(e.target.value)} 
            />
            {errors && errors.SecondaryPhone && <FormFeedback>{errors.SecondaryPhone.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='PrimaryEmail' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryEmail' 
              name='PrimaryEmail' 
              innerRef={register({ required: true })} invalid={errors.PrimaryEmail && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationEmail1(e.target.value)} 
            />
            {errors && errors.PrimaryEmail && <FormFeedback>{errors.PrimaryEmail.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryEmail' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryEmail' 
              name='SecondaryEmail' 
              innerRef={register({ required: true })} invalid={errors.SecondaryEmail && true} 
              placeholder='' 
              onChange={(e) => setcustomerLocationEmail2(e.target.value)} 
            />
            {errors && errors.SecondaryEmail && <FormFeedback>{errors.SecondaryEmail.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

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