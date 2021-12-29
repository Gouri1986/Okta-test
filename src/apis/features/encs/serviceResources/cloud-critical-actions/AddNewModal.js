// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Third Party Components
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Command, Clipboard, Database } from 'react-feather'
import {
  Row,
  Col,
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
  const [cloudcriticalactiontitle, setcloudcriticalactiontitle] = useState('')
  const [cloudcriticalactiondescription, setcloudcriticalactiondescription] = useState('')
  const [cloudtype, setcloudType] = useState('Public')
  const [cloudid, setCloudId] = useState([])
  const [cloudname, setcloudName] = useState('')
  const [cloudresourcename, setcloudresourcename] = useState('')
  const [cloudservicename, setcloudservicename] = useState('')
  const [encstags, setencsTags] = useState('')

  const index = data.findIndex(obj => obj.cloudName === cloudname)
  console.log("Index value = ", index)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setCloudId(data[index].cloudMasterId)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log(cloudid)

  //-------------Fg Id Dropdown selection handler----------------

  const changeSelectOptionHandlercloudMasterId = (event) => {
    setcloudName(event.target.value)
  }
  //-------------Dropdown selection handler End----------------

  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-critical-actions`, {
      cloudCriticalActionDescription: cloudcriticalactiondescription,
      cloudCriticalActionTitle: cloudcriticalactiontitle,
      cloudId: cloudid,
      cloudName: cloudname,
      cloudReferenceResources: {
        cloudResourceName: cloudresourcename,
        cloudServiceName: cloudservicename
      },
      cloudType: cloudtype,
      encsTags: encstags
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
          const Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, { fetchData })
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-cloudNames`

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
  //-----------------------------------------Fetching Dropdown ends------------------------------------------------------------

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    cloudServiceName: yup.string().min(5).required(),
    cloudType: yup.string().min(5).required(),
    cloudServiceGroup: yup.string().min(5).required(),
    Tags: yup.string().min(5).required(),
    Description: yup.string().max(500).required(),
    cloudservicemetadataname: yup.string().min(5).required(),
    cloudservicemetadataname: yup.string().min(5).required()

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
        <h5 className='modal-title' style={{ color: 'black' }}>New Cloud Critical Action </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='cloudServiceName' style={{ fontSize: '1rem' }}>Cloud Service Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudServiceName'
              name='cloudServiceName'
              innerRef={register({ required: true })}
              invalid={errors.cloudServiceName && true}
              onChange={(e) => setcloudcriticalactiontitle(e.target.value)} />
            {errors && errors.cloudServiceName && <FormFeedback>Cloud Service Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Description' style={{ fontSize: '1rem' }}>Description</Label>
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
              onChange={(e) => setcloudcriticalactiondescription(e.target.value)} />
            {errors && errors.Description && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='cloudType' style={{ fontSize: '1rem' }}>Cloud Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudType'
              name='cloudType'
              type='select'
              onChange={(e) => setcloudType(e.target.value)}>
              <option>Public</option>
              <option>Private</option>
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='cloudName' style={{ fontSize: '1rem' }}>Cloud Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='cloudName' id='cloudName' onChange={changeSelectOptionHandlercloudMasterId}>
              <option selected disabled hidden> Choose Cloud Name</option>
              {data.map(item => (
                <option
                  key={data.cloudName}
                  value={data.cloudName}
                >
                  {item.cloudName}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label for='Tags' style={{ fontSize: '1rem' }}>Cloud Resource Name</Label>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Database size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id='Tags'
                  onChange={(e) => setcloudresourcename(e.target.value)} />
              </InputGroup>
            </Col>
            <Col>
              <Label for='Tags' style={{ fontSize: '1rem' }}>Cloud Service Name</Label>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Database size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id='Tags'
                  onChange={(e) => setcloudservicename(e.target.value)} />
              </InputGroup>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for='Tags' style={{ fontSize: '1rem' }}>Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Tags'
              name='Tags'
              type='textarea' rows='2'
              innerRef={register({ required: true })}
              invalid={errors.Tags && true}
              onChange={(e) => setencsTags(e.target.value)} />
            {errors && errors.Tags && <FormFeedback>Tags must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <Button className='mr-1' color='primary' onClick={() => {
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