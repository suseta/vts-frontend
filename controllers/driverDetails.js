const { getClient } = require('../db/connect')

var client

const index = async (req, res) => {
  res.status(200).json({ message: 'I am in index' })
}

const addDriver = async (req, res) => {
  const {
    s_driver_id,
    s_driver_img_path,
    s_license_img_path,
    s_entity_name,
    s_driver_name,
    i_mobile_no,
    s_driver_address,
    s_license_no,
    s_driver_city,
    i_driver_pincode,
    license_validity_date,
    s_smart_card_no,
    s_state_name,
    s_country_name,
    s_hazard_certificate,
    hazard_validity_date,
    medical_test_date,
    product_training_date,
    driver_active_status,
    s_remarks,
    ddt_expiry_date,
    cab_validity_date,
    s_license_verification_covid
  } = req.body

  if (!s_driver_id || !s_driver_name) {
    return res.status(400).json({
      error:
        's_driver_id and s_driver_name are required in the body parameters.'
    })
  }

  try {
    const dataToInsert = {
      s_driver_id,
      s_driver_img_path,
      s_license_img_path,
      s_entity_name,
      s_driver_name,
      i_mobile_no,
      s_driver_address,
      s_license_no,
      s_driver_city,
      i_driver_pincode,
      license_validity_date,
      s_smart_card_no,
      s_state_name,
      s_country_name,
      s_hazard_certificate,
      hazard_validity_date,
      medical_test_date,
      product_training_date,
      driver_active_status,
      s_remarks,
      ddt_expiry_date,
      cab_validity_date,
      s_license_verification_covid
    }

    const query = {
      text: `
                INSERT INTO driver_details (
                    s_driver_id, 
                    s_driver_img_path, 
                    s_license_img_path, 
                    s_entity_name, 
                    s_driver_name, 
                    i_mobile_no, 
                    s_driver_address, 
                    s_license_no, 
                    s_driver_city, 
                    i_driver_pincode, 
                    license_validity_date, 
                    s_smart_card_no, 
                    s_state_name, 
                    s_country_name, 
                    s_hazard_certificate, 
                    hazard_validity_date, 
                    medical_test_date, 
                    product_training_date, 
                    driver_active_status, 
                    s_remarks, 
                    ddt_expiry_date, 
                    cab_validity_date, 
                    s_license_verification_covid
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
                RETURNING *;
            `,
      values: [
        dataToInsert.s_driver_id,
        dataToInsert.s_driver_img_path,
        dataToInsert.s_license_img_path,
        dataToInsert.s_entity_name,
        dataToInsert.s_driver_name,
        dataToInsert.i_mobile_no,
        dataToInsert.s_driver_address,
        dataToInsert.s_license_no,
        dataToInsert.s_driver_city,
        dataToInsert.i_driver_pincode,
        dataToInsert.license_validity_date,
        dataToInsert.s_smart_card_no,
        dataToInsert.s_state_name,
        dataToInsert.s_country_name,
        dataToInsert.s_hazard_certificate,
        dataToInsert.hazard_validity_date,
        dataToInsert.medical_test_date,
        dataToInsert.product_training_date,
        dataToInsert.driver_active_status,
        dataToInsert.s_remarks,
        dataToInsert.ddt_expiry_date,
        dataToInsert.cab_validity_date,
        dataToInsert.s_license_verification_covid
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      console.log('Data inserted successfully:', result.rows[0])
      res.status(200).json({
        message: 'Driver data stored successfully',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

module.exports = {
  index,
  addDriver
}
