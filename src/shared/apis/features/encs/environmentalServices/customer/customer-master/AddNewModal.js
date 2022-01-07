// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Command, Clipboard, Database, Image } from 'react-feather'
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
  CustomInput
} from 'reactstrap'

import axios from 'axios'

import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'

const AddNewModal = ({ open, handleModal, fetchData }) => {
  // ** State
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
 const [data, setData] = useState([])
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [customerbusinessName, setCustomerBusinessName] = useState("")
  const [customerbusinessType, setCustomerBusinessType] = useState("")
  const [customerprofile, setCustomerProfile] = useState("")
  const [customerprofileFile, setCustomerProfileFile] = useState("")
  const [mimeTypecolumn, setMimeTypeColumn] = useState("")
  const [filenamecolumn, setFilenameColumn] = useState("")
  const [customerlocationAddress1, setCustomerLocationAddress1] = useState("")
  const [customerlocationAddress2, setCustomerLocationAddress2] = useState("")
  const [customerlocationAddress3, setCustomerLocationAddress3] = useState("")
  const [customerlocationCity, setCustomerLocationCity] = useState("")
  const [customercityPincode, setCustomerCityPincode] = useState()
  const [countrycode, setCountryCode] = useState()
  const [customerprimaryPhone, setCustomerPrimaryPhone] = useState()
  const [customersecondaryPhone, setCustomerSecondaryPhone] = useState()
  const [customerprimaryEmailDomain, setCustomerPrimaryEmailDomain] = useState("")
  const [customersecondaryEmailDomain, setCustomerSecondaryEmailDomain] = useState("")
  const [customerurl, setCustomerUrl] = useState("")
  const [customerlogo, setCustomerLogo] = useState("")

  
   //-Dropdown selection handler-
   const [customercountry, setCustomerCountry] = useState("")
   const [states, setStates] = useState([])

  const index = data.findIndex(obj => obj.country_name === customercountry)
  console.log("Index value country= ", index)

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setStates(data[index].states)
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
   
  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-customer-master`, {
      countryCode: countrycode,
      customerBusinessName: customerbusinessName,
      customerBusinessType: customerbusinessType,
      customerCityPincode: customercityPincode,
      customerCountry: customercountry,
      customerId: customercountry,
      customerLocationAddress1: customerlocationAddress1,
      customerLocationAddress2: customerlocationAddress2,
      customerLocationAddress3: customerlocationAddress3,
      customerLocationCity: customerlocationCity,
      customerLogo:customerlogo,
      customerPrimaryEmailDomain: customerprimaryEmailDomain,
      customerPrimaryPhone: customerprimaryPhone,
      customerProfile:customerprofile,
      customerProfileFile: customerprofileFile,
      customerSecondaryEmailDomain: customersecondaryEmailDomain,
      customerSecondaryPhone: customersecondaryPhone,
      customerState: customerstate,
      customerUrl: customerurl,
      filenameColumn: filenamecolumn,
      mimeTypeColumn:mimeTypecolumn
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/get-countries`
    
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
const [datatwo, setDataTwo] = useState([])
useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-states`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching!")
    setDataTwo(response.data.data)
    // console.log(response.data.data)
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
    CustomerName: yup.string().min(5).required(),
    BusinessType: yup.string().min(5).required(),
    ProfileFile: yup.string().min(5).required(),
    MIMEType: yup.string().min(5).required(),
    FileName: yup.string().min(5).required(),
    City: yup.string().required('Please Enter the City Name'),
    URL: yup.string().url()
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
        <h5 className='modal-title'style={{color:'black'}}>New Customer Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>

      <FormGroup>
          <Label for='CustomerName' style={{fontSize:'1rem'}}>Customer Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='CustomerName' name='CustomerName' innerRef={register({ required: true })} invalid={errors.CustomerName && true} placeholder='' onChange={(e) => setCustomerBusinessName(e.target.value)} />
            {errors && errors.CustomerName && <FormFeedback>Customer Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='BusinessType' style={{fontSize:'1rem'}}>Business Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Command size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='BusinessType' name='BusinessType' innerRef={register({ required: true })} invalid={errors.BusinessType && true} placeholder='' onChange={(e) => setCustomerBusinessType(e.target.value)}/>
            {errors && errors.BusinessType && <FormFeedback>Business Type must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='Profile' style={{fontSize:'1rem'}}>Profile</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <CustomInput type='file' id='exampleCustomFileBrowser' name='customFile' />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='ProfileFile' style={{fontSize:'1rem'}}>Profile File</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='ProfileFile' name='ProfileFile' innerRef={register({ required: true })} invalid={errors.ProfileFile && true} placeholder='' onChange={(e) => setCustomerProfileFile(e.target.value)} />
            {errors && errors.ProfileFile && <FormFeedback>Profile File must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='MIMEType' style={{fontSize:'1rem'}}>MIME Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='MIMEType' name='MIMEType' innerRef={register({ required: true })} invalid={errors.MIMEType && true} placeholder='' onChange={(e) => setMimeTypeColumn(e.target.value)} />
            {errors && errors.MIMEType && <FormFeedback>MIME Type must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='FileName' style={{fontSize:'1rem'}}>File Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='FileName' name='FileName' innerRef={register({ required: true })} invalid={errors.FileName && true} placeholder='' onChange={(e) => setFilenameColumn(e.target.value)} />
            {errors && errors.FileName && <FormFeedback>File Name must be at least 5 characters</FormFeedback>}
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
            <Input id='Address1' name='Address1' innerRef={register({ required: true })} invalid={errors.Address1 && true} placeholder='' onChange={(e) => setCustomerLocationAddress1(e.target.value)} />
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
            <Input id='Address2' name='Address2' innerRef={register({ required: true })} invalid={errors.Address2 && true} placeholder='' onChange={(e) => setCustomerLocationAddress2(e.target.value)} />
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
            <Input id='Address3' name='Address3' innerRef={register({ required: true })} invalid={errors.Address3 && true} placeholder='' onChange={(e) => setCustomerLocationAddress3(e.target.value)} />
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
          <Input type='select' name='select' id='select-country_name' onChange={changeSelectOptionHandlerCountry}>
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
          <Label for='State' style={{fontSize:'1rem'}}>State</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='State' onChange={changeSelectOptionHandlerState}>
            <option disabled hidden selected> Choose state </option>
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
            <Input id='City' name='City' innerRef={register({ required: true })} invalid={errors.City && true} placeholder='' onChange={(e) => setCustomerLocationCity(e.target.value)} />
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
            <Input id='Pincode' name='Pincode' innerRef={register({ required: true })} invalid={errors.Pincode && true} placeholder='' onChange={(e) => setCustomerCityPincode(e.target.value)} />
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
            <Input id='CountryCode' name='CountryCode' innerRef={register({ required: true })} invalid={errors.CountryCode && true} placeholder='' onChange={(e) => setCountryCode(e.target.value)} />
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
            <Input id='PrimaryPhone' name='PrimaryPhone' innerRef={register({ required: true })} invalid={errors.PrimaryPhone && true} placeholder='' onChange={(e) => setCustomerPrimaryPhone(e.target.value)} />
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
            <Input id='SecondaryPhone' name='SecondaryPhone' innerRef={register({ required: true })} invalid={errors.SecondaryPhone && true} placeholder='' onChange={(e) => setCustomerSecondaryPhone(e.target.value)} />
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
            <Input id='PrimaryEmail' name='PrimaryEmail' innerRef={register({ required: true })} invalid={errors.PrimaryEmail && true} placeholder='' onChange={(e) => setCustomerPrimaryEmailDomain(e.target.value)} />
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
            <Input id='SecondaryEmail' name='SecondaryEmail' innerRef={register({ required: true })} invalid={errors.SecondaryEmail && true} placeholder='' onChange={(e) => setCustomerSecondaryEmailDomain(e.target.value)} />
            {errors && errors.SecondaryEmail && <FormFeedback>{errors.SecondaryEmail.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='URL' style={{fontSize:'1rem'}}>URL</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} /> 
              </InputGroupText>
            </InputGroupAddon>
            <Input id='URL' name='URL' innerRef={register({ required: true })} invalid={errors.URL && true} placeholder='' onChange={(e) => setCustomerUrl(e.target.value)} />
            {errors && errors.URL && <FormFeedback>{errors.URL.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='logo' style={{fontSize:'1rem'}}>Logo</Label>
          <InputGroup>
          <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Image size={15} />
              </InputGroupText>
            </InputGroupAddon>
          <CustomInput type='file' id='exampleCustomFileBrowser' name='customFile' />
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