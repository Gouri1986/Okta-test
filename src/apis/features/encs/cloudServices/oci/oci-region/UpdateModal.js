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
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [regionid, setregionid] = useState("")
  const [city, setcity] = useState("")
  const [pincode, setpincode] = useState()
  const [countryCode, setcountryCode] = useState()
  const [location, setlocation] = useState("")
  const [address1, setaddress1] = useState("")
  const [address2, setaddress2] = useState("")
  const [address3, setaddress3] = useState("")
  const [primaryEmail, setprimaryEmail] = useState("")
  const [primaryPhone, setprimaryPhone] = useState()
  const [secondryEmail, setsecondryEmail] = useState("")
  const [secondryPhone, setsecondryPhone] = useState()
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

  //-------------------------Update Method---------------------------------------------
  // useEffect(() => {
  //   setIscOsCategoryName(value.iscOsTechName)
  //  })
  useEffect(() => {
    setcloudName(value.cloudType)
    setcity(value.regionCity)
    setpincode(value.regionCityPincode)
    setcloudId(value.regionCloudId)
    setCustomerCountry(value.regionCountry)
    setcountryCode(value.regionCountryCode)
    setlocation(value.regionLocation)
    setaddress1(value.regionLocationAddress1)
    setaddress2(value.regionLocationAddress2)
    setaddress3(value.regionLocationAddress3)
    setprimaryEmail(value.regionPrimaryEmail)
    setprimaryPhone(value.regionPrimaryPhone)
    setsecondryEmail(value.regionSecondaryEmail)
    setsecondryPhone(value.regionSecondaryPhone)
    setCustomerState(value.regionState)
    setregionid(value.regionId)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-oci-region-details`, {
      regionId:regionid,
      cloudName : cloudname,
      regionCity : city,
      regionCityPincode : pincode,
      regionCloudId : cloudId,
      regionCountry : customercountry,
      regionCountryCode : countryCode,
      regionLocationAddress1 : address1,
      regionLocationAddress2 : address2,
      regionLocationAddress3 : address3,
      regionLocation : location,
      regionPrimaryEmail : primaryEmail,
      regionPrimaryPhone : primaryPhone,
      regionSecondaryEmail : secondryEmail,
      regionSecondaryPhone : secondryPhone,
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

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update OCI Region Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='RegionID' style={{fontSize:'1rem'}}>Region</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='RegionID' name='RegionID' 
            value={regionid}
            onChange={(e) => setregionid(e.target.value)} />
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
          <Input type='select' name='select' id='Regioncloud'
          value={cloudname}
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
          <Label for='Regionlocation' style={{fontSize:'1rem'}}>Region Location</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Regioinlocation'
            value={location}
            onChange={(e) => setlocation(e.target.value)} />
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
          <Label for='CountryCode' style={{fontSize:'1rem'}}>Country Code</Label>
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
          <Label for='City' style={{fontSize:'1rem'}}>Region City</Label>
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
          <Label for='Pincode' style={{fontSize:'1rem'}}>Region Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Pincode'
            value={pincode}
            onChange={(e) => setpincode(e.target.value)} />
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
          <Label for='SecondaryPhone' style={{fontSize:'1rem'}}>Secondry Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryPhone'
            value={secondryPhone}
            onChange={(e) => setsecondryPhone(e.target.value)} />
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
          <Label for='SecondaryEmail' style={{fontSize:'1rem'}}>Secondry Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryEmail'
            value={secondryEmail}
            onChange={(e) => setsecondryEmail(e.target.value)} />
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
