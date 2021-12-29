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
  Label
} from 'reactstrap'

import axios from 'axios'

import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [datatwo, setDataTwo] = useState([])
  const [data, setData] = useState([])
  const [datathree, setDataThree] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [city, setcity] = useState("")
  const [pincode, setpincode] = useState("")
  const [customerId, setcustomerId] = useState("")
  const [id, setid] = useState("")
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
  const [pk, setPk] = useState("")

 
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
  
  //-Update Method
  useEffect(() => {
   })
  useEffect(() => {
    setCountry(value.dcCountry)
    setState(value.dcState)
    setCustomerBusinessName(value.customerBusinessName)
    setcity(value.dcCity)
    setpincode(value.dcCityPincode)
    setlocationAddress1(value.dcLocationAddress1)
    setlocationAddress2(value.dcLocationAddress2)
    setlocationAddress3(value.dcLocationAddress3)
    setprimaryEmail(value.dcPrimaryEmail)
    setprimaryPhone(value.dcPrimaryPhone)
    setproviderId(value.dcProviderId)
    setproviderName(value.dcProviderName)
    setproviderType(value.dcProviderType)
    setsecondaryEmail(value.dcSecondaryEmail)
    setsecondaryPhone(value.dcSecondaryPhone)
    setState(value.customerBusinessName)
    setPk(value.dcId)
    setnameDc(value.dcName)
 }, [value])


  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-dc-master`, {
      dcId:pk,
      customerBusinessName : customerbusinessname,
      dcCity : city,
      dcCityPincode : pincode,
      dcCountry : country,
      dcCustomerId : customerbusinessid,
      dcLocationAddress1 : locationaddress1,
      dcLocationAddress2 :locationaddress2,
      dcLocationAddress3 : locationaddress3,
      dcName : namedc,
      dcPrimaryEmail : primaryemail,
      dcPrimaryPhone : primaryphone,
      dcProviderId : providerId,
      dcProviderName : providerName,
      dcProviderType : providertype,
      dcSecondaryEmail :secondaryemail,
      dcSecondaryPhone : secondaryphone,
      dcState :state 
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
        } else {
          const Notification_msg = "Update!"
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
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-dcProviderNames`
      
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
return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update DC Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      
      <FormGroup>
          <Label for='dcname' style={{fontSize:'1rem'}}>Dc Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='dcname' name='dcname'
            value={namedc}
            onChange={(e) => setnameDc(e.target.value)} />
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
          <Input type='select' name='select' id='businessname' 
          value={customerbusinessname}
          onChange={changeSelectOptionHandlerCustomerBusinessName}>
            <option> Choose Business Name </option>
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
          <Label for='providertype' style={{fontSize:'1rem'}}>Provider Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='providertype' name='providertype'
             value={providertype} 
             onChange={(e) => setproviderType(e.target.value)} />
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
          <Input type='select' name='select' id='Provider'
          value={providerName}
           onChange={changeSelectOptionHandlerCustomerBusinessName}>
            <option  disabled hidden selected> Choose Provider </option>
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
          <Label for='address1' style={{fontSize:'1rem'}}>Address 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='address1' name='address1' 
            placeholder='' 
            value={locationaddress1}
            onChange={(e) => setlocationAddress1(e.target.value)} />
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
            placeholder=''
            value={locationaddress2}
            onChange={(e) => setlocationAddress2(e.target.value)} />
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
            placeholder='' 
            value={locationaddress3}
            onChange={(e) => setlocationAddress3(e.target.value)} />
            
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
          value={country} 
          onChange={changeSelectOptionHandlerCountry}>
          <option disabled hidden selected> Choose Country -</option>
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
          value={state} 
          onChange={changeSelectOptionHandlerState}>
            <option disabled hidden selected> Choose State -</option>
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
            placeholder='' 
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
            <Input id='pincode' 
            name='pincode'
            value={pincode} 
             placeholder='' onChange={(e) => setpincode(e.target.value)} />
            
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='primaryEmail' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='primaryEmail' name='primaryEmail' 
            value={primaryemail}
            placeholder='' onChange={(e) => setprimaryEmail(e.target.value)} />
            
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='primaryPhone' style={{fontSize:'1rem'}}>Primary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='primaryPhone' name='primaryPhone'
            value={primaryphone}
            placeholder='' onChange={(e) => setprimaryPhone(e.target.value)} />
            
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='secondaryEmail' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='secondaryEmail' name='secondaryEmail'
            value={secondaryemail}
            placeholder='' onChange={(e) => setsecondaryEmail(e.target.value)} />
            
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='secondaryPhone' style={{fontSize:'1rem'}}>Secondary Phone</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='secondaryPhone' name='secondaryPhone' 
            value={secondaryphone}
            placeholder='' onChange={(e) => setsecondaryPhone(e.target.value)} />
            
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
