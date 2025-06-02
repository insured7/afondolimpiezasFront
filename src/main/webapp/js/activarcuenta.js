document.addEventListener('DOMContentLoaded', () => {
    const mensajeDiv = document.getElementById('mensaje');
    const loadingDiv = document.getElementById('loading');
    const token = document.body.dataset.token;

    function showMessage(texto, tipo) {
        mensajeDiv.className = `alert alert-${tipo}`;
        mensajeDiv.textContent = texto;
        mensajeDiv.classList.remove('d-none');
    }

    function hideLoading() {
        loadingDiv.classList.add('d-none');
    }

    function activateAccount(token) {
        fetch(`http://localhost:8080/auth/activar-cuenta?token=${encodeURIComponent(token)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            showMessage(data.mensaje, 'success');
            hideLoading();
            setTimeout(() => {
                window.location.href = data.redirect || 'login.jsp';
            }, 3000);
        })
        .catch(error => {
            const errorMsg = error.mensaje || 'Error al activar la cuenta';
            showMessage(errorMsg, 'danger');
            hideLoading();

            if (error.tokenExpirado) {
                const resendBtn = document.createElement('button');
                resendBtn.className = 'btn btn-primary mt-3';
                resendBtn.textContent = 'Reenviar email de activación';
                resendBtn.onclick = () => resendActivationEmail(token);
                mensajeDiv.appendChild(resendBtn);
            }
        });
    }

    // Iniciar proceso si token existe
    if (token) {
        activateAccount(token);
    } else {
        showMessage('Token no proporcionado', 'danger');
        hideLoading();
    }
});
