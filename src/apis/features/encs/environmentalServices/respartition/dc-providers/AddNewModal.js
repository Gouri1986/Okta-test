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
const AddNewModal = ({ open, handleModal, fetchData }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [providername, setproviderName] = useState("")
  const [providercitypincode, setproviderCityPincode] = useState()
  const [providercountrycode, setproviderCountryCode] = useState()
  const [providerlocationaddress1, setproviderLocationAddress1] = useState("")
  const [providerlocationaddress2, setproviderLocationAddress2] = useState("")
  const [providerlocationaddress3, setproviderLocationAddress3] = useState("")
  const [providerlocationcity, setproviderLocationCity] = useState("")
  const [providerprimaryemail, setproviderPrimaryEmail] = useState("")
  const [providerprimaryphone, setproviderPrimaryPhone] = useState()
  const [dcprovidersecondaryemail, setdcProviderSecondaryEmail] = useState("")
  const [providersecondaryphone, setproviderSecondaryPhone] = useState()
  
  //-  country Dropdown selection handler -
  const [providercountry, setproviderCountry] = useState("")
  const [state, setState] = useState([])
  const [countrystate, setCountryState] = useState([])

  const index = data.findIndex(obj => obj.country_name === providercountry)
  console.log("Index value country= ", index)// Printing the index value of selected option

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setState(data[index].states)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log("States selected= ", countrystate)
  const changeSelectOptionHandlerproviderCountry = (event) => {
    setproviderCountry(event.target.value)
  }
 //-Dropdown selection handler End-
 const changeSelectOptionHandlerproviderState = (event) => {
  setCountryState(event.target.value)
}

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-dc-providers`, {
      dcProviderCityPincode : providercitypincode,
      dcProviderCountry : providercountry,
      dcProviderCountryCode : providercountrycode,
      dcProviderLocationAddress1 : providerlocationaddress1,
      dcProviderLocationAddress2 : providerlocationaddress2,
      dcProviderLocationAddress3 : providerlocationaddress3,
      dcProviderLocationCity : providerlocationcity,
      dcProviderName : providername,
      dcProviderPrimaryEmail : providerprimaryemail,
      dcProviderPrimaryPhone : providerprimaryphone,
      dcProviderSecondaryEmail : dcprovidersecondaryemail,
      dcProviderSecondaryPhone : providersecondaryphone,
      dcProviderState : countrystate
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
      axios.get(`${process.env.REACT_APP_URL}/api/v1/get-countries`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from provider!")
      setData(response.data.data)
      console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
   })
  }, [])
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
    DCProviderName: yup.string().min(10).required(),
    RegionLocation: yup.string().min(10).required(),
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
        <h5 className='modal-title'style={{color:'black'}}>New Dc Provider</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
          <Label for='DCProviderName' style={{fontSize:'1rem'}}>DC Provider Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='DCProviderName' 
            name='DCProviderName' innerRef={register({ required: true })} invalid={errors.DCProviderName && true} 
            onChange={(e) => setproviderName(e.target.value)} />
            {errors && errors.DCProviderName && <FormFeedback>DC Provider Name ID must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Address1' style={{fontSize:'1rem'}}>Address 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='Address1' 
            name='Address1' innerRef={register({ required: true })} invalid={errors.Address1 && true} 
             onChange={(e) => setproviderLocationAddress1(e.target.value)}/>
             {errors && errors.Address1 && <FormFeedback>Address1 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Address2' style={{fontSize:'1rem'}}>Address 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='Address2' 
            name='Address2' innerRef={register({ required: true })} invalid={errors.Address2 && true}
            onChange={(e) => setproviderLocationAddress2(e.target.value)}/>
            {errors && errors.Address2 && <FormFeedback>Address2 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Address3' style={{fontSize:'1rem'}}>Address 3</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='Address3' 
            name='Address3' innerRef={register({ required: true })} invalid={errors.Address3 && true} 
             onChange={(e) => setproviderLocationAddress3(e.target.value)}/>
             {errors && errors.Address3 && <FormFeedback>Address3 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
      
        <FormGroup>
        <Label for='dcProviderCountry' style={{fontSize:'1rem'}}>Country</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='dcProviderCountry' onChange={changeSelectOptionHandlerproviderCountry}>
            <option disabled hidden selected> Choose country </option>
            {data.map(item => (
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
          <Label for='CountryCode' style={{fontSize:'1rem'}}>Country code</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='CountryCode' 
            name='CountryCode' innerRef={register({ required: true })} invalid={errors.CountryCode && true} 
             onChange={(e) => setproviderCountryCode(e.target.value)}/>
             {errors && errors.CountryCode && <FormFeedback>{errors.CountryCode.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='dcProviderState' style={{fontSize:'1rem'}}>State</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='dcProviderState' onChange={changeSelectOptionHandlerproviderState}>
          <option  disabled hidden selected> Choose State </option>
            {state.map(item => (
                <option>
                  {item.state_name}
                </option>
              )
              )
              }
        </Input>
        </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='City' style={{fontSize:'1rem'}}>City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='City' 
            name='City' innerRef={register({ required: true })} invalid={errors.City && true}
             onChange={(e) => setproviderLocationCity(e.target.value)}/>
             {errors && errors.City && <FormFeedback>{errors.City.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Pincode' style={{fontSize:'1rem'}}>Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='Pincode' 
            name='Pincode' innerRef={register({ required: true })} invalid={errors.Pincode && true} 
            onChange={(e) => setproviderCityPincode(e.target.value)}/>
            {errors && errors.Pincode && <FormFeedback>{errors.Pincode.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryPhone' style={{fontSize:'1rem'}}>Primary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='PrimaryPhone' name='PrimaryPhone' innerRef={register({ required: true })} invalid={errors.PrimaryPhone && true} 
           onChange={(e) => setproviderPrimaryPhone(e.target.value)}/>
           {errors && errors.PrimaryPhone && <FormFeedback>{errors.PrimaryPhone.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='SecondaryPhone' style={{fontSize:'1rem'}}>Secondary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='SecondaryPhone' name='SecondaryPhone' innerRef={register({ required: true })} invalid={errors.SecondaryPhone && true}
            onChange={(e) => setproviderSecondaryPhone(e.target.value)}/>
            {errors && errors.SecondaryPhone && <FormFeedback>{errors.SecondaryPhone.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryEmail' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='PrimaryEmail' name='PrimaryEmail'
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryEmail && true} 
            onChange={(e) => setproviderPrimaryEmail(e.target.value)}/>
            {errors && errors.PrimaryEmail && <FormFeedback>{errors.PrimaryEmail.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='SecondaryEmail' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='SecondaryEmail' name='SecondaryEmail'
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryEmail && true}  
            onChange={(e) => setdcProviderSecondaryEmail(e.target.value)}/>
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