import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./iam.scss";
import axios from "axios";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getApiEndpointNameFromRoutes,
  getTableDetailFromRoutes,
  getTableTitleNameFromRoutes,
} from "../../shared/utils/getApiEndpointFromRoutes";
import { MetadataLayout } from "../../shared/layout";
import { iamDrawer } from "../../shared/utils/drawer";
import Pagination  from "../../shared/components/common/tableContainer/pagination/Pagination";
import { IAMRoutes } from "../../routes/metadataRoutes";

// Import The components Here

const MyModal = ({
  modalOpen,
  modalForm,
  modalMode,
  setModalForm,
  setModalMode,
  setModalOpen,
  addDataToTable,
  updateDataToTable,
  tableDetails,
}) => {
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div className='flex-r-jc-ac'>
        <div
          style={{ backgroundColor: "white" }}
          className='m-50 flex-c-jc-ac  wp-100 hvh-80 overflow-y-scroll p-50'
        >
          {modalForm
            ?.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
            ?.filter((e) => !tableDetails.whitelist?.includes(e.id))
            .map((content, index) => {
              return (
                <div className='mb-10 flex-r-ac'>
                  <div className='w-200'>
                    <label className='font-18'>{content.title}</label>
                  </div>
                  {content.dropdown && !content.dropdown?.dynamic && (
                    <StaticDropDown
                      modalForm={modalForm}
                      modalMode={modalMode}
                      setModalForm={setModalForm}
                      dropdown={content.dropdown}
                      content={content}
                      index={index}
                      tableDetails={tableDetails}
                    />
                  )}

                  {content.dropdown?.dynamic && (
                    <DynamicDropDown
                      modalForm={modalForm}
                      modalMode={modalMode}
                      setModalForm={setModalForm}
                      dropdown={content.dropdown}
                      content={content}
                      index={index}
                      tableDetails={tableDetails}
                    />
                  )}
                  {content.checkbox && (
                    <DynamicCheckBox
                      modalForm={modalForm}
                      modalMode={modalMode}
                      setModalForm={setModalForm}
                      content={content}
                      tableDetails={tableDetails}
                      index={index}
                    />
                  )}

                  {!content.dropdown && !content.checkbox && (
                    <ModalInput
                      modalForm={modalForm}
                      modalMode={modalMode}
                      setModalForm={setModalForm}
                      dropdown={content.dropdown}
                      content={content}
                      index={index}
                      tableDetails={tableDetails}
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
  );
};

const ModalInput = ({
  modalForm,
  setModalForm,
  modalMode,
  content,
  tableDetails,
  index,
}) => {
  return (
    <Input
      value={
        modalForm
          ?.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
          ?.filter((e) => !tableDetails.whitelist?.includes(e.id))[index]?.[
          content.id
        ]
      }
      onChange={(e) => {
        const modalFormCopy = [
          ...modalForm
            ?.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
            ?.filter((e) => !tableDetails.whitelist?.includes(e.id)),
        ];
        modalFormCopy[index] = {
          ...content,
          [content.id]: e.target.value,
        };
        setModalForm(modalFormCopy);
      }}
      disabled={
        (modalMode === "UPDATE" && (content.pk || content.uk)) ||
        tableDetails.dependency?.find(
          (e) => e.children.includes(content.id) && e.disabled
        ) ||
        (tableDetails.dependency &&
          !tableDetails.dependency?.find(
            (e) =>
              e.children.includes(content.id) &&
              [...modalForm].find((el) => el[e.parent] === e.value)
          ))
      }
      className='bdr-grey-1 ml-10 w-200 p-10'
    />
  );
};

const StaticDropDown = ({
  content,
  index,
  modalForm,
  setModalForm,
  tableDetails,
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected.length > 0) {
      const modalFormCopy = [
        ...modalForm
          ?.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
          ?.filter((e) => !tableDetails.whitelist?.includes(e.id)),
      ];
      modalFormCopy[index] = {
        ...content,
        [content.id]: selected,
      };
      setModalForm(modalFormCopy);
    }
  }, [selected]);

  return (
    <FormControl className='bdr-grey-1 ml-10 w-200 p-10'>
      <InputLabel id='demo-simple-select-disabled-label'>
        {content.title}
      </InputLabel>
      <Select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
        }}
      >
        {Array.isArray(content.dropdown?.dropdown) &&
          content.dropdown?.dropdown?.map((e) => (
            <MenuItem value={e}>{e}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const DynamicDropDown = ({
  dropdown,
  content,
  index,
  modalForm,
  setModalForm,
  tableDetails,
}) => {
  const [dropDownData, setDropDownData] = useState([]);
  const [selected, setSelected] = useState("");
  const selectedValue = modalForm[index]?.[dropdown?.displayKey] || "";

  const getDropDownData = async () => {
    const response = await axios.get(dropdown?.dropdown);
    setDropDownData(response.data?.data);
  };

  useEffect(() => {
    dropdown?.dynamic && getDropDownData();
  }, []);

  useEffect(() => {
    if (selected.length > 0) {
      const dropdownValue = dropDownData.find(
        (e) => e[dropdown?.displayKey] === selected
      );
      const modalFormCopy = [
        ...modalForm
          ?.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
          ?.filter((e) => !tableDetails.whitelist?.includes(e.id)),
      ];

      if (
        tableDetails.dependency?.find(
          (e) => e.parent === content.id && !e.value
        )
      ) {
        let newMF = modalFormCopy.map((mf) => {
          if (Object.keys(dropdownValue).includes(mf.id)) {
            console.log(mf.id, dropdownValue[mf.id]);
            return { ...mf, [mf.id]: dropdownValue[mf.id] };
          }
          return mf;
        });
        setModalForm(newMF);
      } else {
        console.log("djkdj");
        modalFormCopy[index] = {
          ...content,
          ...dropdownValue,
        };
        setModalForm(modalFormCopy);
      }
    }
  }, [selected]);

  return dropdown?.dynamic ? (
    <FormControl className='bdr-grey-1 ml-10 w-200 p-10'>
      <InputLabel id='demo-simple-select-disabled-label'>
        {content.title}
      </InputLabel>
      <Select
        value={selected || selectedValue}
        onChange={(e) => {
          setSelected(e.target.value);
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

const DynamicCheckBox = ({
  content,
  index,
  modalForm,
  setModalForm,
  tableDetails,
}) => {
  const [dropDownData, setDropDownData] = useState([]);
  const [checked, setChecked] = useState([]);

  const getDropDownData = async () => {
    const response = await axios.get(content.checkbox?.api);
    setDropDownData(response.data?.data);
  };

  useEffect(() => {
    content.checkbox && getDropDownData();
  }, []);

  useEffect(() => {
    if (checked.length > 0) {
      const modalFormCopy = [
        ...modalForm
          ?.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
          ?.filter((e) => !tableDetails.whitelist?.includes(e.id)),
      ];
      modalFormCopy[index] = {
        ...content,
        [content.id]: checked,
      };
      setModalForm(modalFormCopy);
    }
  }, [checked]);

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
                  setChecked([...checked, el]);
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
  const [tableDetails, setTableDetails] = useState({});
  const [tableTitle, setTableTitle] = useState("");

  useEffect(() => {
    let endpointFromPath = getApiEndpointNameFromRoutes(
      iamDrawer,
      location,
      "iam/"
    );
    if (endpointFromPath) {
      getTable(endpointFromPath);
    } else {
      activeEndPoint.length > 0 && getTable(activeEndPoint);
    }
    setTableTitle(getTableTitleNameFromRoutes(iamDrawer, location, "iam/"));

    let tableDetail = getTableDetailFromRoutes(IAMRoutes, location, "iam/");
    setTableDetails(tableDetail);
  }, [refresh, location.pathname]);

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

  // const updateDataToTable = async () => {
  //   const arrayWithRequiredValues = modalForm.map(
  //     ({ id, title, checkbox, dropdown, uk, pk, json, ...rest }) => rest
  //   );
  //   const reducedToOneObject = arrayWithRequiredValues.reduce((prev, cur) => ({
  //     ...prev,
  //     ...cur,
  //   }));
  //   await updateIAMTableData(activeEndPoint, user, reducedToOneObject);
  //   setModalOpen(false);
  //   getTable(activeEndPoint);
  // };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // state for the visibility of crud modal
  const [openCRUDModal, setOpenCRUDModal] = useState(false);

  const layoutProps = {
    setRefresh,
    refresh,
    getTable,
    report,
    showReport,
    tableData: tableContents,
    tableTitle,
    drawer: iamDrawer,
    openCRUDModal,
    setOpenCRUDModal,
    setActiveEndPoint,
  };

  const tableProps = {
    selectedRow,
    tableData: tableContents,
    tableDetails,
    setTableContents,
    tableDetails,
    showCheckBox: true,
    tableTitle,
    showAction: true,
    page,
    rowsPerPage,
    openCRUDModal,
    setOpenCRUDModal,
    activeEndPoint,
    getTable,
  };

  const paginationProps = {
    dataCount: tableContents.data?.length,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  };

  return (
    <MetadataLayout {...layoutProps}>
      <TitanTable {...tableProps} />
      <Pagination {...paginationProps} />
    </MetadataLayout>
  );
};

export default Dashboard;
