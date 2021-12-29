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
  const [resourceName, setresourceName] = useState("")
  const [resourceMasterDescription, setresourceMasterDescription] = useState("")
  const [resourceMasterId, setresourceMasterId] = useState("")
  const [tags, settags] = useState("")
  const [dummy, setDummy] = useState([])
  const [onpServiceName, setonpServiceName] = useState('')
  const [onpServiceMasterId, setonpServiceMasterId] = useState('')

  const index2 = data.findIndex(obj => obj.onpServiceMasterId === onpServiceMasterId)
  console.log("Index value onpServiceMasterId = ", index2)
  useEffect(() => {
    try { //This try is solve the Type undifined error
      setonpServiceName(data[index2].onpServiceName)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  const index = data.findIndex(obj => obj.onpServiceName === onpServiceName)
  console.log("Index value = ", index)// Printing the index value of selected option

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setDummy(data[index].onpServiceMasterId)
        //console.log("Direct = ", data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log(dummy)

  //-------------Fg Id Dropdown selection handler----------------
 
  const changeSelectOptionHandleronpServiceMasterId = (event) => {
    setonpServiceName(event.target.value)
  }
  //-------------------------Update Method---------------------------------------------
  useEffect(() => {

   })
  useEffect(() => {
    setresourceName(value.onpResourceName)
    setresourceMasterDescription(value.onpResourceMasterDescription)
    setresourceMasterId(value.onpResourceMasterId)
    settags(value.encsTags)
    setonpServiceName(value.onpServiceName)
 }, [value])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )


  const handlePost = (evt) => {
    
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-onp-resource-master-details`, {
      onpResourceName:resourceName, 
      onpResourceMasterDescription:resourceMasterDescription,
      onpResourceMasterId:resourceMasterId,
      encsTags:tags,
      onpServiceMasterId:dummy     
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
//-----------------------------------Fetching Dropdown---------------------------------------------------------------
 useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-onpServiceNames`
    
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
//-----------------------------------------Fetching Dropdown ends------------------------------------------------------------

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update ONP Resource Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
    
      <FormGroup>
          <Label for='resourceName' style={{fontSize:'1rem'}}>ONP Resource Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='resourceName' 
            name='resourceName'
            value={resourceName} 
            onChange={(e) => setresourceName(e.target.value)} />
          </InputGroup>
        </FormGroup>
              
        <FormGroup>
        <Label for='onpServiceMaster' style={{fontSize:'1rem'}}>ONP Service Master ID</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='onpServiceMaster' id='onpServiceMaster' 
          value={onpServiceName}
          onChange={changeSelectOptionHandleronpServiceMasterId}>
            <option>--- Choose ONP Service Master ID ---</option>
            {data.map(item => (
              <option
                key={data.onpServiceName}
                value={data.onpServiceName}
                >
                {item.onpServiceName}
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
            value={resourceMasterDescription} 
            onChange={(e) => setresourceMasterDescription(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='tags' style={{fontSize:'1rem'}}>Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='tags' 
            name='tags'
            value={tags} 
            onChange={(e) => settags(e.target.value)} />
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
