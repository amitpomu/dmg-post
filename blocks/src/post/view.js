/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

document
	.querySelector("#dmg-post")
	?.addEventListener("submit", (e) => {
		e.preventDefault();
		const form = e.target;

		// Only select inputs that have the "required" attribute
		const requiredFields = form.querySelectorAll("input[required]");
		let firstErrorField = null;

		const isValidEmail = (email) => {
			const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return regex.test(email);
		};

		requiredFields.forEach((field) => {
			const errorElement = document.getElementById(`${field.id}-error`);
			const elementValue = field.value.trim();
			if (!field.value.trim()) {
				errorElement.textContent = `${field.name} is required.`;
				field.setAttribute("aria-invalid", "true");
				if (!firstErrorField) firstErrorField = field; // set focus
			} else if (field.name === "email" && !isValidEmail(field.value)) {
				errorElement.textContent = `${field.name} is not valid.`;
				field.setAttribute("aria-invalid", "true");
				if (!firstErrorField) firstErrorField = field; // set focus
			} else {
				errorElement.textContent = "";
				field.setAttribute("aria-invalid", "false");
			}
		});

		// Move focus to first invalid field if any
		if (firstErrorField) {
			firstErrorField.focus();
			return;
		} else {
			const safeName = form.querySelector("#safename")?.value.trim() || "";
			const firstName = form.querySelector("#firstname")?.value.trim() || "";
			const surName = form.querySelector("#surname")?.value.trim() || "";
			const email = form.querySelector("#email")?.value.trim() || "";
			const messageElement = form.parentElement.querySelector(
				"#dmg-info-message",
			);
			messageElement.textContent = "Submitting...";
            messageElement.setAttribute('data-status', 'info');

			console.log({ safeName, firstName, surname, email });
            submitForm({ safeName, firstName, surName, email });
		}
	});
