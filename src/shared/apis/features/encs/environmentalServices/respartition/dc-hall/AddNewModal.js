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
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
    
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [city, setcity] = useState("")
  const [pincode, setpincode] = useState()
  const [countryCode, setcountryCode] = useState()
  const [address1, setaddress1] = useState("")
  const [address2, setaddress2] = useState("")
  const [address3, setaddress3] = useState("")
  const [primaryEmail, setprimaryEmail] = useState("")
  const [primaryPhone, setprimaryPhone] = useState()
  const [secondaryEmail, setsecondaryEmail] = useState("")
  const [secondaryPhone, setsecondaryPhone] = useState()
  const [state, setstate] = useState("")
  const [dchallname, setDchallName] = useState("")

   //-Dc name Dropdown selection handler-
   const [dcname, setDcName] = useState('')
   const [dcid, setdcId] = useState('')

   const index = data.findIndex(obj => obj.dcName === dcname)
   console.log("Index value Business= ", index)
   useEffect(() => {
    try { //This try is solve the Type undifined error
      setdcId(data[index].dcId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log("Id = ", dcid)
   const changeSelectOptionHandlerDcHallName = (event) => {
    setDcName(event.target.value)
   }
  //-Dropdown selection handler End-

  //-Dc name Dropdown selection handler-
  const [country, setcountry] = useState('')
  const [states, setStates] = useState([])
  
  const index2 = datatwo.findIndex(obj => obj.country_name === country)
  console.log("Index value Business= ", index)

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setStates(datatwo[index2].states)
    } catch (error) {
      console.log('Spec', error)
    }
  })

  const changeSelectOptionHandlerCountry = (event) => {
    setcountry(event.target.value)
  }
  const changeSelectOptionHandlerState = (event) => {
    setstate(event.target.value)
  }
 //-Dropdown selection handler End-
  const handlePost = (evt) => {
   
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-dc-hall`, {
          dcHallCity : city,
          dcHallCityPincode : pincode,
          dcHallCountry : country,
          dcHallCountryCode : countryCode,
          dcHallLocationAddress1 : address1,
          dcHallLocationAddress2 : address2,
          dcHallLocationAddress3 : address3,
          dcHallName : dchallname,
          dcHallPrimaryEmail : primaryEmail,
          dcHallPrimaryPhone : primaryPhone,
          dcHallSecondaryEmail : secondaryEmail,
          dcHallSecondaryPhone : secondaryPhone,
          dcHallState : state,
          dcId : dcid,
          dcName : dcname

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
        console.log('Response = ', response)
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

  //--Fetching Dropdown Api 1
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-dcNames`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from dc name!")
      
      setData(response.data.data)
      console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
   })
  }, [])
  //--Fetching Dropdown Api 1
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/get-countries`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from dc name!")
      
      setDataTwo(response.data.data)
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
    dchallname: yup.string().min(5).required(),
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
        <h5 className='modal-title'style={{color:'black'}}>New DC Hall</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
          <Label for='dchallname' style={{fontSize:'1rem'}}>DC Hall Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='dchallname' 
            name='dchallname' innerRef={register({ required: true })} invalid={errors.dchallname && true}
            onChange={(e) => setDchallName(e.target.value)} />
            {errors && errors.dchallname && <FormFeedback>DC Hall Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
      
        <FormGroup>
        <Label for='dcname' style={{fontSize:'1rem'}}>DC Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='dcname' onChange={changeSelectOptionHandlerDcHallName}>
           <option disabled hidden selected> Choose Dc Name </option>
            {data.map(item => (
              <option
                key={data.dcName}
                value={data.dcName}
                
              >
                {item.dcName}
              </option>
            ))}
        </Input>
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
            <Input id='Address1' name='Address1' innerRef={register({ required: true })} invalid={errors.Address1 && true}  placeholder='' onChange={(e) => setaddress1(e.target.value)} />
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
            <Input id='Address2' name='Address2' innerRef={register({ required: true })} invalid={errors.Address2 && true}  placeholder='' onChange={(e) => setaddress2(e.target.value)} />
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
            <Input id='Address3' name='Address3' innerRef={register({ required: true })} invalid={errors.Address3 && true}  placeholder='' onChange={(e) => setaddress3(e.target.value)} />
            {errors && errors.Address3 && <FormFeedback>Address3 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='country' style={{fontSize:'1rem'}}>Country</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='country' onChange={changeSelectOptionHandlerCountry}>
          <option disabled hidden selected> Choose Country </option>
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
        <Label for='state' style={{fontSize:'1rem'}}>State</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='state' onChange={changeSelectOptionHandlerState}>
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
            <Input id='City' name='City' innerRef={register({ required: true })} invalid={errors.City && true}  placeholder='' onChange={(e) => setcity(e.target.value)} />
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
            <Input id='Pincode' name='Pincode' innerRef={register({ required: true })} invalid={errors.Pincode && true}  placeholder='' onChange={(e) => setpincode(e.target.value)} />
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
            <Input id='CountryCode' name='CountryCode' innerRef={register({ required: true })} invalid={errors.CountryCode && true} placeholder='' onChange={(e) => setcountryCode(e.target.value)} />
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
            <Input id='PrimaryPhone' name='PrimaryPhone' innerRef={register({ required: true })} invalid={errors.PrimaryPhone && true}
             placeholder='' onChange={(e) => setprimaryPhone(e.target.value)} />
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
            <Input id='SecondaryPhone' name='SecondaryPhone' innerRef={register({ required: true })} invalid={errors.SecondaryPhone && true}  
            placeholder='' onChange={(e) => setsecondaryPhone(e.target.value)} />
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
            <Input id='PrimaryEmail' name='PrimaryEmail'  
            innerRef={register({ required: true })}
            invalid={errors.PrimaryEmail && true}
            placeholder='' onChange={(e) => setprimaryEmail(e.target.value)} />
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
            <Input id='SecondaryEmail' name='SecondaryEmail'
             innerRef={register({ required: true })}
             invalid={errors.SecondaryEmail && true} 
             placeholder='' onChange={(e) => setsecondaryEmail(e.target.value)} />
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