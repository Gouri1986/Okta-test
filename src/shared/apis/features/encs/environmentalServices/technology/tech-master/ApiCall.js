import { useState, useEffect } from "react"
import axios from 'axios'
import handleError from '../../../../../components/alerts/Error'
import handleSuccess from '../../../../../components/alerts/SuccessWithout'

export let data
const token = localStorage.getItem('token')

//--------------------------------------API Get Request---------------------------------------------------------------------------

    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-tech-category-master`,
        {
            headers: {
                "Content-Type": "application/json",
                "access-token": `${token}`
            }
        }
    )
        .then((response) => {
            // Handle success.
            console.log("Connection established.Data is fetching!")
            //  setIsLoaded(true)
            data = response.data.data
            console.log("🚀 ~ file: ApiCall.js ~ line 24 ~ .then ~ response.data.data", response.data.data)
            // setPending(false)
        })
        .catch((error) => {
            console.error(error)
        })
//--------------------------------------- API Post request-----------------------------------------------------------------
export const postRequest = (isctechcategorydescription, isctechcategoryname, isctechcategorytags) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-tech-category-master`, {
        iscTechCategoryDescription: isctechcategorydescription,
        iscTechCategoryName: isctechcategoryname,
        iscTechCategoryTags: isctechcategorytags,
        ui: true
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
            console.log("Respone = ", response)
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
                data = response.data.data
                handleSuccess(Success_msg, Notification_msg)
            }
        })
        .catch((error) => {
            // Handle error.
            console.log("An error occurred:", error)
        })
}
