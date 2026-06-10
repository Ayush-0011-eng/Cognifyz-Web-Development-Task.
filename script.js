// ==========================================
// भाग १: CLIENT-SIDE ROUTING (पेज बदलणे)
// ==========================================
function navigate(pageId) {
    // आधी सर्व पेजेस लपवून टाका (active क्लास काढा)
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.remove('active'));

    // युझरने क्लिक केलेले पेज शोधा आणि त्याला दाखवा (active क्लास द्या)
    const activePage = document.getElementById(`page-${pageId}`);
    if (activePage) {
        activePage.classList.add('active');
    }
}

// ==========================================
// भाग २: COMPLEX FORM VALIDATION (पासवर्ड चेक)
// ==========================================
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let score = 0;

        // कडक नियम (Validation Rules)
        if (val.length >= 8) score++;          // कमीत कमी ८ अक्षरे
        if (/[A-Z]/.test(val)) score++;         // एक तरी कॅपिटल अक्षर
        if (/[0-9]/.test(val)) score++;         // एक तरी नंबर
        if (/[^A-Za-z0-9]/.test(val)) score++; // एक तरी स्पेशल कॅरेक्टर (@,#,$)

        // स्कोअरनुसार मीटरचा रंग आणि रुंदी बदलणे
        if (val.length === 0) {
            strengthBar.style.width = '0%';
            strengthText.innerText = 'Password टाका...';
        } else if (score <= 1) {
            strengthBar.style.width = '25%';
            strengthBar.style.backgroundColor = '#ff4d4d'; // लाल
            strengthText.innerText = 'कमकुवत (Weak)';
        } else if (score <= 3) {
            strengthBar.style.width = '60%';
            strengthBar.style.backgroundColor = '#ffa500'; // नारंगी
            strengthText.innerText = 'मध्यम (Medium)';
        } else {
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = '#2ecc71'; // हिरवा
            strengthText.innerText = 'खूप मजबूत (Strong!)';
        }
    });
}

// ==========================================
// भाग ३: DYNAMIC DOM MANIPULATION (काम जोडणे/काढणे)
// ==========================================
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

if (addBtn && taskInput && taskList) {
    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text === '') return alert('काहीतरी टाईप करा!');

        // नवीन 'li' (List Item) तयार करा
        const li = document.createElement('li');
        
        // त्याच्या आत मजकूर आणि डिलीट बटन टाका
        li.innerHTML = `
            <span>${text}</span>
            <button class="del-btn">Delete</button>
        `;

        // डिलीट बटनवर क्लिक केल्यावर तो आयटम काढून टाकण्याचे लॉजिक
        li.querySelector('.del-btn').addEventListener('click', () => {
            li.remove();
        });

        // तयार झालेला आयटम मूळ लिस्टमध्ये जोडा
        taskList.appendChild(li);
        taskInput.value = ''; // इनपुट बॉक्स रिकामी करा
    });
}