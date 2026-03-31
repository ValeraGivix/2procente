// script.js

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Copy to Clipboard Functionality --- */
    const codeBoxes = document.querySelectorAll('.code-box');
    const copyBtns = document.querySelectorAll('.copy-btn, #header-copy-btn');
    const toast = document.getElementById('toast');
    let toastTimeout;

    const copyToClipboard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Highlight the code box visually
            codeBoxes.forEach(box => {
                box.classList.add('highlight');
                setTimeout(() => box.classList.remove('highlight'), 300);
            });

            // Show Toast Notification
            toast.classList.add('show');
            
            // Clear previous timeout if exists
            if (toastTimeout) clearTimeout(toastTimeout);
            
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Не удалось скопировать код автоматически. Пожалуйста, скопируйте его вручную: ' + textToCopy);
        }
    };

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Get text from data attribute if exists, otherwise fallback
            const text = btn.getAttribute('data-clipboard-text') || '1014620001450';
            const lang = btn.getAttribute('data-lang') || 'ro';
            
            const toastMsg = document.getElementById('toast-msg');
            if (toastMsg) {
                toastMsg.innerText = lang === 'ru' ? 'Код IDNO скопирован!' : 'Codul IDNO a fost copiat!';
            }
            
            copyToClipboard(text);
        });
    });


    /* --- 2. Instruction Tabs (Online/Offline) --- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to current button
            btn.classList.add('active');

            // Find corresponding pane and add active class
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(`tab-${targetId}`).classList.add('active');
        });
    });


    /* --- 3. FAQ Accordion --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionBody = header.nextElementSibling;
            
            // Check if current is active
            const isActive = accordionItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-body').style.maxHeight = null;
            });

            // If not active before, open it
            if (!isActive) {
                accordionItem.classList.add('active');
                accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            }
        });
    });

    /* --- 4. Sticky Header effects on scroll --- */
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0';
        }
    });
});
