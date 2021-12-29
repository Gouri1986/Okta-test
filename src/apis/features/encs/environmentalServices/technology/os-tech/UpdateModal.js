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


import handleSuccess from '@components/alerts/Success'
import handleError from '@components/alerts/Error'

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
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
  
  // const [email, setEmail] = useState("ddhbderher")
  //-Update Method
  useEffect(() => {
    setIscOsCategoryName(value.iscOsTechName)
   })
  useEffect(() => {
   setIscOsCategoryDescription(value.iscOsTechDescription)
   setIscOsCategoryTags(value.iscOsTechTags)
   setSelected(value.iscTechCategoryName)
 }, [value])

  const handlePost = (evt) => {
    console.log(value)
    console.log(iscoscategorydescription)
    console.log(iscoscategoryname)
    console.log(iscoscategorytags)
    console.log(iscotechname)
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-os-tech-master`, {
      iscOsTechDescription : iscoscategorydescription,
      iscOsTechName : iscoscategoryname,
      iscOsTechTags : iscoscategorytags,
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
        if (response.data.message === "An unexpected internal application error has occurred. Please Contact System Administrator") {
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
const [data, setData] = useState([])
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
return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update OS Technology Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='isctechcategoryname' style={{fontSize:'1rem'}}>Os technology name*</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='iscoscategoryname'
            value={iscoscategoryname}             
             onChange={(e) => {
              setIscOsCategoryName(e.target.value)
             }} />
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
        <Label for='Ostechname' style={{fontSize:'1rem'}}>Tech category name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='select-basic' 
          onChange={changeSelectOptionHandler}
          value={iscotechnameselected}
          >
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
          <Label for='isctechcategorytags' style={{fontSize:'1rem'}}>Os Technology Tag</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='iscoscategorytags'
            value={iscoscategorytags}
            onChange={(e) => setIscOsCategoryTags(e.target.value)} />
          </InputGroup>
        </FormGroup>
     
        <FormGroup>
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Discription</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='isctechcategorydescription'
            value={iscoscategorydescription}
            onChange={(e) => setIscOsCategoryDescription(e.target.value)} />
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
