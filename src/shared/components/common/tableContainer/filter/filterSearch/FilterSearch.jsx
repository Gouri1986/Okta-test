import React, { useState } from "react"
import "./filterSearch.scss"
import { FilterSearchIcon, FilterSettingIcon, FilterCloseIcon } from "../assets"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFilteredTableContents } from "../../../../../../redux/table/tabelActions"
import {
  setFilterDrawerExpand,
  setNavDrawerExpand,
  setComplianceDrawerExpand
} from "../../../../../../redux/common/commonActions"

const FilterSearchValueInput = ({ id, onRowValueChange }) => {
  const [value, setValue] = useState("")

  useEffect(() => {
    value.length > 0 && onRowValueChange(value, id)
  }, [value])

  return (
    <input value={value} onChange={e => setValue(e.target.value)} className="no-bdr no-outline pos-rel" />
  )
}

const SelectedFilter = ({
  selectedColumn,
  column,
  onRowValueChange,
  setSelectedColumn,
  setSuggestions,
  setTableContentsToFilter
}) => {
  const { tableContents } = useSelector(state => state.tableReducer)
  const dispatch = useDispatch()

  const removeFilter = () => {
    const selectedFiltersFiltered = selectedColumn.filter(e => e.id !== column.id)
    setSelectedColumn(selectedFiltersFiltered)
    setSuggestions([])
    if (selectedColumn.length === 1) {
      dispatch(setFilteredTableContents({}))
      setTableContentsToFilter(tableContents)
    }
  }

  return (
    <div
      className={`${
        column.value?.length > 0 ? "bdr-tertiary-1" : ""
      } bg-white bdr-r-20 flex-r-ac pr-7 pl-7 b-5 mr-5 mb-4`}
    >
      <p className="mr-7 f-12 fw-400 fc-secondary">
        {column.title} : {column.value?.length > 50 ? column.value.substr(0, 50) + "..." : column.value}
        {!column.value && <FilterSearchValueInput onRowValueChange={onRowValueChange} id={column.id} />}
      </p>
      {column.value?.length > 0 && (
        <span onClick={removeFilter}>
          <FilterCloseIcon />
        </span>
      )}
    </div>
  )
}

const FilterSearchColumnInput = ({
  selectedColumn,
  setSelectedColumn,
  onRowValueChange,
  onColumnValueChange,
  setSuggestions,
  setTableContentsToFilter
}) => {
  const [value, setValue] = useState("")
  useEffect(() => {
    onColumnValueChange(value)
  }, [value])

  useEffect(() => {
    setValue("")
  }, [selectedColumn])

  return (
    <div className="flex-r-ac filter-search-input-holder ">
      {selectedColumn.map(column => (
        <SelectedFilter
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          column={column}
          onRowValueChange={onRowValueChange}
          setSuggestions={setSuggestions}
          setTableContentsToFilter={setTableContentsToFilter}
        />
      ))}
      <input
        value={value}
        placeholder={"Search"}
        onChange={e => setValue(e.target.value)}
        className="filter-search-input pt-10 pb-5 pr-10 "
      />
    </div>
  )
}

const FilterSearch = () => {
  const dispatch = useDispatch()
  const { tableContents, filteredTableContents } = useSelector(state => state.tableReducer)
  const [suggestions, setSuggestions] = useState([])
  const [selectedColumn, setSelectedColumn] = useState([])
  const [activeColumn, setActiveColumn] = useState("")
  const [tableContentsToFilter, setTableContentsToFilter] = useState({})

  useEffect(() => {
    setTableContentsToFilter(tableContents)
  }, [tableContents])

  const { header, data } = tableContentsToFilter

  useEffect(() => {
    const selectedColumnCopy = [...selectedColumn]
    selectedColumnCopy.reverse()
    if (selectedColumnCopy.length > 0) {
      if (filteredTableContents.data?.length >= 1) {
        let filteredData
        for (let i = 0; i < selectedColumnCopy.length; i++) {
          filteredData = filteredTableContents?.data?.filter(e => {
            if (e[selectedColumnCopy[i]["id"]] === selectedColumnCopy[i]["value"]) {
              return true
            }
            return false
          })
        }
        console.log(filteredData)
        filteredData?.length > 0 && dispatch(setFilteredTableContents({ header, data: filteredData }))
      } else {
        console.log("jdk")
        let filteredData = data?.filter(e => {
          return selectedColumn?.find(el => el.value === e[el.id])
        })
        filteredData?.length > 0 && dispatch(setFilteredTableContents({ header, data: filteredData }))
      }
    }
  }, [selectedColumn])

  const onColumnValueChange = value => {
    const filteredColumnNames = header?.filter(e => e.title.toLowerCase().includes(value.toLowerCase()))
    if (value.length > 0 && filteredColumnNames?.length > 0) {
      setSuggestions(filteredColumnNames?.filter(name => !selectedColumn.find(e => e.id === name.id)))
    } else {
      setSuggestions([])
    }
  }

  const onRowValueChange = (value, id) => {
    const filteredRowNames = data?.filter(e => e[id].toLowerCase().includes(value.toLowerCase()))
    if (filteredRowNames.length > 0) {
      const filteredRowNamesIds = filteredRowNames.map(e => e[id])
      const filteredRowNamesSansDuplicates = filteredRowNames.filter(
        (name, index) => !filteredRowNamesIds.includes(name[id], index + 1)
      )
      setSuggestions(filteredRowNamesSansDuplicates)
    }
  }

  const onSuggestionClick = item => {
    setActiveColumn(item.id)
    if (activeColumn.length > 0) {
      const selectedcolumnArray = [...selectedColumn]
      const activeColumnInEdit = selectedcolumnArray.find(e => e.id === activeColumn)
      activeColumnInEdit.value = item[activeColumnInEdit.id]
      setSelectedColumn(selectedcolumnArray)
      setActiveColumn({})
    } else {
      setSelectedColumn([...selectedColumn, { title: item.title, id: item.id }])
    }
    setSuggestions([])
  }

  const SuggestionsDropDown = () => {
    return (
      <div className="bg-white wp-80 pos-ab b--150 z-1000 flex-c white-container-br-10 min-h-150 max-h-200 overflow-y-scroll">
        <span className="f-16 lh-2.4 fw-500 p-10 bdr-buttom-primary-1 bdr-primary">Properties</span>
        {suggestions.map(item => (
          <span
            onClick={() => onSuggestionClick(item)}
            className=" pl-10 pr- pt-5 pb-5 f-14 lh-2.1 grey-hover cp"
          >
            {activeColumn?.length > 0 ? item[activeColumn] : item.title}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="titan-filter wp-100">
      <div
        onClick={() => {
          dispatch(setFilterDrawerExpand(true))
          dispatch(setNavDrawerExpand(false))
          dispatch(setComplianceDrawerExpand(false))
        }}
        className="cp flex-r flex-r-ac mr-30"
      >
        <p className="fc-tertiary f-14 fw-500 pr-10">Filter</p>
        <FilterSettingIcon />
      </div>
      <div className="flex-c wp-100">
        {/* <div className='f-13 fw-500 fc-quaternary'>Search</div> */}
        <div className="filter-search flex-r-ac  ">
          <FilterSearchColumnInput
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            onRowValueChange={onRowValueChange}
            onColumnValueChange={onColumnValueChange}
            setSuggestions={setSuggestions}
            setTableContentsToFilter={setTableContentsToFilter}
          />
          <span className="filter-search-icon">
            <FilterSearchIcon />
          </span>
        </div>
        {suggestions.length > 0 && <SuggestionsDropDown />}
      </div>
    </div>
  )
}

export default FilterSearch
