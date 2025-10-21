// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTcj33wVlL8D9H39b6swgTion0aC3Bxhw",
    authDomain: "empowertechproperties.firebaseapp.com",
    projectId: "empowertechproperties",
    storageBucket: "empowertechproperties.firebasestorage.app",
    messagingSenderId: "1085060316707",
    appId: "1:1085060316707:web:2603941d493632c5237b96",
    measurementId: "G-320F692XYH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Cloud Storage Abstraction
const CloudStorage = {
    // Save data to Firestore
    async saveData(collection, data) {
        try {
            await db.collection(collection).doc('data').set({ items: data });
            console.log(`${collection} saved successfully`);
            return true;
        } catch (error) {
            console.error(`Error saving ${collection}:`, error);
            throw error;
        }
    },

    // Load data from Firestore
    async loadData(collection, defaultValue = []) {
        try {
            const doc = await db.collection(collection).doc('data').get();
            if (doc.exists) {
                return doc.data().items || defaultValue;
            }
            return defaultValue;
        } catch (error) {
            console.error(`Error loading ${collection}:`, error);
            return defaultValue;
        }
    },

    // Real-time listener
    onDataChange(collection, callback) {
        return db.collection(collection).doc('data').onSnapshot(doc => {
            if (doc.exists) {
                callback(doc.data().items || []);
            }
        }, error => {
            console.error(`Error listening to ${collection}:`, error);
        });
    }
};

// Empower Tech Properties Utility Functions
const AXTUtils = {
    showSuccessMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-lg shadow-2xl z-50 font-bold border-2 border-green-800';
        alertDiv.innerHTML = `
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.transition = 'opacity 0.5s';
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 500);
        }, 3000);
    },

    showErrorMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-lg shadow-2xl z-50 font-bold border-2 border-red-800';
        alertDiv.innerHTML = `
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.transition = 'opacity 0.5s';
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 500);
        }, 4000);
    }
};
