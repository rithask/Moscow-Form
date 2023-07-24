document.addEventListener('DOMContentLoaded', function() {
	setTheme();

	const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	const goBtn = document.getElementById('go-btn');
	const homieForm = document.getElementById('homie-form');

    darkModeMediaQuery.addEventListener('change', setTheme);
	goBtn.addEventListener('click', showForm);
	homieForm.addEventListener('submit', submitResponse);
});

function setTheme() {
	const isDarkMode = isDarkModePreferred();

	const goBtn = document.getElementById('go-btn');
	const formDiv = document.getElementById('form-div');
	const formName = document.getElementById('form-name')
	const formSelection = document.getElementById('form-selection');

	const btns = [goBtn, formDiv];
	const labels = [formName, formSelection];

	if (!isDarkMode) {
		btns.forEach(btn => {
			btn.classList.add('bg-white', 'text-black');
			btn.classList.remove('bg-black', 'text-white');
		});

		labels.forEach(label => {
			label.classList.remove('text-gray-300');
			label.classList.add('text-gray-700');
		});
	} else {
		btns.forEach(btn => {
			btn.classList.add('bg-black', 'text-white');
			btn.classList.remove('bg-white', 'text-black');
		});

		labels.forEach(label => {
			label.classList.add('text-gray-300');
			label.classList.remove('text-gray-700');
		});
	}
}

function isDarkModePreferred() {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return true;
	}
	return false;
}

function showForm() {
	const formView = document.querySelector('#form-view');
	document.querySelector('#main-view').style.display = 'none';
	formView.style.display = 'block';
	setTimeout(() => {
        formView.classList.add('form-popup');
    }, 10); // Adding a slight delay to ensure display:block is applied before the animation starts
}

function submitResponse(e) {
	e.preventDefault();

	const formData = new FormData(e.target);
	const name = formData.get('name');
	const selection = formData.get('homie');

	if (name.length === 0 || selection === null) {
		alert('Please fill out all fields!');
		return;
	}

	const data = `"${name}" says "${selection}!"`

	const btn = document.getElementById('submit-btn');
	btn.disabled = true;

	fetch('https://ntfy.sh/moscow', {
		method: 'POST',
		body: data,
	})
	.then(response => response.json()) // Parse the response as JSON
	.then(data => {
		// Process the data received from the server
		console.log(data);
	})
		.catch(error => {
		// Handle any errors that occurred during the request
		console.error('Error:', error);
	});
}