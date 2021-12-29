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
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal, fetchData }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [iscoscategorydescription, setIscOsCategoryDescription] = useState("")
  const [iscoscategoryname, setIscOsCategoryName] = useState("")
  const [iscoscategorytags, setIscOsCategoryTags] = useState("")
  const [iscotechname, setIscTechName] = useState("")
 
  //-Dropdown selection handler-
  const [iscotechnameselected, setSelected] = useState('')
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value)
  }
 //-Dropdown selection handler End-

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  
  const handlePost = (evt) => {
    console.log(iscoscategorydescription)
    console.log(iscoscategoryname)
    console.log(iscoscategorytags)
    console.log(iscotechnameselected)
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-data-tech-master`, {
      iscDataTechDescription : iscoscategorydescription,
      iscDataTechName : iscoscategoryname,
      iscDataTechTags : iscoscategorytags,
      iscTechCategoryName : iscotechnameselected
      
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
  //--Fetching Dropdown

  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-techcategory`
      
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
  
  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    // email: yup.string().email().required(),
    DataCategoryName: yup.string().min(5).required(),
    DataCategorytag: yup.string().min(10).required(),
    Datatechname: yup.string().min(10).required(),
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
        <h5 className='modal-title'style={{color:'black'}}>New Data Technology</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
          <Label for='DataCategoryName' style={{fontSize:'1rem'}}>Data Technology Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='DataCategoryName' name='DataCategoryName' innerRef={register({ required: true })} invalid={errors.DataCategoryName && true} placeholder=''  onChange={(e) => setIscOsCategoryName(e.target.value)} />
            {errors && errors.DataCategoryName && <FormFeedback>Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
        <Label for='Ostechname' style={{fontSize:'1rem'}}>Technology Category Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='select-basic' onChange={changeSelectOptionHandler}>
            <option> Choose tech name </option>
            {data.map(item => (
              <option
                key={data.iscTechCategoryName}
                value={data.iscTechCategoryName}
                
              >
                {item.iscTechCategoryName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='DataCategorytag' style={{fontSize:'1rem'}}>Data Tech Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Command size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='DataCategorytag' id='email' name='DataCategorytag' innerRef={register({ required: true })} invalid={errors.DataCategorytag && true} placeholder='' onChange={(e) => setIscOsCategoryTags(e.target.value)}/>
            {errors && errors.DataCategorytag && <FormFeedback>Name must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
     
        <FormGroup>
          <Label for='Discription' style={{fontSize:'1rem'}}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Clipboard size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='textarea' rows='3' id='Discription' name='setIscOsCategoryDescription' innerRef={register({ required: true })} invalid={errors.setIscOsCategoryDescription && true} placeholder='' onChange={(e) => setIscOsCategoryDescription(e.target.value)} />
            {errors && errors.setIscOsCategoryDescription && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
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