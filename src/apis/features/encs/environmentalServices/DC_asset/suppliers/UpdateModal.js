// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Database } from 'react-feather'
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

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
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
  const [nameSupplier, setnameSupplier] = useState("")
  const [pincode, setpincode] = useState("")
  const [countryCode, setcountryCode] = useState("")
  const [address1, setaddress1] = useState("")
  const [address2, setaddress2] = useState("")
  const [address3, setaddress3] = useState("")
  const [locationCity, setlocationCity] = useState("")
  const [primaryEmail, setprimaryEmail] = useState("")
  const [primaryPhone, setprimaryPhone] = useState(0)
  const [secondaryEmail, setsecondaryEmail] = useState("")
  const [secondaryPhone, setsecondaryPhone] = useState(0)
  const [customercountry, setCustomerCountry] = useState("")
  const [customerbusinessname, setCustomerBusinessNames] = useState('')
  const [customerid, setCustomerId] = useState('')
  const [pk, setPk] = useState('')

    //-Dropdown selection handler-
    
    const index = data.findIndex(obj => obj.customerBusinessName === customerbusinessname)
    console.log("Index value Business= ", index)

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setCustomerId(data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log('customerid = ', customerid)

     const changeSelectOptionHandlerCustomerBusinessName = (event) => {
      setCustomerBusinessNames(event.target.value)
     }
    //-Dropdown selection handler End-
  
    //-Dropdown selection handler-

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
  //-Update Method
  useEffect(() => {
    setPk(value.supplierId)
   })
  useEffect(() => {
    setnameSupplier(value.supplierName)
    setpincode(value.supplierCityPincode)
    setcountryCode(value.supplierCountryCode)
    setaddress1(value.supplierLocationAddress1)
    setaddress2(value.supplierLocationAddress2)
    setaddress3(value.supplierLocationAddress3)
    setlocationCity(value.supplierLocationCity)
    setprimaryEmail(value.supplierPrimaryEmail)
    setprimaryPhone(value.supplierPrimaryPhone)
    setsecondaryEmail(value.supplierSecondaryEmail)
    setsecondaryPhone(value.supplierSecondaryPhone)
    setCustomerState(value.supplierState)
    setCustomerCountry(value.supplierCountry)
    setCustomerId(value.customerId)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-dc-asset-suppliers`, {
          supplierName : nameSupplier,
          customerId : customerid,
          supplierCityPincode : pincode,
          supplierCountry : customercountry,
          supplierCountryCode : countryCode,
          supplierLocationAddress1 : address1,
          supplierLocationAddress2 : address2,
          supplierLocationAddress3 : address3,
          supplierLocationCity : locationCity,
          supplierPrimaryEmail : primaryEmail,
          supplierPrimaryPhone : primaryPhone,
          supplierSecondaryEmail : secondaryEmail,
          supplierSecondaryPhone : secondaryPhone,
          supplierState : customerstate,
          supplierId : pk 
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
//-Update Method End
  //--Fetching Dropdown Api 1
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from list!")
      setData(response.data.data)
      console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
   })
  }, []) 
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
        <h5 className='modal-title'style={{color:'black'}}>Update DC Asset Supplier</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
        <Label for='Customer' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Customer' onChange={changeSelectOptionHandlerCustomerBusinessName}>
             <option disabled hidden selected> Choose Customer </option>
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
          <Label for='SupplierName' style={{fontSize:'1rem'}}>Supplier Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SupplierName' name='SupplierName'  
            value={nameSupplier}
            onChange={(e) => setnameSupplier(e.target.value)} />
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
            <Input id='address1' name='address1' 
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
             <option disabled hidden selected>- Choose country -</option>
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
             <option disabled hidden selected>- Choose state -</option>
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
          <Label for='city' style={{fontSize:'1rem'}}>City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='city' name='city'  
            value={locationCity}
            onChange={(e) => setlocationCity(e.target.value)} />
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='pincode' style={{fontSize:'1rem'}}>Pincode</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='pincode' name='pincode'
            value={pincode}
            onChange={(e) => setpincode(e.target.value)}/>
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
        <FormGroup>
          <Label for='email' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='email' name='email' 
            value={primaryEmail}
            onChange={(e) => setprimaryEmail(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='email1' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='email1' name='email1'  
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
