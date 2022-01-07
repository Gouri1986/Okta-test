// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Database, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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
  Label
} from 'reactstrap'

import axios from 'axios'

import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [masterid, setmasterId] = useState("")
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
  const [typeCloud, settypeCloud] = useState("")
  const [cloudConfig, setcloudConfig] = useState("")
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

  //-------------------------Update Method---------------------------------------------
  useEffect(() => {
    setnameCloud(value.cloudName)
   })
  useEffect(() => {
    setmasterId(value.cloudMasterId)
    setownerCity(value.cloudOwnerCity)
    setownerCityPincode(value.cloudOwnerCityPincode)
    setCustomerCountry(value.cloudOwnerCountry)
    setownerCountryCode(value.cloudOwnerCountryCode)
    setaddress1(value.cloudOwnerLocationAddress1)
    setaddress2(value.cloudOwnerLocationAddress2)
    setaddress3(value.cloudOwnerLocationAddress3)
    setownerName(value.cloudOwnerName)
    setprimaryEmail(value.cloudOwnerPrimaryEmail)
    setprimaryPhone(value.cloudOwnerPrimaryPhone)
    setsecondaryEmail(value.cloudOwnerSecondaryEmail)
    setsecondaryPhone(value.cloudOwnerSecondaryPhone)
    setCustomerState(value.cloudOwnerState)
    settypeCloud(value.cloudType)
    setCustomerName(value.customerBusinessName)
    setidCustomer(value.customerId)
    setcloudConfig(value.privateCloudConfig)
    setcloudNamePrivate(value.privateCloudName)
 }, [value])

// dummy Token 
const [token, setToken] = useState(
  localStorage.getItem('token') || ''
)
  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-master`, {
      cloudName : nameCloud,
      cloudMasterId : masterid,
      cloudOwnerCity : ownerCity,
      cloudOwnerCityPincode : ownerCityPincode,
      cloudOwnerCountry : customercountry,
      cloudOwnerCountryCode : ownerCountryCode,
      cloudOwnerLocationAddress1 : address1,
      cloudOwnerLocationAddress2 : address2,
      cloudOwnerLocationAddress3 : address3,
      cloudOwnerName : ownerName,
      cloudOwnerPrimaryEmail : primaryEmail,
      cloudOwnerPrimaryPhone : primaryPhone,
      cloudOwnerSecondaryEmail : secondaryEmail,
      cloudOwnerSecondaryPhone : secondaryPhone,
      cloudOwnerState : customerstate,
      cloudType : typeCloud,
      customerBusinessName : customername,
      customerId : idCustomer,
      privateCloudConfig : cloudConfig,
      privateCloudName : cloudNamePrivate
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
          const Notification_msg = "Updated!"
          const  Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, {fetchData})
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }
//-------------------------Update Method End---------------------------------------------

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

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update Cloud Master Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
  
      <FormGroup>
          <Label for='cloudtype' style={{fontSize:'1rem'}}>Cloud Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudtype' type="select" 
            value={typeCloud}
            onChange={(e) => settypeCloud(e.target.value)}>
            <option disabled hidden selected> Cloud Type </option>
            <option> Private </option>
            <option> Public </option>
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='Customer' style={{fontSize:'1rem'}}>Customer </Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Customer'
          value={customername}
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
          <Label for='PrivateCloud' style={{fontSize:'1rem'}}>Private Cloud Config</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrivateCloud' type="select" 
            value={cloudConfig}
            onChange={(e) => setcloudConfig(e.target.value)}>
            <option disabled hidden selected> Private Cloud Config </option>
            <option> Default </option>
            <option> Custom </option>
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='PrivateCloudName' style={{fontSize:'1rem'}}>Private Cloud Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrivateCloudName'
            value={cloudNamePrivate}
            onChange={(e) => setcloudNamePrivate(e.target.value)} />
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='CloudName' style={{fontSize:'1rem'}}>Cloud Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='CloudName'
            value={nameCloud}
            onChange={(e) => setnameCloud(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OwnerName' style={{fontSize:'1rem'}}>Owner Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OwnerName'
            value={ownerName}
            onChange={(e) => setownerName(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Address1' style={{fontSize:'1rem'}}>Address 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Address1'
            value={address1}
            onChange={(e) => setaddress1(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Address2' style={{fontSize:'1rem'}}>Address 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Address2'
            value={address2}
            onChange={(e) => setaddress2(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Address3' style={{fontSize:'1rem'}}>Address 3</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Address3'
            value={address3}
            onChange={(e) => setaddress3(e.target.value)} />
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
          <Input type='select' name='select' 
          value={customercountry}
          id='Country' onChange={changeSelectOptionHandlerCountry}>
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
            <Input type='select' name='select'
            value={customerstate}
            id='State' onChange={changeSelectOptionHandlerState}>
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
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='CountryCode'
            value={ownerCountryCode}
            onChange={(e) => setownerCountryCode(e.target.value)} />
          </InputGroup>
        </FormGroup>
      
        <FormGroup>
          <Label for='OwnerCity' style={{fontSize:'1rem'}}>Owner City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OwnerCity'
            value={ownerCity}
            onChange={(e) => setownerCity(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OwnerPincode' style={{fontSize:'1rem'}}>Owner Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OwnerPincode'
            value={ownerCityPincode}
            onChange={(e) => setownerCityPincode(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='PrimaryPhone' style={{fontSize:'1rem'}}>Primary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryPhone'
            value={primaryPhone}
            onChange={(e) => setprimaryPhone(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryPhone' style={{fontSize:'1rem'}}>Secondary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryPhone'
            value={secondaryPhone}
            onChange={(e) => setsecondaryPhone(e.target.value)} />
          </InputGroup>
        </FormGroup>
             

        <FormGroup>
          <Label for='PrimaryEmail' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryEmail'
            value={primaryEmail}
            onChange={(e) => setprimaryEmail(e.target.value)} />
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='SecondaryEmail' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryEmail'
            value={secondaryEmail}
            onChange={(e) => setsecondaryEmail(e.target.value)} />
          </InputGroup>
        </FormGroup>
       
        <Button className='mr-1' color='primary' 
        onClick={ () => {
          handlePost()
          handleUpdateModal() 
          
        }}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleUpdateModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default UpdateModal
