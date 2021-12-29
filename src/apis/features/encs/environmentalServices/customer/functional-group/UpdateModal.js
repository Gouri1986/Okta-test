// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [data, setData] = useState([])
  const [businessgroupname, setbusinessGroupName] = useState("")
  const [businessgroupid, setbusinessgroupId] = useState("")
  const [fgcontactdeptname, setfgContactDeptName] = useState("")
  const [fgcontactemail1, setfgContactEmail1] = useState("")
  const [fgcontactemail2, setfgContactEmail2] = useState("")
  const [fgcontactfristname, setfgContactFristName] = useState("")
  const [fgcontactlastname, setfgContactLastName] = useState("")
  const [fgcontactphone1, setfgContactPhone1] = useState()
  const [fgcontactphone1isd, setfgContactPhone1Isd] = useState()
  const [fgcontactphone2, setfgContactPhone2] = useState()
  const [fgcontactphone2isd, setfgContactPhone2Isd] = useState()
  const [fgdescription, setfgDescription] = useState("")
  const [fgid, setfgId] = useState("")
  const [fglevel, setfgLevel] = useState("")
  const [fgname, setfgName] = useState("")
  const [toplevelfgid, settopLevelFgId] = useState()
  const [toplevelfglevel, settopLevelFgLevel] = useState("")
  const [pk, setPk] = useState('') 
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [dummy, setDummy] = useState([])

  //-Fg level
   const changeSelectOptionHandlefgLevel = (event) => {
     setfgLevel(event.target.value)
   }
   console.log(fglevel)
  // --
  //-Dropdown selection handler-
  const [customerbusinessname, setcustomerBusinessName] = useState('')
  
   // Variale to store the index value of selected option
 
   const index = data.findIndex(obj => obj.businessGroupName === customerbusinessname)
   console.log("Index value = ", index)// Printing the index value of selected option

   useEffect(() => {
     try { //This try is solve the Type undifined error
       setDummy(data[index].businessGroupId)
       //console.log("Direct = ", data[index].customerId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log(dummy)

   const changeSelectOptionHandlecustomerId = (event) => {
     setcustomerBusinessName(event.target.value)
     }
  
  //-Update Method
    console.log("pk = ", pk)
  useEffect(() => {
    setPk(value.fgId)
    setfgContactDeptName(value.fgContactDeptName)
    setfgContactEmail1(value.fgContactEmail1)
    setfgContactEmail2(value.fgContactEmail2)
    setfgContactFristName(value.fgContactFristName)
    setfgContactLastName(value.fgContactLastName)
    setfgContactPhone1(value.fgContactPhone1)
    setfgContactPhone1Isd(value.fgContactPhone1Isd)
    setfgContactPhone2(value.fgContactPhone2)
    setfgContactPhone2Isd(value.fgContactPhone2Isd)
    setfgDescription(value.fgDescription)
    setfgLevel(value.fgLevel)
    setfgName(value.fgName)
    settopLevelFgId(value.topLevelFgId)
    settopLevelFgLevel(value.topLevelFgLevel)
    setcustomerBusinessName(value.businessGroupName)
 }, [value])

  const handlePost = (evt) => {
   axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-functional-group-details`, {
      businessGroupName : customerbusinessname,
      businessGroupId : dummy,
      fgContactDeptName : fgcontactdeptname,
      fgContactEmail1 : fgcontactemail1,
      fgContactEmail2 : fgcontactemail2,
      fgContactFristName : fgcontactfristname,
      fgContactLastName : fgcontactlastname,
      fgContactPhone1 : fgcontactphone1,
      fgContactPhone1Isd : fgcontactphone1isd,
      fgContactPhone2 : fgcontactphone2,
      fgContactPhone2Isd : fgcontactphone2isd,
      fgDescription : fgdescription,
      fgLevel : fglevel,
      fgName : fgname,
      topLevelFgId : toplevelfgid,
      topLevelFgLevel : toplevelfglevel,
      fgId : pk
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
        console.log("Response =", response)
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
 //--Fetching Dropdown API 1

 useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-businessGroupNames`
    
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
//
return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update Functional Group Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='name' style={{fontSize:'1rem'}}>Functional Group</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='name' 
             name='name' 
             placeholder=''
             value={fgname} 
             onChange={(e) => setfgName(e.target.value)}/>
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='fglevel' style={{fontSize:'1rem'}}>Functional Group Level</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='cid'
            onChange={changeSelectOptionHandlefgLevel}
           >
           <option value='Root 1'>Root 1</option>
           <option value='Root 2'>Root 2</option>
           <option value='Root 3'>Root 3</option>
           <option value='Root 4'>Root 4</option>
        </Input>
        </InputGroup>
        </FormGroup>
           
        <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Business Group Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='cid'
           value={customerbusinessname}
            onChange={changeSelectOptionHandlecustomerId}
           >
           <option> Choose Customer Business </option>
            {data.map(item => (
              <option
                key={data.businessGroupName}
                value={data.businessGroupName}
                // onClick={dropAction}
              >
                {item.businessGroupName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>
        
      <FormGroup>
          <Label for='Description' style={{fontSize:'1rem'}}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Description' 
             name='Description' 
              placeholder=''
              value={fgdescription} 
              onChange={(e) => setfgDescription(e.target.value)}/>
          </InputGroup>
        </FormGroup>

      <FormGroup>
          <Label for='TopLevelID' style={{fontSize:'1rem'}}>Top Level ID</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='TopLevelID' 
             name='TopLevelID' 
              placeholder=''
              value={toplevelfgid} 
              onChange={(e) => settopLevelFgId(e.target.value)}/>
          </InputGroup>
        </FormGroup>

      <FormGroup>
          <Label for='TopLevelFGLevel' style={{fontSize:'1rem'}}>Top Level FG Level</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='TopLevelFGLevel' 
             name='TopLevelFGLevel' 
              placeholder=''
              value={toplevelfglevel} 
              onChange={(e) => settopLevelFgLevel(e.target.value)}/>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Department' style={{fontSize:'1rem'}}>Department Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Department' 
             name='Department' 
             value={fgcontactdeptname}
              placeholder='' 
              onChange={(e) => setfgContactFristName(e.target.value)}/>
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='first_name' style={{fontSize:'1rem'}}>First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='first_name' 
             name='first_name' 
              placeholder=''
              value={fgcontactfristname} 
              onChange={(e) => setfgContactFristName(e.target.value)}/>
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='last_name' style={{fontSize:'1rem'}}>Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='last_name' 
             name='last_name' 
              placeholder=''
              value={fgcontactlastname} 
              onChange={(e) => setfgContactLastName(e.target.value)}/>
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='phone1' style={{fontSize:'1rem'}}>Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='phone1' 
             name='phone1'
             value={fgcontactphone1} 
              placeholder='' 
              onChange={(e) => setfgContactPhone1(e.target.value)}/>
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='phone2' style={{fontSize:'1rem'}}>Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='phone2' 
             name='phone2' 
             value={fgcontactphone2} 
             onChange={(e) => setfgContactPhone2(e.target.value)}/>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='phone1isd' style={{fontSize:'1rem'}}>Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='phone1isd' 
             name='phone1isd' 
              placeholder=''
              value={fgcontactphone1isd} 
              onChange={(e) => setfgContactPhone1Isd(e.target.value)}/>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='phone2isd' style={{fontSize:'1rem'}}>Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='phone2isd' 
             name='phone2isd' 
              placeholder=''
              value={fgcontactphone2isd} 
              onChange={(e) => setfgContactPhone2Isd(e.target.value)}/>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='email1' style={{fontSize:'1rem'}}>Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='email1' 
             name='email1' 
              placeholder=''
              value={fgcontactemail1} 
              onChange={(e) => setfgContactEmail1(e.target.value)}/>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='email2' style={{fontSize:'1rem'}}>Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='email2' 
             name='email2' 
              placeholder=''
              value={fgcontactemail2} 
              onChange={(e) => setfgContactEmail2(e.target.value)}/>
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
