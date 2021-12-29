// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Database, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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

const UpdateModal = ({ open, handleUpdateModal, value, fetchData }) => {
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
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [gcprespartitionazid, setgcpResPartitionAzId] = useState("")
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
  //-------------------------Update Method---------------------------------------------
  useEffect(() => {
    setgcpResPartitionAzId(value.awsResPartitionAzId)
    setCustomerName(value.customerBusinessName)
  })
  useEffect(() => {
    setidAz(value.azId)
    setregionId(value.azRegionId)
    setidCustomer(value.customerId)
    setpartitionName(value.resPartitionName)
  }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-aws-res-partition-az`, {
      awsResPartitionAzId: gcprespartitionazid,
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
          const Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, { fetchData })
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }
  //-------------------------Update Method End---------------------------------------------

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
  return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title' style={{ color: 'black' }}>Update AWS Resource Partition AZ</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='Customer' style={{ fontSize: '1rem' }}>Customer</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='Customer'
              value={customername}
              onChange={CustomerDropDown}>
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
              value={partitionName}
              onChange={ChnagePartition}>
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
          <Label for='AZ-ID' style={{ fontSize: '1rem' }}>Az Id</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='AZ-ID'
              value={idAz}
              onChange={ChangeAzid}>
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
          <Label for='RegionId' style={{ fontSize: '1rem' }}>Region Id</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='RegionId'
              value={regionId}
              onChange={ChangeRegionId}>
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
        <Button className='mr-1' color='primary'
          onClick={() => {
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
