import React, { useState, useEffect } from 'react';
import './clientServiceDataLog.css';
import { ubuntuIP } from '../../Components/constantVariable';

const ClientServiceDataLog = () => {
    const initialState = {
        s_entity_id: '',
        s_entity_id_and_name: '',
    };

    const [clientServiceDataLogRegDetails, setclientServiceDataLogRegDetails] = useState(initialState);
    const [entityNames, setEntityNames] = useState({ data: [] });
    const [tableData, setTableData] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        fetch(`${ubuntuIP}/api/v0/getAllEntityNameList`)
            .then(response => response.json())
            .then(data => {
                setEntityNames({ data });
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, []);

    const handleNameChange = (e, s_entity_id1) => {
        const { name, value } = e.target;
        if (name === 's_entity_id_and_name') {
            setclientServiceDataLogRegDetails(prevData => ({
                ...prevData,
                s_entity_id_and_name: value,
                s_entity_id: s_entity_id1,
            }));
            setTableData(null);
            setFormSubmitted(false); // Reset form submission status
        }
    };

    const resetForm = () => {
        setclientServiceDataLogRegDetails(initialState);
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFormSubmitted(true);
        const queryString = `?s_entity_id=${clientServiceDataLogRegDetails.s_entity_id}`;
        fetch(`${ubuntuIP}/api/v0/getClientDeviceDetails${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setTableData(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error! Please try again.');
            });
    };

    return (
        <div>
            <div className='wrapper'>
                <div className='container'>
                    <h2>Client Service Data Log</h2>
                    <div className='clientServiceDataLogRegistrationForm'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label
                                    htmlFor='s_entity_id_and_name'
                                    className={`required-label ${clientServiceDataLogRegDetails.s_entity_id_and_name ? 'required' : ''}`}
                                >
                                    Entity:
                                </label>
                                <select
                                    className='form-select'
                                    id='s_entity_id_and_name'
                                    name='s_entity_id_and_name'
                                    required
                                    value={clientServiceDataLogRegDetails.s_entity_id_and_name}
                                    onChange={e => {
                                        const selectedEntity = entityNames.data.data.find(
                                            entity => entity.s_entity_name === e.target.value
                                        );
                                        handleNameChange(e, selectedEntity?.s_entity_id);
                                    }}
                                >
                                    <option value=''>Select</option>
                                    {entityNames.data &&
                                        Array.isArray(entityNames.data.data) ? (
                                        entityNames.data.data.map(entity => (
                                            <option
                                                key={entity.s_entity_id}
                                                value={entity.s_entity_name}
                                            >
                                                {entity.s_entity_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value=''>
                                            {entityNames.data && entityNames.data.message
                                                ? entityNames.data.message
                                                : 'No entities available'}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className='form-buttons'>
                                <button type='submit'>Save</button>
                                <button
                                    type='button'
                                    className='cancel-button'
                                    onClick={() => {
                                        resetForm();
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
                    {formSubmitted && (
                        <div className='table-container'>
                            <div className='table-wrapper'>
                                {tableData !== null ? (
                                    Array.isArray(tableData.data) && tableData.data.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Packet Header</th>
                                                    <th>Firmware Version</th>
                                                    <th>Packet Type</th>
                                                    <th>Packet Status</th>
                                                    <th>IMEI Number</th>
                                                    <th>Asset ID</th>
                                                    <th>GPS Status</th>
                                                    <th>GPS Date</th>
                                                    <th>GPS Time</th>
                                                    <th>Latitude</th>
                                                    <th>Latitude Direction</th>
                                                    <th>Longitude</th>
                                                    <th>Longitude Direction</th>
                                                    <th>Altitude</th>
                                                    <th>Speed</th>
                                                    <th>Ground Course</th>
                                                    <th>Satellite Count</th>
                                                    <th>HDOP</th>
                                                    <th>PDOP</th>
                                                    <th>Network Operator</th>
                                                    <th>Network Type</th>
                                                    <th>Signal Power</th>
                                                    <th>Main Power</th>
                                                    <th>Internal Battery Voltage</th>
                                                    <th>Ignition Input</th>
                                                    <th>Buzzer Output</th>
                                                    <th>Dynamic Field 1</th>
                                                    <th>Bluetooth Field</th>
                                                    <th>UART Field</th>
                                                    <th>External ADC Value</th>
                                                    <th>Device State</th>
                                                    <th>Odometer</th>
                                                    <th>Packet Count</th>
                                                    <th>CRC</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.data.flat().map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.s_pkt_hdr}</td>
                                                        <td>{item.s_frmwr_ver}</td>
                                                        <td>{item.s_pkt_typ}</td>
                                                        <td>{item.s_pkt_status}</td>
                                                        <td>{item.s_imei_no}</td>
                                                        <td>{item.s_asset_id}</td>
                                                        <td>{item.i_gps_status}</td>
                                                        <td>{item.gps_dt}</td>
                                                        <td>{item.gps_tm}</td>
                                                        <td>{item.d_lat}</td>
                                                        <td>{item.s_lat_dir}</td>
                                                        <td>{item.d_long}</td>
                                                        <td>{item.s_long_dir}</td>
                                                        <td>{item.d_alt}</td>
                                                        <td>{item.d_spd}</td>
                                                        <td>{item.s_grd_crs}</td>
                                                        <td>{item.i_sat_cnt}</td>
                                                        <td>{item.d_hdop}</td>
                                                        <td>{item.d_pdop}</td>
                                                        <td>{item.s_ntw_op}</td>
                                                        <td>{item.s_ntw_typ}</td>
                                                        <td>{item.d_sgnl_pwr}</td>
                                                        <td>{item.d_mn_pwr}</td>
                                                        <td>{item.d_int_bat_volt}</td>
                                                        <td>{item.s_ign_ip}</td>
                                                        <td>{item.s_buz_op}</td>
                                                        <td>{item.s_dyn_f1}</td>
                                                        <td>{item.s_bt_f}</td>
                                                        <td>{item.s_u_art}</td>
                                                        <td>{item.s_ext_adc_val}</td>
                                                        <td>{item.s_dvc_state}</td>
                                                        <td>{item.s_odometer}</td>
                                                        <td>{item.s_pkt_cnt}</td>
                                                        <td>{item.s_crc}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Loading...</p>
                                    )
                                ) : (
                                    <p>No data to display</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientServiceDataLog;
