function submitForm() {
    const s_driver_id = document.getElementById('s_driver_id').value;
    const s_driver_img_path = document.getElementById('s_driver_img_path').value;
    const s_license_img_path = document.getElementById('s_license_img_path').value;
    const s_entity_name = document.getElementById('s_entity_name').value;
    const s_driver_name = document.getElementById('s_driver_name').value;
    const i_mobile_no = document.getElementById('i_mobile_no').value;
    const s_driver_address = document.getElementById('s_driver_address').value;
    const s_license_no = document.getElementById('s_license_no').value;
    const s_driver_city = document.getElementById('s_driver_city').value;
    const i_driver_pincode = document.getElementById('i_driver_pincode').value;
    const license_validity_date = document.getElementById('license_validity_date').value;
    const s_smart_card_no = document.getElementById('s_smart_card_no').value;
    const s_state_name = document.getElementById('s_state_name').value;
    const s_country_name = document.getElementById('s_country_name').value;
    const s_hazard_certificate = document.getElementById('s_hazard_certificate').value;
    const hazard_validity_date = document.getElementById('hazard_validity_date').value;
    const medical_test_date = document.getElementById('medical_test_date').value;
    const product_training_date = document.getElementById('product_training_date').value;
    const driver_active_status = document.getElementById('driver_active_status').value;
    const s_remarks = document.getElementById('s_remarks').value;
    const ddt_expiry_date = document.getElementById('ddt_expiry_date').value;
    const cab_validity_date = document.getElementById('cab_validity_date').value;
    const s_license_verification_covid = document.getElementById('s_license_verification_covid').value;


    if (!s_entity_name || !s_driver_id || !s_driver_name || !i_mobile_no || !s_state_name || !s_country_name || !i_driver_pincode || !s_driver_city) {
        alert("Mandatory fields cannot be empty!");
        return;
    }

    const formData = {
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
    };

    
    fetch('http://65.2.151.41:1410/api/v0/addDriver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
    });
}
