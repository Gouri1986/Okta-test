import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./iam.scss";
import axios from "axios";
import Navbar from "../../shared/components/common/drawer/iamNavDrawer/NavDrawer";
import TitanTable from "../../shared/components/common/tableContainer/table/Table";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";

// import { getTableData } from "../../apis/table/table";
import {
  addIAMTableData,
  getIAMTableData,
  updateIAMTableData,
  deleteIAMTableData,
} from "../../shared/apis/iam";
import { Button, Input, Modal } from "@mui/material";
import {
  getSpacedDisplayName,
  getSanitisedTableData,
} from "../../shared/utils/table";
import iamRoutes from "../../routes/metadataRoutes/identityAndAccessManagement";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Import The components Here

const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);

  // Data to be populated with Filtered Columns
  const [tableContents, setTableContents] = useState([]);
  // Search Value
  // Data to be filled with selected Rows(Checked)
  const [selectedRow, setSelectedRow] = useState([]);
  const [report, showReport] = useState(false);
  const [activeEndPoint, setActiveEndPoint] = useState("");
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const [modalMode, setModalMode] = useState("ADD");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState([]);
  const [tableDetails, setTableDetails] = useState({});

  useEffect(() => {
    activeEndPoint.length > 0 && getTable(activeEndPoint);
  }, [refresh, location.pathname]);

  useEffect(() => {
    let tableDetailsFromRoutes = iamRoutes.filter(
      (e) => e.path === location.pathname.replace("/iam", "")
    );
    tableDetailsFromRoutes.length > 0 &&
      setTableDetails(tableDetailsFromRoutes[0]);
  }, [location.pathname]);

  useEffect(() => {
    if (modalMode === "ADD") {
      setModalForm(getSanitisedTableData(tableContents, tableDetails));
    }
  }, [modalOpen, tableDetails]);

  const getTable = async (activeEndPoint) => {
    const data = await getIAMTableData(activeEndPoint, user);
    const objectKeys = data?.map((e) => {
      return Object.keys(e);
    });
    const header = objectKeys?.[0]?.map((el) => {
      return { title: getSpacedDisplayName(el), id: el };
    });
    data && setTableContents({ header, data });
  };

  const addDataToTable = async () => {
    const arrayWithRequiredValues = modalForm.map(
      ({ id, title, checkbox, dropdown, uk, pk, json, ...rest }) => rest
    );
    const reducedToOneObject = arrayWithRequiredValues.reduce((prev, cur) => ({
      ...prev,
      ...cur,
    }));
    await addIAMTableData(activeEndPoint, user, reducedToOneObject);
    setModalOpen(false);
    getTable(activeEndPoint);
  };

  const updateDataToTable = async () => {
    const arrayWithRequiredValues = modalForm.map(
      ({ id, title, ...rest }) => rest
    );
    const reducedToOneObject = arrayWithRequiredValues.reduce((prev, cur) => ({
      ...prev,
      ...cur,
    }));
    await updateIAMTableData(activeEndPoint, user, reducedToOneObject);
    setModalOpen(false);
    getTable(activeEndPoint);
  };

  const deleteDataToTable = async () => {
    const arrayWithRequiredValues = modalForm.map(
      ({ id, title, ...rest }) => rest
    );
    const reducedToOneObject = arrayWithRequiredValues.reduce((prev, cur) => ({
      ...prev,
      ...cur,
    }));
    await deleteIAMTableData(activeEndPoint, user, reducedToOneObject);
    setModalOpen(false);
    getTable(activeEndPoint);
  };

  const AddIcon = () => {
    return (
      <svg
        width='24'
        height='24'
        viewBox='0 0 38 38'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2.33333 21.0833H16.9167V35.6667C16.9167 36.2192 17.1362 36.7491 17.5269 37.1398C17.9176 37.5305 18.4475 37.75 19 37.75C19.5525 37.75 20.0824 37.5305 20.4731 37.1398C20.8638 36.7491 21.0833 36.2192 21.0833 35.6667V21.0833H35.6667C36.2192 21.0833 36.7491 20.8638 37.1398 20.4731C37.5305 20.0824 37.75 19.5525 37.75 19C37.75 18.4475 37.5305 17.9176 37.1398 17.5269C36.7491 17.1362 36.2192 16.9167 35.6667 16.9167H21.0833V2.33333C21.0833 1.7808 20.8638 1.25089 20.4731 0.860194C20.0824 0.469493 19.5525 0.25 19 0.25C18.4475 0.25 17.9176 0.469493 17.5269 0.860194C17.1362 1.25089 16.9167 1.7808 16.9167 2.33333V16.9167H2.33333C1.7808 16.9167 1.25089 17.1362 0.860194 17.5269C0.469493 17.9176 0.25 18.4475 0.25 19C0.25 19.5525 0.469493 20.0824 0.860194 20.4731C1.25089 20.8638 1.7808 21.0833 2.33333 21.0833Z'
          fill='#464255'
        />
      </svg>
    );
  };

  const DynamicDropDown = ({ dropdown, content, index }) => {
    const [dropDownData, setDropDownData] = useState([]);

    const getDropDownData = async () => {
      const response = await axios.get(dropdown?.dropdown);
      setDropDownData(response.data?.data);
    };

    useEffect(() => {
      dropdown?.dynamic && getDropDownData();
    }, []);

    return dropdown?.dynamic ? (
      <FormControl className='bdr-grey-1 ml-10 w-200 p-10'>
        <InputLabel id='demo-simple-select-disabled-label'>
          {content.title}
        </InputLabel>
        <Select
          labelId='demo-simple-select-disabled-label'
          id='demo-simple-select-disabled'
          label='Age'
          value={modalForm[index]?.[content.id]}
          onChange={(e) => {
            console.log(e.target.value);
            const modalFormCopy = [...modalForm];
            modalFormCopy[index] = {
              ...content,
              [content.id]: e.target.value,
            };
            setModalForm(modalFormCopy);
          }}
        >
          {dropDownData?.map((e) => {
            return (
              <MenuItem value={e[dropdown?.displayKey]}>
                {e[dropdown?.displayKey]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    ) : null;
  };

  const DynamicCheckBox = ({ content, index }) => {
    const [dropDownData, setDropDownData] = useState([]);
    const [checked, setChecked] = useState({});

    const getDropDownData = async () => {
      const response = await axios.get(content.checkbox?.api);
      setDropDownData(response.data?.data);
    };

    useEffect(() => {
      content.checkbox && getDropDownData();
    }, []);

    return content.checkbox ? (
      <FormControl className='bdr-grey-1 ml-10 w-200 p-10'>
        <div className='flex-r-ac'>
          {dropDownData?.map((el) => {
            return (
              <div>
                <Checkbox
                  bool={
                    el[content.checkbox?.displayKey] ===
                    checked[content.checkbox?.displayKey]
                  }
                  onChange={(e) => {
                    setChecked(el);
                  }}
                />
                <span>{el[content.checkbox?.displayKey]}</span>
              </div>
            );
          })}
        </div>
      </FormControl>
    ) : null;
  };

  return (
    <div className='flex-r width100'>
      <div>
        <Navbar
          setActiveEndPoint={setActiveEndPoint}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      </div>
      <div className='main-ly wp-100 height100vh pl-20 pr-20 flex-c overflow-x-scroll overflow-y-scroll'>
        <div className='table-option-header mt-30 bg-lightgrey flex-r-ac flex-jc-sp-btn  jc-end'>
          <div className='flex-r-ac'>
            <div
              onClick={() => {
                setModalOpen(true);
                setModalMode("ADD");
              }}
              className='m-15 bg-w p-10 br-10 cp'
            >
              <AddIcon />
            </div>
          </div>
        </div>
        <div className='main-ly wp-100 height100vh pl-20 pr-20 flex-c overflow-x-scroll overflow-y-scroll'>
          <div className='table-parent overflow-x-auto overflow-y-scroll wp-100'>
            <TitanTable
              report={report}
              selectedRow={selectedRow}
              tableData={tableContents}
              setTableContents={setTableContents}
              status={true}
              setModalMode={setModalMode}
              setModalOpen={setModalOpen}
              modalForm={modalForm}
              setModalForm={setModalForm}
              tableDetails={tableDetails}
              deleteDataToTable={deleteDataToTable}
            />
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className='flex-r-jc-ac'>
          <div
            style={{ backgroundColor: "white" }}
            className='mr-20 ml-20 flex-c-jc-ac  wvw-80 overflow-y-scroll p-50'
          >
            {modalForm?.map((content, index) => {
              return (
                <div className='mb-10 flex-r-ac'>
                  <div className='w-200'>
                    <label className='font-18'>{content.title}</label>
                  </div>
                  {content.dropdown && !content.dropdown?.dynamic && (
                    <FormControl className='bdr-grey-1 ml-10 w-200 p-10'>
                      <InputLabel id='demo-simple-select-disabled-label'>
                        {content.title}
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-disabled-label'
                        id='demo-simple-select-disabled'
                        label='Age'
                        value={modalForm[index]?.[content.id]}
                        onChange={(e) => {
                          const modalFormCopy = [...modalForm];
                          modalFormCopy[index] = {
                            ...content,
                            [content.id]: e.target.value,
                          };
                          setModalForm(modalFormCopy);
                        }}
                      >
                        {Array.isArray(content.dropdown?.dropdown) &&
                          content.dropdown?.dropdown?.map((e) => (
                            <MenuItem value={e}>{e}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}

                  <DynamicDropDown
                    dropdown={content.dropdown}
                    content={content}
                    index={index}
                  />

                  <DynamicCheckBox content={content} index={index} />

                  {!content.dropdown && !content.checkbox && (
                    <Input
                      value={modalForm[index]?.[content.id]}
                      onChange={(e) => {
                        const modalFormCopy = [...modalForm];
                        modalFormCopy[index] = {
                          ...content,
                          [content.id]: e.target.value,
                        };
                        setModalForm(modalFormCopy);
                      }}
                      disabled={
                        modalMode === "UPDATE" && (content.pk || content.uk)
                      }
                      className='bdr-grey-1 ml-10 w-200 p-10'
                    />
                  )}
                </div>
              );
            })}
            <div className='flex-r-ac mt-50'>
              <Button
                onClick={() => setModalOpen(false)}
                variant='outlined'
                color='error'
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  modalMode === "ADD" ? addDataToTable() : updateDataToTable()
                }
                variant='contained'
                color='success'
                className='ml-50'
              >
                {modalMode}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
