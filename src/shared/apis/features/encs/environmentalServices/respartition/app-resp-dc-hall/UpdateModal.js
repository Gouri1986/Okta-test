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
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [appsubpartitionname, setappSubPartitionName] = useState('')
  const [appsubpartitionid, setappSubPartitionId] = useState('')
  const [respartitionname, setResPartitionName] = useState('')
  const [respartitionid, setResPartitionId] = useState('')
  const [pk, setPk] = useState('')

   //-Dropdown selection handler-
 
   const index = data.findIndex(obj => obj.resPartitionName === respartitionname)
   console.log("Index value respartitionname= ", index)
 
   useEffect(() => {
     try { //This try is solve the Type undifined error
       setResPartitionId(data[index].resPartitiondcHallId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log('respartitionid = ', respartitionid)
 
   const changeSelectOptionHandlerResPartitionName = (event) => {
     setResPartitionName(event.target.value)
   }
   //-Dropdown selection handler End-
 
   //-Dropdown selection handler-
 
   const index2 = datatwo.findIndex(obj => obj.appSubPartitionName === appsubpartitionname)
   console.log("Index value respartitionname= ", index2)
 
   useEffect(() => {
     try { //This try is solve the Type undifined error
       setappSubPartitionId(datatwo[index2].appSubPartitionId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log('respartitionid = ', appsubpartitionid)
   
   const changeSelectOptionHandlerApplicationSubPartition = (event) => {
     setappSubPartitionName(event.target.value)
   }
   //-Dropdown selection handler End-/
   
  //-Update Method
  useEffect(() => {
   setPk(value.appResPartitionDcHallId)
   })
  useEffect(() => {
    setResPartitionName(value.resPartitionName)
    setappSubPartitionName(value.appSubPartitionName)
 }, [value])


  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-app-res-partition-dc-hall`, {
      appResPartitionDcHallId : pk,
      appSubPartitionId : appsubpartitionid,
      appSubPartitionName : appsubpartitionname,
      resPartitionDcHallId : respartitionid,
      resPartitionName : respartitionname
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
      .catch((error, response) => {
        console.log(response)
        console.log("An error occurred:", error)
      })
  }
//-Update Method End
 //--Fetching Dropdown Api 1
  
 useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-resPartitiondcHallIds`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from resPartitiondcHallIds!")
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-appSubPartitions`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from resPartitiondcHallIds!")
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
        <h5 className='modal-title'style={{color:'black'}}>Update Application Respartition DC Hall</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
        <Label for='ResourcePartition' style={{fontSize:'1rem'}}>Resource Partition</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='ResourcePartition' 
          value={respartitionname}
          onChange={changeSelectOptionHandlerResPartitionName}>
            <option disabled hidden selected> Choose Resource Partition -</option>
            {data.map(item => (
              <option
                key={data.resPartitionName}
                value={data.resPartitionName}
                
              >
                {item.resPartitionName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='ApplicationSubPartition' style={{fontSize:'1rem'}}>Application Sub Partition</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='ApplicationSubPartition'
          value={appsubpartitionname}
          onChange={changeSelectOptionHandlerApplicationSubPartition}>
          <option disabled hidden selected> Choose Resource Partition -</option>
            {datatwo.map(item => (
              <option
                key={data.appSubPartitionName}
                value={data.appSubPartitionName}
                
              >
                {item.appSubPartitionName}
              </option>
            ))}
        </Input>
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
