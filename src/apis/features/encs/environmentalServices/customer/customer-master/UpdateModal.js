// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { Database, X, Cpu, Layers, Command } from 'react-feather'
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
  CustomInput
} from 'reactstrap'

import axios from 'axios'

import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
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
  const [customercityPincode, setCustomerCityPincode] = useState("")
  const [countrycode, setCountryCode] = useState("")
  const [customerprimaryPhone, setCustomerPrimaryPhone] = useState("")
  const [customersecondaryPhone, setCustomerSecondaryPhone] = useState("")
  const [customerprimaryEmailDomain, setCustomerPrimaryEmailDomain] = useState("")
  const [customersecondaryEmailDomain, setCustomerSecondaryEmailDomain] = useState("")
  const [customerurl, setCustomerUrl] = useState("")
  const [customerlogo, setCustomerLogo] = useState("")

  //pk
  const [pk, setPk] = useState("")
    
 // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [data, setData] = useState([])

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
   console.log(customercountry)
  //-Dropdown selection handler End-
  
  //-Dropdown selection handler-
  const [customerstate, setCustomerState] = useState("")
   const changeSelectOptionHandlerState = (event) => {
    setCustomerState(event.target.value)
   }
 console.log(customerstate)
  //-Dropdown selection handler End-

  useEffect(() => {
    setCustomerBusinessName(value.customerBusinessName)
   })
  useEffect(() => {
    setPk(value.customerId)
    console.log("Pk=", pk)
    setCustomerBusinessType(value.customerBusinessType)
    setCustomerProfile(value.customerProfile)
    setCustomerProfileFile(value.customerProfileFile)
    setMimeTypeColumn(value.mimeTypeColumn)
    setFilenameColumn(value.filenameColumn)
    setCustomerLocationAddress1(value.customerLocationAddress1)
    setCustomerLocationAddress2(value.customerLocationAddress2)
    setCustomerLocationAddress2(value.customerLocationAddress3)
    setCustomerCountry(value.customerCountry)
    setCustomerState(value.customerState)
    setCustomerLocationCity(value.customerLocationCity)
    setCustomerCityPincode(value.customerCityPincode)
    setCountryCode(value.countryCode)
    setCustomerPrimaryPhone(value.customerPrimaryPhone)
    setCustomerSecondaryPhone(value.customerSecondaryPhone)
    setCustomerPrimaryEmailDomain(value.customerPrimaryEmailDomain)
    setCustomerSecondaryEmailDomain(value.setCustomerSecondaryEmailDomain)
    setCustomerUrl(value.customerUrl)
    setCustomerLogo(value.customerLogo)
 }, [value])


  //-Update Method

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-customer-master`, {
      customerId: pk,
      countryCode: countrycode,
      customerBusinessName: customerbusinessName,
      customerBusinessType: customerbusinessType,
      customerCityPincode: customercityPincode,
      customerCountry: customercountry,
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
        console.log(response)
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

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update Customer Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='businessName' style={{fontSize:'1rem'}}>Customer Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={customerbusinessName}
             placeholder='' onChange={(e) => setCustomerBusinessName(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='businessType' style={{fontSize:'1rem'}}>Business Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Command size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='businessType' name='businessType'
            value={customerbusinessType}
            onChange={(e) => setCustomerBusinessType(e.target.value)}/>
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
          <Label for='profilfile' style={{fontSize:'1rem'}}>Profile File</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={customerprofileFile} 
             placeholder='' onChange={(e) => setCustomerProfileFile(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Mimetype' style={{fontSize:'1rem'}}>MIME Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={mimeTypecolumn}
             onChange={(e) => setMimeTypeColumn(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Filename' style={{fontSize:'1rem'}}>File Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={filenamecolumn} 
             placeholder='' onChange={(e) => setFilenameColumn(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='addr1' style={{fontSize:'1rem'}}>Address 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={customerlocationAddress1} 
            placeholder='' onChange={(e) => setCustomerLocationAddress1(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='addr2' style={{fontSize:'1rem'}}>Address 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName' 
            value={customerlocationAddress2} 
            onChange={(e) => setCustomerLocationAddress2(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='addr3' style={{fontSize:'1rem'}}>Address 3</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName' 
            value={customerlocationAddress3} 
            onChange={(e) => setCustomerLocationAddress3(e.target.value)} />
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
          <Input type='select' name='select' id='select-country_name'
          value={customercountry}
          onChange={changeSelectOptionHandlerCountry}>
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
            <Input type='select' name='select' id='select-State'
            value={customerstate}
            onChange={changeSelectOptionHandlerState}>
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
          <Label for='city' style={{fontSize:'1rem'}}>City</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={customerlocationCity} 
             onChange={(e) => setCustomerLocationCity(e.target.value)} />
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
            <Input id='businessName' name='businessName'
            value={customercityPincode} 
             onChange={(e) => setCustomerCityPincode(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Code' style={{fontSize:'1rem'}}>Country Code</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName' 
            value={countrycode}
             onChange={(e) => setCountryCode(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Primaryph' style={{fontSize:'1rem'}}>Primary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'  
            value={customerprimaryPhone}
            onChange={(e) => setCustomerPrimaryPhone(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Secondaryph' style={{fontSize:'1rem'}}>Secondary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={customersecondaryPhone}  
            onChange={(e) => setCustomerSecondaryPhone(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Primaryemail' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'  
            value={customerprimaryEmailDomain}
            onChange={(e) => setCustomerPrimaryEmailDomain(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Secondaryemail' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={customersecondaryEmailDomain}  
            onChange={(e) => setCustomerSecondaryEmailDomain(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='url' style={{fontSize:'1rem'}}>URL</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} /> 
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName' 
            value={customerurl}
            onChange={(e) => setCustomerUrl(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='logo' style={{fontSize:'1rem'}}>Logo</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <CustomInput type='file' id='exampleCustomFileBrowser' name='customFile' />

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
