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
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

   // dummy Token 
   const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [idAd, setidAd] = useState("")
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

  const [adregion, setAdRegion] = useState('')
  const changeSelectAdRegion = (event) => {
    setAdRegion(event.target.value)
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
  //-------------------------Update Method---------------------------------------------
  useEffect(() => {
    setidAd(value.adId)
   })
  useEffect(() => {
    setcity(value.adCity)
    setpincode(value.adCityPincode)
    setCustomerCountry(value.adCountry)
    setcountryCode(value.adCountryCode)
    setaddress1(value.adLocationAddress1)
    setaddress2(value.adLocationAddress2)
    setaddress3(value.adLocationAddress3)
    setprimaryEmail(value.adPrimaryEmail)
    setprimaryPhone(value.adPrimaryPhone)
    setsecondaryEmail(value.adSecondaryEmail)
    setsecondaryPhone(value.adSecondaryPhone)
    setAdRegion(value.adRegionId)
    setCustomerState(value.adState)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-oci-ad-details`, {
      adId : idAd,
      adCity : city,
      adCityPincode : pincode,
      adCountry : customercountry,
      adCountryCode : countryCode,
      adLocationAddress1 : address1,
      adLocationAddress2 : address2,
      adLocationAddress3 : address3,
      adPrimaryEmail : primaryEmail,
      adPrimaryPhone : primaryPhone,
      adSecondaryEmail : secondaryEmail,
      adSecondaryPhone : secondaryPhone,
      adRegionId : adregion,
      adState : customerstate
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
 //-----------------------------------Fetching Dropdown Api 1---------------------------------------------------------------
  
 useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/get-countries`
    
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

//--Fetching Dropdown
useEffect(() => { 
// if (isLoaded === false) {
  axios.get(`${process.env.REACT_APP_URL}/api/v1/list-Regions`
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

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update OCI AD Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='adid' style={{fontSize:'1rem'}}>Ad Id</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Command size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='adid'
            value={idAd}
            onChange={(e) => setidAd(e.target.value)}/>
          </InputGroup>
        </FormGroup>
      <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>AD Region</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='ADRegion'
          value={adregion}
          onChange={changeSelectAdRegion}>
            <option selected disabled hidden>Ad Region</option>
            {data.map(item => (
              <option
                key={datatwo.regionId}
                value={datatwo.regionId}
                
              >
                {item.regionId}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

      <FormGroup>
          <Label for='isctechcategoryname' style={{fontSize:'1rem'}}>AD City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='City'
            value={city}             
             onChange={(e) => {
              setcity(e.target.value)
             }} />
          </InputGroup>
        </FormGroup>
      
        <FormGroup>
          <Label for='isctechcategorytags' style={{fontSize:'1rem'}}>Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='pincode'
            value={pincode}
            onChange={(e) => setpincode(e.target.value)} />
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
          <Input type='select' name='select' id='Country'
          value={customercountry}
          onChange={changeSelectOptionHandlerCountry}>
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
            <Input type='select' name='select' id='State' 
            value={customerstate}
            onChange={changeSelectOptionHandlerState}>
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
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Country Code</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='CountryCode'
            value={countryCode}
            onChange={(e) => setcountryCode(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Address 1</Label>
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
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Address 2</Label>
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
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Address 3</Label>
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
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Primary Email</Label>
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
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Primary Phone</Label>
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
        <FormGroup>
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Secondary Phone</Label>
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
