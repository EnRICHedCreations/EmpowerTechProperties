// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form values
    const formData = {
        id: Date.now(),
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        propertyAddress: document.getElementById('propertyAddress').value.trim(),
        propertyType: document.getElementById('propertyType').value,
        propertyCondition: document.getElementById('propertyCondition').value,
        timeline: document.getElementById('timeline').value,
        additionalInfo: document.getElementById('additionalInfo').value.trim(),
        status: 'new',
        dateSubmitted: new Date().toISOString()
    };

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
        !formData.propertyAddress || !formData.propertyType || !formData.propertyCondition || !formData.timeline) {
        showErrorMessage();
        return;
    }

    try {
        // Disable submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'SUBMITTING...';

        // Load existing leads
        const existingLeads = await CloudStorage.loadData('SellerLeads', []);

        // Add new lead
        existingLeads.push(formData);

        // Save to Firestore
        await CloudStorage.saveData('SellerLeads', existingLeads);

        // Show success message
        showSuccessMessage();

        // Reset form
        document.getElementById('contactForm').reset();

        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'SUBMIT & GET OFFER';

    } catch (error) {
        console.error('Error submitting form:', error);
        showErrorMessage();

        // Re-enable submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'SUBMIT & GET OFFER';
    }
});

function showSuccessMessage() {
    const successDiv = document.getElementById('successMessage');
    const errorDiv = document.getElementById('errorMessage');

    errorDiv.classList.add('hidden');
    successDiv.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.classList.add('hidden');
    }, 5000);
}

function showErrorMessage() {
    const successDiv = document.getElementById('successMessage');
    const errorDiv = document.getElementById('errorMessage');

    successDiv.classList.add('hidden');
    errorDiv.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}
