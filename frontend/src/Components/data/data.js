import React, { useState } from 'react'
import './data.css'

import { ubuntuIP } from '../../Components/constantVariable'
import { useNavigate } from 'react-router-dom'

let JsonToExcelForm = () => {
    const navigate = useNavigate();
    let initialState = {
        dataDate: ''
    }

    let [dateForInfo, setDateForInfo] = useState({
        dataDate: ''
    })

    let resetForm = () => {
        setDateForInfo(initialState)
    }

    let refreshPage = () => {
        window.location.reload()
    }

    let handleChange = e => {
        let { name, value } = e.target
        setDateForInfo(prevData => ({ ...prevData, [name]: value }))
    }

    // Define a function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`${ubuntuIP}/api/v0/generateExcel?dataDate=${dateForInfo.dataDate}`)
            .then(response => {
                // Check if response is successful
                if (!response.ok) {
                    // throw new Error('Network response was not ok');
                    alert("Data for the Provided Date is not available");
                    return;
                }
                // Return the response body as blob
                return response.blob();
            })
            .then(blob => {
                // If blob is empty, log error and return
                if (!blob) {
                    console.error('Empty response received');
                    return;
                }
                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(new Blob([blob]));
                // Create a link element
                const link = document.createElement('a');
                link.href = url;
                // Specify the file name for the download
                link.setAttribute('download', `data_${dateForInfo.dataDate}.xlsx`);
                // Append the link to the body
                document.body.appendChild(link);
                // Trigger the download
                link.click();
                // Clean up: remove the link and revoke the URL
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
    


    return (
        <div>
            <div className='wrapper'>
                <div className='container'>
                    <h2> Fetch DATA In Excel Format</h2>
                    <div className='DataJsonToExcel'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='dataDate'>Fetch Data for the Date:</label>
                                <input
                                    type='date'
                                    id='dataDate'
                                    name='dataDate'
                                    value={dateForInfo.dataDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div class='form-buttons'>
                                <button type='submit'>Save</button>
                                <button
                                    type='button'
                                    className='cancel-button'
                                    onClick={() => {
                                        resetForm()
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    className='refresh-button'
                                    onClick={refreshPage}
                                >
                                    Refresh
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JsonToExcelForm
