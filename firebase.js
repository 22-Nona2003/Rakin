import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { getDatabase, ref, get, set, onValue } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js';

const firebaseConfig = {
    apiKey: 'AIzaSyBxoeVy7ydkkVAFy77zmglKJOlCShqhoRA',
    authDomain: 'rakin-7670d.firebaseapp.com',
    databaseURL: 'https://rakin-7670d-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'rakin-7670d',
    storageBucket: 'rakin-7670d.firebasestorage.app',
    messagingSenderId: '162779865385',
    appId: '1:162779865385:web:8f1727d82f00edce471738',
    measurementId: 'G-J8ZYX8NCC9'
};

const SYNC_PREFIX = 'rakeen_';
const LOCAL_BACKUP_KEY = 'rakeen_local_backup_before_account_sync';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

let activeUser = null;
let applyingCloudData = false;
let syncTimer = null;
let unsubscribeData = null;
let pendingSync = Promise.resolve();
let accountActionInProgress = false;

function getLocalAppData() {
    const data = {};
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key?.startsWith(SYNC_PREFIX)) data[key] = localStorage.getItem(key);
    }
    return data;
}

function applyCloudData(data) {
    applyingCloudData = true;
    try {
        const cloudData = data && typeof data === 'object' ? data : {};
        for (const key of Object.keys(localStorage)) {
            if (key.startsWith(SYNC_PREFIX) && !(key in cloudData)) localStorage.removeItem(key);
        }
        Object.entries(cloudData).forEach(([key, value]) => {
            if (key.startsWith(SYNC_PREFIX) && typeof value === 'string' && localStorage.getItem(key) !== value) {
                localStorage.setItem(key, value);
            }
        });
    } finally {
        applyingCloudData = false;
    }
}

async function saveLocalDataToCloud() {
    if (!activeUser || applyingCloudData) return;
    const userRef = ref(database, `users/${activeUser.uid}/appData`);
    const data = getLocalAppData();
    pendingSync = pendingSync.then(() => set(userRef, data));
    return pendingSync;
}

function scheduleSync() {
    if (!activeUser || applyingCloudData) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
        saveLocalDataToCloud().catch((error) => {
            console.error('تعذرت مزامنة بيانات ركين:', error);
            showSyncMessage('تعذرت المزامنة. تحققي من اتصال الإنترنت وقواعد قاعدة البيانات.');
        });
    }, 500);
}

function showSyncMessage(message) {
    const status = document.getElementById('rakin-auth-status');
    if (!status) return;
    status.textContent = message;
    status.hidden = false;
    setTimeout(() => { status.hidden = true; }, 6500);
}

async function handleAccountAction(button) {
    if (!button || accountActionInProgress) return;
    accountActionInProgress = true;
    button.disabled = true;
    try {
        if (auth.currentUser) {
            await saveLocalDataToCloud();
            await signOut(auth);
        } else {
            await signInWithPopup(auth, provider);
        }
    } catch (error) {
        console.error('تعذر إكمال تسجيل الدخول:', error);
        const message = error.code === 'auth/unauthorized-domain'
            ? 'أضف نطاق الموقع في Firebase: Authentication ثم Settings ثم Authorized domains.'
            : error.code === 'auth/operation-not-allowed'
                ? 'فعّلي تسجيل الدخول عبر Google من Firebase Authentication.'
                : 'ما قدرنا نكمل العملية. تأكدي من الإنترنت وإعدادات Firebase.';
        showSyncMessage(message);
    } finally {
        button.disabled = false;
        accountActionInProgress = false;
    }
}

function makeAuthControl() {
    if (document.getElementById('rakin-account-control')) return;
    const wrapper = document.createElement('div');
    wrapper.id = 'rakin-account-control';
    wrapper.innerHTML = `
        <button id="rakin-account-button" type="button" aria-live="polite">
            <span class="rakin-account-avatar" aria-hidden="true">ر</span>
            <span id="rakin-account-label">تسجيل الدخول بحساب Google</span>
        </button>
        <div id="rakin-auth-status" role="status" hidden></div>`;
    document.body.appendChild(wrapper);

    document.getElementById('rakin-account-button').addEventListener('click', (event) => handleAccountAction(event.currentTarget));

    const topAccount = document.querySelector('.user-profile-badge');
    if (topAccount) {
        document.body.classList.add('has-top-account');
        topAccount.setAttribute('role', 'button');
        topAccount.setAttribute('tabindex', '0');
        topAccount.setAttribute('aria-label', 'تسجيل الدخول أو الخروج من حساب ركين');
        topAccount.addEventListener('click', () => handleAccountAction(document.getElementById('rakin-account-button')));
        topAccount.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleAccountAction(document.getElementById('rakin-account-button'));
            }
        });
    }

    const sidebarAccounts = document.querySelectorAll('.user-card');
    if (sidebarAccounts.length) {
        document.body.classList.add('has-sidebar-account');
        sidebarAccounts.forEach((account) => {
            account.setAttribute('role', 'button');
            account.setAttribute('tabindex', '0');
            account.setAttribute('aria-label', 'تسجيل الدخول أو الخروج من حساب ركين');
            account.addEventListener('click', () => handleAccountAction(document.getElementById('rakin-account-button')));
            account.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleAccountAction(document.getElementById('rakin-account-button'));
                }
            });
        });
    }
}

function updateAccountUI(user) {
    const label = document.getElementById('rakin-account-label');
    const avatar = document.querySelector('.rakin-account-avatar');
    const button = document.getElementById('rakin-account-button');
    if (label) label.textContent = user ? `${user.displayName || user.email || 'حسابي'} · تسجيل الخروج` : 'تسجيل الدخول بحساب Google';
    if (avatar) {
        if (user?.photoURL) {
            avatar.innerHTML = `<img src="${user.photoURL}" alt="">`;
        } else {
            avatar.textContent = user ? (user.displayName || user.email || 'ر').trim().charAt(0) : 'ر';
        }
    }
    if (button) button.title = user ? `تم تسجيل الدخول باسم ${user.displayName || user.email}` : 'مزامنة بياناتك عبر حساب Google';
    document.querySelectorAll('.user-name, .user-title').forEach((element) => {
        element.textContent = user?.displayName || (user ? 'حسابي' : 'زائر');
    });
    document.querySelectorAll('.user-card').forEach((element) => {
        const label = user ? `تسجيل الخروج من ${user.displayName || user.email || 'حسابي'}` : 'تسجيل الدخول بحساب Google ومزامنة بياناتك';
        element.title = label;
        element.setAttribute('aria-label', label);
    });
}

function initializeAccountSync() {
    makeAuthControl();
    onAuthStateChanged(auth, async (user) => {
        activeUser = user;
        updateAccountUI(user);
        if (unsubscribeData) {
            unsubscribeData();
            unsubscribeData = null;
        }
        if (!user) return;

        const userRef = ref(database, `users/${user.uid}/appData`);
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(getLocalAppData()));
                applyCloudData(snapshot.val());
                unsubscribeData = onValue(userRef, (cloudSnapshot) => {
                    if (cloudSnapshot.exists()) applyCloudData(cloudSnapshot.val());
                });
                showSyncMessage('تم تسجيل الدخول ومزامنة بياناتك.');
            } else {
                await saveLocalDataToCloud();
                unsubscribeData = onValue(userRef, (cloudSnapshot) => {
                    if (cloudSnapshot.exists()) applyCloudData(cloudSnapshot.val());
                });
                showSyncMessage('تم تسجيل الدخول وحفظ بيانات هذا الجهاز في حسابك.');
            }
        } catch (error) {
            console.error('تعذرت قراءة بيانات ركين من Firebase:', error);
            showSyncMessage('تم تسجيل الدخول، لكن المزامنة تحتاج ضبط قواعد قاعدة البيانات.');
        }
    });
}

const originalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function (key, value) {
    originalSetItem.call(this, key, value);
    if (this === localStorage && String(key).startsWith(SYNC_PREFIX)) scheduleSync();
};

const originalRemoveItem = Storage.prototype.removeItem;
Storage.prototype.removeItem = function (key) {
    originalRemoveItem.call(this, key);
    if (this === localStorage && String(key).startsWith(SYNC_PREFIX)) scheduleSync();
};

window.addEventListener('storage', (event) => {
    if (event.storageArea === localStorage && event.key?.startsWith(SYNC_PREFIX)) scheduleSync();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccountSync, { once: true });
} else {
    initializeAccountSync();
}
