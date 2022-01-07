// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Command, Clipboard, Database } from 'react-feather'
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
  FormFeedback
} from 'reactstrap'

import axios from 'axios'
import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'

const AddNewModal = ({ open, handleModal, fetchData }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])
  const [datathree, setDataThree] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [resourcepartitiondchall, setResourcePartitionDCHall] = useState("")
  const [dchallname, setDchallName] = useState('')
  const [dchallid, setDchallid] = useState('')
  const [customerbusinessname, setCustomerBusinessName] = useState('')
  const [customerbusinessid, setCustomerBusinessId] = useState('')
  const [partitionname, setpartitionName] = useState("")

  //-Dropdown selection handler-
   const index = data.findIndex(obj => obj.dcHallName === dchallname)
   console.log("Index value Business= ", index)
 
   useEffect(() => {
     try { //This try is solve the Type undifined error
      setDchallid(data[index].dcHallId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log('dcHallId =', dchallid)

   const changeSelectOptionHandlerDcHallName = (event) => {
    setDchallName(event.target.value)
   }
  //-Dropdown selection handler End-
 
//-Dropdown selection handler-
   
  const index2 = datatwo.findIndex(obj => obj.customerBusinessName === customerbusinessname)
  console.log("Index value Business= ", index2)
   
  useEffect(() => {
    try { //This try is solve the Type undifined error
      setCustomerBusinessId(datatwo[index2].customerId)
       } catch (error) {
         console.log('Spec', error)
       }
     })
    console.log('customerId =', customerbusinessid)

    const changeSelectOptionHandlerCustomerBusinessName = (event) => {
    setCustomerBusinessName(event.target.value)
     }
  //-Dropdown selection handler End-

  //-Dropdown selection handler-
    
    const changeSelectOptionHandlerResourcePartitionName = (event) => {
      setpartitionName(event.target.value)
     }
  //-Dropdown selection handler End-
  
  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-res-partition-dc-hall`, {
      customerBusinessName : customerbusinessname,
      customerId : customerbusinessid,
      dcHallId : dchallid,
      dcHallName : dchallname,
      resPartitionName : partitionname 
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
        console.log("Response = ", response)
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

  //--Fetching Dropdown Api 1
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-dcHallNames`
      
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

  //--Fetching Dropdown Api 1
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-resPartitionNames`
      
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    // email: yup.string().email().required(),
    OsCategoryName: yup.string().min(10).required(),
    OsCategorytag: yup.string().min(10).required(),
    Ostechname: yup.string().min(10).required(),
    setIscOsCategoryDescription: yup.string().max(500).required()
  })

  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    console.log(data)
  }
  // Validation Part Ends
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>New Resource Partition DC Hall</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      {/* <FormGroup>
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}> Resource Partition Dc Hall</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='isctechcategorydescription'
            onChange={(e) => setResourcePartitionDCHall(e.target.value)} />
          </InputGroup>
       </FormGroup> */}
      <FormGroup>
        <Label for='Customer' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Customer' onChange={changeSelectOptionHandlerCustomerBusinessName}>
            <option disabled hidden selected> Choose Business Name </option>
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
        <Label for='ResourcePartitionName' style={{fontSize:'1rem'}}>Resource Partition Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='ResourcePartitionName' onChange={changeSelectOptionHandlerResourcePartitionName}>
          <option disabled hidden selected> Choose Resource Partition Name </option>
            {datathree.map(item => (
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
        <Label for='DCHallName' style={{fontSize:'1rem'}}>DC Hall Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='DCHallName' onChange={changeSelectOptionHandlerDcHallName}>
          <option disabled hidden selected> Choose DC Hall Name </option>
            {data.map(item => (
              <option
                key={data.dcHallName}
                value={data.dcHallName}
                
              >
                {item.dcHallName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>
        
        <Button className='mr-1' color='primary' onClick={ () => {
            handlePost()
            handleModal()
            }
         }>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal