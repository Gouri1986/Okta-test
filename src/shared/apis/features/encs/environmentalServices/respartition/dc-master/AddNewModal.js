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

  
   // dummy Token 
   const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [datatwo, setDataTwo] = useState([])
  const [data, setData] = useState([])
  const [datathree, setDataThree] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [city, setcity] = useState("")
  const [pincode, setpincode] = useState("")
  const [locationaddress1, setlocationAddress1] = useState("")
  const [locationaddress2, setlocationAddress2] = useState("")
  const [locationaddress3, setlocationAddress3] = useState("")
  const [namedc, setnameDc] = useState("")
  const [primaryemail, setprimaryEmail] = useState("")
  const [primaryphone, setprimaryPhone] = useState("")
  const [providertype, setproviderType] = useState("")
  const [secondaryemail, setsecondaryEmail] = useState("")
  const [secondaryphone, setsecondaryPhone] = useState("")
  const [state, setState] = useState("")
   
 
   //-Dropdown selection handler-
     const [customerbusinessname, setCustomerBusinessName] = useState('')
     const [customerbusinessid, setCustomerBusinessId] = useState('')

     const index = datatwo.findIndex(obj => obj.customerBusinessName === customerbusinessname)
     console.log("Index value Business= ", index)// Printing the index value of selected option
     console.log("Business Id = ", customerbusinessid)
     useEffect(() => {
      try { //This try is solve the Type undifined error
        setCustomerBusinessId(datatwo[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })

     const changeSelectOptionHandlerCustomerBusinessName = (event) => {
      setCustomerBusinessName(event.target.value)
     }
    //-Dropdown selection handler End-
    
    const [providerId, setproviderId] = useState("")
    const [providerName, setproviderName] = useState("")
    const index3 = data.findIndex(obj => obj.dcProviderName === providerName)
    console.log("Index value providerName= ", index3)// Printing the index3 value of selected option
    console.log("providerName = ", customerbusinessid)
    useEffect(() => {
     try { //This try is solve the Type undifined error
      setproviderId(data[index3].dcProviderId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log("providerId", providerId)
    const changeSelectOptionHandlerProvider = (event) => {
      setproviderName(event.target.value)
    }

    //-Country Dropdown selection handler-
    const [country, setCountry] = useState('')
    const [states, setStates] = useState([])

    const index2 = datathree.findIndex(obj => obj.country_name === country)
    console.log("Index value country= ", index2)// Printing the index value of selected option
    
    useEffect(() => {
      try { //This try is solve the Type undifined error
        setStates(datathree[index2].states)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    const changeSelectOptionHandlerCountry = (event) => {
      setCountry(event.target.value)
    }
    //-Dropdown selection handler End-

    //-Country Dropdown selection handler-
  
    const changeSelectOptionHandlerState = (event) => {
      setState(event.target.value)
    }
      //-Dropdown selection handler End-
      console.log("Country selected =", country)
      console.log("State selected =", state)
  const handlePost = (evt) => {
      axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-dc-master`, {
        customerBusinessName : customerbusinessname,
        dcCity : city,
        dcCityPincode : pincode,
        dcCountry : country,
        dcCustomerId : customerbusinessid,
        dcLocationAddress1 : locationaddress1,
        dcLocationAddress2 : locationaddress2,
        dcLocationAddress3 : locationaddress3,
        dcName : namedc,
        dcPrimaryEmail : primaryemail,
        dcPrimaryPhone : primaryphone,
        dcProviderId : providerId,
        dcProviderName : providerName,
        dcProviderType : providertype,
        dcSecondaryEmail : secondaryemail,
        dcSecondaryPhone : secondaryphone,
        dcState : state
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
  }
  //--Fetching Dropdown Api 1
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-dcProviderNames`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from dc name!")
      // const options = data.map(d => ({
      //   value : d.id,
      //   label : d.name
      // }))
     //  setIsLoaded(true)
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
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from list!")
      setDataTwo(response.data.data)
      console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
   })
  }, [])

    //--Fetching Dropdown Api Country
  
    useEffect(() => { 
      // if (isLoaded === false) {
        axios.get(`${process.env.REACT_APP_URL}/api/v1/get-countries`
        
      )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching from list!")
        
        setDataThree(response.data.data)
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
    DCName: yup.string().min(5).required(),
    ProviderType: yup.string().min(2).required(),
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
        <h5 className='modal-title'style={{color:'black'}}>New DC Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
  
      <FormGroup>
          <Label for='DCName' style={{fontSize:'1rem'}}>DC Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='DCName' name='DCName' innerRef={register({ required: true })} invalid={errors.DCName && true} placeholder='' onChange={(e) => setnameDc(e.target.value)} />
            {errors && errors.DCName && <FormFeedback>DC Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
       
        <FormGroup>
        <Label for='businessname' style={{fontSize:'1rem'}}>Customer Business Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='businessname' onChange={changeSelectOptionHandlerCustomerBusinessName}>
            <option disabled hidden selected> Choose Business Name </option>
            {datatwo.map(item => (
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
          <Label for='ProviderType' style={{fontSize:'1rem'}}>Provider Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='ProviderType' name='ProviderType'
            innerRef={register({ required: true })} invalid={errors.ProviderType && true}
             onChange={(e) => setproviderType(e.target.value)} />
           {errors && errors.ProviderType && <FormFeedback>Provider Type must be at least 2 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
        <Label for='Provider' style={{fontSize:'1rem'}}>Provider</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Provider' onChange={changeSelectOptionHandlerProvider}>
            <option disabled hidden selected> Choose Provider</option>
            {data.map(item => (
              <option
                key={data.dcProviderName}
                value={data.dcProviderName}
                
              >
                {item.dcProviderName}
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
            <Input id='Address1' name='Address1' innerRef={register({ required: true })} invalid={errors.Address1 && true} placeholder='' onChange={(e) => setlocationAddress1(e.target.value)} />
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
            <Input id='Address2' name='Address2' innerRef={register({ required: true })} invalid={errors.Address2 && true}  placeholder='' onChange={(e) => setlocationAddress2(e.target.value)} />
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
            <Input id='Address3' name='Address3' innerRef={register({ required: true })} invalid={errors.Address3 && true} placeholder='' onChange={(e) => setlocationAddress3(e.target.value)} />
            {errors && errors.Address3 && <FormFeedback>Address3 must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Country</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Country' 
          onChange={changeSelectOptionHandlerCountry}>
          <option disabled  hidden selected> Choose Country</option>
            {datathree.map(item => (
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
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='State' 
          onChange={changeSelectOptionHandlerState}>
            <option disabled  hidden selected> Choose State </option>
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
            <Input id='City' name='City' innerRef={register({ required: true })} invalid={errors.City && true}
            placeholder='' 
            onChange={(e) => setcity(e.target.value)} />
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
            innerRef={register({ required: true })}
            invalid={errors.Pincode && true}
             placeholder='' onChange={(e) => setpincode(e.target.value)} />
            {errors && errors.Pincode && <FormFeedback>{errors.Pincode.message}</FormFeedback>}
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
            <Input id='PrimaryPhone' name='PrimaryPhone' 
            innerRef={register({ required: true })} invalid={errors.PrimaryPhone && true} 
            placeholder=''
             onChange={(e) => setprimaryPhone(e.target.value)} />
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
            <Input id='SecondaryPhone' name='SecondaryPhone' 
            innerRef={register({ required: true })} invalid={errors.SecondaryPhone && true} 
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
            <Input id='PrimaryEmail' name='PrimaryEmail' innerRef={register({ required: true })} invalid={errors.PrimaryEmail && true} placeholder='' onChange={(e) => setprimaryEmail(e.target.value)} />
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
            <Input id='SecondaryEmail' name='SecondaryEmail' innerRef={register({ required: true })} invalid={errors.SecondaryEmail && true} placeholder='' onChange={(e) => setsecondaryEmail(e.target.value)} />
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