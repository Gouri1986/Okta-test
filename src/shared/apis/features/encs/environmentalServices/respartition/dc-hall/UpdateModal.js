// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {Database, X, Cpu, Layers, Command, Code } from 'react-feather'
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
  const [city, setcity] = useState("")
  const [pincode, setpincode] = useState("")
  const [countryCode, setcountryCode] = useState("")
  const [address1, setaddress1] = useState("")
  const [address2, setaddress2] = useState("")
  const [address3, setaddress3] = useState("")
  const [primaryEmail, setprimaryEmail] = useState("")
  const [primaryPhone, setprimaryPhone] = useState("")
  const [secondaryEmail, setsecondaryEmail] = useState("")
  const [secondaryPhone, setsecondaryPhone] = useState("")
  const [state, setstate] = useState("")
  const [dchallname, setDchallName] = useState("")
  const [pk, setPk] = useState("")

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
  console.log('Country = ', country)
  console.log('state = ', state)
 //-Dropdown selection handler End-
  //-Update Method
  useEffect(() => {
   })
  useEffect(() => {
    setPk(value.dcHallId)
    setDchallName(value.dcHallName)
    setDcName(value.dcName)
    setcity(value.dcHallCity)
    setpincode(value.dcHallCityPincode)
    setcountryCode(value.dcHallCountryCode)
    setaddress1(value.dcHallLocationAddress1)
    setaddress2(value.dcHallLocationAddress2)
    setaddress3(value.dcHallLocationAddress3)
    setprimaryEmail(value.dcHallPrimaryEmail)
    setprimaryPhone(value.dcHallPrimaryPhone)
    setsecondaryEmail(value.dcHallSecondaryEmail)
    setsecondaryPhone(value.dcHallSecondaryPhone)
    setcountry(value.dcHallCountry)
    setstate(value.dcHallState)
 }, [value])


  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-dc-hall`, {
          dcHallCity : city,
          dcHallCityPincode : pincode,
          dcHallCountry : country,
          dcHallCountryCode : countryCode,
          dcHallId : pk,
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
        // setisSucess(true)
        if (response.data.message === "You are trying to insert duplicate records") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else if (response.data.message === "An unexpected internal application error has occurred. Please Contact System Administrator") {
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
//-Update Method End
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

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update DC Hall</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='dchallname' style={{fontSize:'1rem'}}>DC Hall Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='dchallname' 
            name='dchallname' 
             value={dchallname}        
             onChange={(e) => setDchallName(e.target.value)} />
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
          <Input type='select' name='select' id='dcname'
          value={dcname}
          onChange={changeSelectOptionHandlerDcHallName}>
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
          <Label for='address1' style={{fontSize:'1rem'}}>Address 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='address1' 
            name='address1' 
            value={address1}
            onChange={(e) => setaddress1(e.target.value)} />
            </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='address2' style={{fontSize:'1rem'}}>Address 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='address2' name='address2' 
            value={address2}
            onChange={(e) => setaddress2(e.target.value)} />
            </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='address3' style={{fontSize:'1rem'}}>Address 3</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='address3' name='address3'
            value={address3}
            onChange={(e) => setaddress3(e.target.value)} />
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
          <Input type='select' name='select' id='country'
          value={country}
          onChange={changeSelectOptionHandlerCountry}>
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
          <Input type='select' name='select' id='state' 
          value={state}
          onChange={changeSelectOptionHandlerState}>
          <option  disabled hidden selected> Choose state </option>
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
          <Label for='city' style={{fontSize:'1rem'}}>City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='city' name='city' 
            value={city}
            onChange={(e) => setcity(e.target.value)} />
            </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='pincode' style={{fontSize:'1rem'}}>Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='pincode' name='pincode'
            value={pincode}
            onChange={(e) => setpincode(e.target.value)} />
            </InputGroup>
        </FormGroup>
       
        <FormGroup>
          <Label for='countrycode' style={{fontSize:'1rem'}}>Country Code</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='countrycode' name='countrycode' 
            value={countryCode}
            onChange={(e) => setcountryCode(e.target.value)} />
            </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='email1' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='email1' name='email1'
            value={primaryEmail}
            onChange={(e) => setprimaryEmail(e.target.value)} />
            </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='primaryphone' style={{fontSize:'1rem'}}>Primary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='primaryphone' name='primaryphone' 
            value={primaryPhone}
            onChange={(e) => setprimaryPhone(e.target.value)} />
            </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='email2' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='email2' name='email2'
            value={secondaryEmail}
            onChange={(e) => setsecondaryEmail(e.target.value)} />
            </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='secondaryphone' style={{fontSize:'1rem'}}>Secondary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='secondaryphone' name='secondaryphone'
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
