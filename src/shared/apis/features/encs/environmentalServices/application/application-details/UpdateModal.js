// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Database, Mail, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [applicationcontactdeptname, setapplicationContactDeptName] = useState("")
  const [applicationcontactemail1, setapplicationContactEmail1] = useState("")
  const [applicationcontactemail2, setapplicationContactEmail2] = useState("")
  const [applicationcontactfirstname, setapplicationContactFirstName] = useState("")
  const [applicationcontactlastname, setapplicationContactLastName] = useState("")
  const [applicationcontactphone1, setapplicationContactPhone1] = useState("")
  const [applicationcontactphone1isd, setapplicationContactPhone1ISD] = useState("")
  const [applicationcontactphone2, setapplicationContactPhone2] = useState("")
  const [applicationcontactphone2isd, setapplicationContactPhone2ISD] = useState("")
  const [applicationdescription, setapplicationDescription] = useState("")
  const [applicationid, setapplicationId] = useState("")
  const [applicationname, setapplicationName] = useState("")
  const [dummy, setDummy] = useState([])
  const [fgname, setFgName] = useState('')
  const [fgid, setfgid] = useState('')

  const index2 = data.findIndex(obj => obj.fgId === fgid)
  console.log("Index value fgId = ", index2)
  useEffect(() => {
    try { //This try is solve the Type undifined error
      setFgName(data[index2].fgName)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  const index = data.findIndex(obj => obj.fgName === fgname)
  console.log("Index value = ", index)// Printing the index value of selected option

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setDummy(data[index].fgId)
        //console.log("Direct = ", data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log(dummy)

  //-Fg Id Dropdown selection handler-
 
  const changeSelectOptionHandlerFgId = (event) => {
    setFgName(event.target.value)
  }
  //-Update Method
  useEffect(() => {

   })
  useEffect(() => {
    setfgid(value.fgId)
    setapplicationContactDeptName(value.applicationContactDeptName)
    setapplicationContactEmail1(value.applicationContactEmail1)
    setapplicationContactEmail2(value.applicationContactEmail2)
    setapplicationContactFirstName(value.applicationContactFirstName)
    setapplicationContactLastName(value.applicationContactLastName)
    setapplicationContactPhone1(value.applicationContactPhone1)
    setapplicationContactPhone1ISD(value.applicationContactPhone1ISD)
    setapplicationContactPhone2(value.applicationContactPhone2)
    setapplicationContactPhone2ISD(value.applicationContactPhone2ISD)
    setapplicationDescription(value.applicationDescription)
    setapplicationId(value.applicationId)
    setapplicationName(value.applicationName)
    setFgName(value.fgName)
 }, [value])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )


  const handlePost = (evt) => {
    
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-application-details`, {
      applicationContactDeptName:applicationcontactdeptname, 
      applicationContactEmail1:applicationcontactemail1,
      applicationContactEmail2:applicationcontactemail2,
      applicationContactFirstName:applicationcontactfirstname,
      applicationContactLastName:applicationcontactlastname,
      applicationContactPhone1:applicationcontactphone1,
      applicationContactPhone1ISD:applicationcontactphone1isd,
      applicationContactPhone2:applicationcontactphone2,
      applicationContactPhone2ISD:applicationcontactphone2isd,
      applicationDescription:applicationdescription,
      applicationId:applicationid,
      applicationName:applicationname,
      fgId:dummy      },
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
//-Update Method End
//--Fetching Dropdown
 useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-fgdetails`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching!")
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
        <h5 className='modal-title'style={{color:'black'}}>Application Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
    
      <FormGroup>
          <Label for='name' style={{fontSize:'1rem'}}>Application Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='name' 
            name='name'
            value={applicationname} 
            onChange={(e) => setapplicationName(e.target.value)} />
          </InputGroup>
        </FormGroup>
              
        <FormGroup>
        <Label for='fgid' style={{fontSize:'1rem'}}>Functional Group Id</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='fgid' id='fgid-basic' 
          value={fgname}
          onChange={changeSelectOptionHandlerFgId}>
            <option> Choose functional group id </option>
            {data.map(item => (
              <option
                key={data.fgName}
                value={data.fgName}
                >
                {item.fgName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='description' style={{fontSize:'1rem'}}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='description' 
            name='description'
            value={applicationdescription} 
            onChange={(e) => setapplicationDescription(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='first_name' style={{fontSize:'1rem'}}>First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='first_name' 
            name='first_name'
            value={applicationcontactfirstname}
            onChange={(e) => setapplicationContactFirstName(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='last_name' style={{fontSize:'1rem'}}>Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='last_name' 
            name='last_name'
            value={applicationcontactlastname} 
            onChange={(e) => setapplicationContactLastName(e.target.value)} />
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='department_name' style={{fontSize:'1rem'}}>Department Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='department_name' 
            name='department_name'
            value={applicationcontactdeptname} 
            onChange={(e) => setapplicationContactDeptName(e.target.value)} />
          </InputGroup>
        </FormGroup>
               
        <FormGroup>
          <Label for='phone1' style={{fontSize:'1rem'}}>Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='phone1' 
            name='phone1'
            value={applicationcontactphone1} 
            onChange={(e) => setapplicationContactPhone1(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='phone_2' style={{fontSize:'1rem'}}>Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='phone_2' 
            name='phone_2'
            value={applicationcontactphone2} 
            onChange={(e) => setapplicationContactPhone2(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='phone1isd' style={{fontSize:'1rem'}}>Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='phone1isd' 
            name='phone1isd'
            value={applicationcontactphone1isd} 
            onChange={(e) => setapplicationContactPhone1ISD(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='phone2isd' style={{fontSize:'1rem'}}>Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='phone2isd' 
            name='phone2isd'
            value={applicationcontactphone2isd}
            onChange={(e) => setapplicationContactPhone2ISD(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='email1' style={{fontSize:'1rem'}}>Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='email1' 
            name='email1'
            value={applicationcontactemail1}
            onChange={(e) => setapplicationContactEmail1(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='email2' style={{fontSize:'1rem'}}>Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='email2' 
            name='email2'
            value={applicationcontactemail2}
            onChange={(e) => setapplicationContactEmail2(e.target.value)} />
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
