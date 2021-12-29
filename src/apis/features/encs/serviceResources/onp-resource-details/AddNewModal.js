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

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [resourceName, setresourceName] = useState("")
  const [resourceMasterDescription, setresourceMasterDescription] = useState("")
  const [resourceMasterId, setresourceMasterId] = useState("")
  const [tags, settags] = useState("")
  const [dummy, setDummy] = useState([])
  const [onpServiceName, setonpServiceName] = useState('')

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
 //-------------Dropdown selection handler End----------------

  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-onp-resource-master-details`, {
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    resourceName: yup.string().min(5).required(),
    Tags: yup.string().min(5).required(),
    Description: yup.string().max(500).required()
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
        <h5 className='modal-title'style={{color:'black'}}>New ONP Resource Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
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
            innerRef={register({ required: true })} 
            invalid={errors.resourceName && true}  
            onChange={(e) => setresourceName(e.target.value)} />
            {errors && errors.resourceName && <FormFeedback>ONP Resource Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
              
        <FormGroup>
        <Label for='onpServiceMaster' style={{fontSize:'1rem'}}>ONP Service Master</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='onpServiceMaster' id='onpServiceMaster' onChange={changeSelectOptionHandleronpServiceMasterId}>
            <option selected disabled hidden> ONP Service Master </option>
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
          <Label for='Description' style={{fontSize:'1rem'}}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Description' 
            name='Description' type='textarea' rows='2'
            innerRef={register({ required: true })}  
            invalid={errors.Description && true}  
            onChange={(e) => setresourceMasterDescription(e.target.value)} />
            {errors && errors.Description && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
          </InputGroup>
        </FormGroup>
     
        <FormGroup>
          <Label for='Tags' style={{fontSize:'1rem'}}>Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Tags' 
            name='Tags' 
            innerRef={register({ required: true })} 
            invalid={errors.Tags && true}  
            onChange={(e) => settags(e.target.value)} />
            {errors && errors.Tags && <FormFeedback>Tags must be at least 5 characters</FormFeedback>}
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