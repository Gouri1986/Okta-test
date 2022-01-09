// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { X, Layers } from 'react-feather'
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
  const [datatwo, setDataTwo] = useState([])
  const [datathree, setDataThree] = useState([])
  const [datafour, setDataFour] = useState([])
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [idCustomer, setidCustomer] = useState("")
  const [customername, setCustomerName] = useState("")
  console.log("Name = ", customername)
  console.log("cid = ", idCustomer)

  const index = data.findIndex(obj => obj.customerBusinessName === customername)
  console.log("Index Name = ", index)
  useEffect(() => {
    try {
      setidCustomer(data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  //Dropdown Handler
  const CustomerDropDown = (event) => {
    setCustomerName(event.target.value)
  }

  //Dropdown Handler
  const [partitionName, setpartitionName] = useState("")
  const ChnagePartition = (event) => {
    setpartitionName(event.target.value)
  }

  //Dropdown Handler
  const [regionId, setregionId] = useState("")
  const ChangeRegionId = (event) => {
    setregionId(event.target.value)
  }

  //Dropdown Handler
  const [idAz, setidAz] = useState("")
  const ChangeAzid = (event) => {
    setidAz(event.target.value)
  }
  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-aws-res-partition-az`, {
      azId: idAz,
      azRegionId: regionId,
      customerBusinessName: customername,
      customerId: idCustomer,
      resPartitionName: partitionName
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

  //--Fetching Dropdown
  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
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
  //--Fetching Dropdown ends
  //--Fetching Dropdown
  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-resPartitionNames`
    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
        setDataTwo(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  //--Fetching Dropdown ends
  //--Fetching Dropdown
  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-awsRegions`
    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
        setDataThree(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  //--Fetching Dropdown ends
  //--Fetching Dropdown
  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-awsAzIds`
    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
        setDataFour(response.data.data)
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
        <h5 className='modal-title' style={{ color: 'black' }}>New AWS Resource Partition AZ</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>

        <FormGroup>
          <Label for='Customer' style={{ fontSize: '1rem' }}>Customer</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='Customer' onChange={CustomerDropDown}>
              <option disabled hidden selected>Choose Customer</option>
              {data.map(item => (
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
          <Label for='Partition-Name' style={{ fontSize: '1rem' }}>Partition Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='Partition-Name'
              onChange={ChnagePartition}>
              <option disabled hidden selected>Choose Partition Name</option>
              {datatwo.map(item => (
                <option
                  key={datatwo.resPartitionName}
                  value={datatwo.resPartitionName}

                >
                  {item.resPartitionName}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='AZ-ID' style={{ fontSize: '1rem' }}>AZ ID</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='AZ-ID'
              onChange={ChangeAzid}>
              <option disabled hidden selected>Choose Az Id</option>
              {datafour.map(item => (
                <option
                  key={datafour.azId}
                  value={datafour.azId}
                >
                  {item.azId}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='RegionId' style={{ fontSize: '1rem' }}>Region ID</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='select-RegionId' onChange={ChangeRegionId}>
              <option disabled hidden selected>Choose Az Id</option>
              {datathree.map(item => (
                <option
                  key={datathree.regionId}
                  value={datathree.regionId}
                >
                  {item.regionId}
                </option>
              ))}
            </Input>
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