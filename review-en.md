### Practice 1

**Security and Performance:**

- **`innerHTML` and XSS:** Using `innerHTML` with user input is unsafe because malicious scripts could be injected and executed. Instead, new DOM nodes should be created with `document.createElement()` and their content set with `textContent`. This ensures untrusted input is treated as plain text, not HTML.
- **Inefficient DOM Manipulation:** The DOM is updated directly inside a loop. This forces the browser to reflow and repaint multiple times, slowing down rendering. A better approach is to build all items in a `DocumentFragment` and append them in a single operation. This improves performance, especially with large datasets.
- **Event Listener Problems:** Adding one `addEventListener` per element inside a loop wastes memory and CPU. With hundreds of items, each will hold a reference to a listener. A more scalable solution is to attach a single listener to the parent `<ul>` and use `event delegation` (`event.target`) to identify which item was clicked.

**User Experience (UX):**

- **Blocking `alert()`:** Calling `alert()` interrupts the flow and freezes the UI until dismissed. Inline error or success messages placed near the relevant form field give a smoother experience and are more consistent with modern UX practices.

**Code Quality:**

- **Global Variables:** A global variable like `todoCount` pollutes the global scope. This makes the code harder to test and increases the risk of conflicts in larger apps. Encapsulation (modules, closures, or classes) would be safer.
- **Missing Type Checks:** DOM elements retrieved with `getElementById` should be validated. If the element doesn’t exist, trying to call methods on `null` will throw runtime errors.

---

### Practice 2

**Security:**

- **Unsafe `innerHTML`:** The code injects user input with `innerHTML`, exposing the app to XSS. Use `textContent` or sanitization libraries for safe rendering.
- **No Input Validation:** The form doesn’t validate length, emptiness, or characters. Without validation, malformed or malicious input can be submitted to the backend.

**Performance and Error Handling:**

- **Repeated DOM Updates:** Items are rendered one by one in the DOM, causing multiple layout recalculations. Instead, build a virtual structure (`DocumentFragment`) and insert it once. This reduces rendering overhead.
- **Weak Error Handling:** The code logs errors only to `console.error`. The user is left without feedback. Proper error messages should be displayed near the input field or in a notification area.

**Code Quality:**

- **Single Responsibility Principle Violation:** Input handling, DOM manipulation, and error management are mixed in one block. Separating them into smaller functions would make the code easier to test and maintain.
- **Missing Type Checking:** Elements like `taskInput` should be checked for existence before accessing `.value`. Without this, missing HTML elements will break the app.

---

### Practice 3

**Security and Performance:**

- **Unsafe `innerHTML`:** Using `innerHTML` to insert `newTodoText` is unsafe. If the text contains `<script>`, it could execute. The safer option is `document.createElement('li')` + `textContent`.
- **Inefficient Event Handling:** Each delete button has its own listener. With 1,000 tasks, you get 1,000 listeners in memory. Instead, attach one listener to the `<ul>` and detect the clicked item with `event.target`. This reduces memory usage and improves responsiveness.
- **Batch DOM Updates:** Instead of calling `appendChild` repeatedly, use a `DocumentFragment` to reduce reflows.

**UX and Validation:**

- **Bad UX with Alerts:** `alert()` for validation breaks the flow. Inline messages near the input field are friendlier and less disruptive.
- **Live Input Validation:** Preventing empty or whitespace-only tasks at the time of typing (via `input` event) gives faster feedback than validating only on submit.

**Code Quality and Maintainability:**

- **Global State:** Using a global `todoCount` makes testing and modularity difficult. A self-contained component or class should manage its own state.
- **Missing Type Validation:** DOM queries must be checked before using the elements.
- **Misuse of Event Delegation:** The current code applies listeners per element. Real event delegation should be at the parent `<ul>`.

---

### Practice 4

**Security:**

- **Plaintext Passwords:** Passwords are handled as plain text. They should be hashed/encrypted on the backend, but at least on the frontend you should ensure no accidental exposure (e.g., logging).
- **Weak Frontend Validation:** The password field doesn’t enforce minimum length, complexity, or special characters. Users can enter insecure passwords without warnings.

**Error Handling and UX:**

- **Generic Errors:** The UI always shows “Authentication failed.” Users need clearer feedback: _Invalid credentials_ (401), _Account locked_ (403), _Too many attempts_ (429), etc.
- **Missing `finally`:** The loading spinner should be stopped whether the request succeeds or fails. Without `finally`, the spinner may remain stuck.
- **Rate Limiting Feedback:** If a 429 is returned, the system should tell the user when they can retry.

**Performance and Race Conditions:**

- **Multiple Fast Clicks:** Rapid button presses trigger multiple parallel requests. This could cause race conditions and inconsistent UI state. Use `AbortController` to cancel previous requests, or debounce/throttle the button.

**Code Quality:**

- **Missing Type Checking:** DOM elements (`form`, `passwordInput`, etc.) should be validated for `null`.

---

### Practice 5

**Security:**

- **Unsafe DOM Insertion:** API responses are directly inserted into the DOM with `innerHTML`. If the API is compromised or returns unexpected data, the app is vulnerable to XSS. Always sanitize or use `textContent`.
- **No Data Validation:** The API response is assumed to be valid. Without format validation (e.g., checking required fields), broken or malicious responses can crash the app or inject unwanted content.

**Error Handling and Control Flow:**

- **Null/Undefined Checks Missing:** Values like `userData.name` are accessed without verifying they exist. This can throw runtime errors if the data is missing.
- **No Timeout Handling:** If the API hangs, the app waits indefinitely. A `Promise.race` with timeout logic should be used.
- **No AbortController:** Rapid repeated requests can overlap, leading to race conditions. Canceling old requests would avoid this.
- **Shallow Error Handling:** Only `response.ok` is checked. Other errors (400 invalid data, 401 unauthorized, 404 not found) aren’t handled, giving poor feedback to the user.

**Code Quality and Maintainability:**

- **Missing Type Checking:** DOM elements are accessed without verification.
- **SRP Violation:** The same function fetches data _and_ renders UI. This mixes responsibilities, making it harder to debug or test. Better: one function for fetching, another for rendering.

---

### Practice 6

**Security and Performance:**

- **`innerHTML` and XSS:** The `userComment` variable is directly injected into the DOM using `innerHTML`. This creates an XSS vulnerability if the comment contains malicious HTML or scripts. Safer approach: use `createElement('li')` and `textContent`.
- **Button Spamming:** The submit button can be clicked multiple times in quick succession, adding duplicates or empty comments. A debounce/throttle mechanism should be implemented to limit submission frequency.

**User Experience (UX) and Code Quality:**

- **Bad UX with `alert()`:** Using `alert()` for validation interrupts the user flow and feels outdated. Instead, inline error messages within the form provide better feedback.
- **Accessibility (A11y):** Missing `label` elements, ARIA attributes, and keyboard navigation support make the form inaccessible to screen readers and non-mouse users.
- **Type Checking:** DOM elements (`form`, `commentInput`, etc.) should be checked for `null` before being used.
- **Event Delegation:** Each comment element has its own event listener. This is inefficient and doesn’t work for dynamically added elements. Instead, attach one listener to the parent `<ul>` and use event delegation via `event.target`.

---

### Practice 7

**Security and Performance:**

- **XSS Risk with `innerHTML`:** API data is rendered directly with `innerHTML`, making the app vulnerable to XSS if the API response is manipulated. Always sanitize or use `textContent`.
- **Inefficient Rendering Loop:** The DOM is repeatedly cleared and rebuilt inside a loop. With large datasets, this kills performance. Better: build all nodes in a `DocumentFragment` and append once.
- **Inline Event Handlers:** Using `onclick` or `onchange` in HTML mixes logic with markup and is less flexible. Prefer `addEventListener`.

**State Management and Architecture:**

- **Global Scope Pollution:** Assigning `window.shoppingCart = shoppingCart` pollutes the global scope, increasing the risk of conflicts and making testing harder.
- **State Persistence:** Shopping cart data disappears on page reload. Using `localStorage` or `sessionStorage` ensures persistence across reloads.

**Error Handling and Validation:**

- **Null/Undefined Checks:** Values like `item.price` are used without checking for `null` or `undefined`. This can throw runtime errors.
- **No API Validation:** The API response format is blindly trusted. Validation is needed to confirm fields exist before rendering.
- **Weak HTTP Error Handling:** Only `response.ok` is checked. More detailed handling for 400, 401, 403, 404 errors is missing.
- **Race Conditions:** Rapid repeated requests may overlap, causing inconsistent state. Using `AbortController` allows canceling previous requests.

**Accessibility and Code Quality:**

- **Accessibility Issues:** Missing ARIA attributes, keyboard navigation, and proper labels make the app less accessible.
- **Type Checking:** DOM elements should be checked before being used to avoid runtime crashes.

---

### Practice 8

**Performance and Memory Management:**

- **Inefficient Event Listeners:** Each button has its own `click` listener. With many buttons, this causes memory bloat and potential leaks.
- **Proper Solution — Event Delegation:** A single listener on the parent container (`buttonContainer`) can manage all buttons using `event.target`. This scales efficiently, even with dynamically added buttons.

**Code Quality and Maintainability:**

- **Dynamic Buttons Not Supported:** Newly added buttons via `addDynamicButton()` don’t get listeners. With event delegation, this problem disappears.
- **Type Checking Missing:** Variables like `counter`, `counterElement`, and `buttons` should be validated to prevent undefined errors.
- **False Assumption on Memory Leaks:** The claim that current code doesn’t leak memory is wrong. In a dynamic environment (SPA with frequent DOM changes), old listeners remain in memory, causing leaks.

**Error Handling and UX:**

- **Event Target Validation:** The code assumes `event.target` is always a button. If a child element inside a button is clicked, `event.target.dataset.action` may be undefined. Safer: use `event.target.matches('.action-btn')`.

---

### Practice 9

**Memory Leaks and Performance:**

- **Timer Mismanagement:** Each click on `startButton` starts new `setInterval` and `setTimeout` timers without always clearing the old ones. This accumulates in memory, causing leaks and slowing down performance.
- **Correct Approach:** Only allow one timer to run at a time. `if (!timerId)` is used, but it’s incomplete because `setTimeout` also spawns new intervals. Better lifecycle management is required.

**Data Structure and Type Safety:**

- **Missing Type Checking:** Variables like `counter` and `timerId` should be validated. Wrong values can cause runtime issues.
- **Missing Null Guards:** If `startButton` or `stopButton` is not present in the DOM, calling `addEventListener` on `null` will throw errors.

**Event Handling:**

- **Event Delegation Misinterpretation:** For static elements like `startButton` and `stopButton`, delegation is unnecessary. Direct listeners are simpler and fine here. Event delegation is better suited for dynamic, repeated elements.

**Error and State Management:**

- **No `clearTimeout`:** `setTimeout` isn’t cleared, meaning timers may stay alive longer than intended. Both `clearInterval` and `clearTimeout` should be managed.
- **Counter Reset Missing:** After stopping, the counter value remains instead of resetting, leading to confusing UX.

---

### Practice 10

**Security and Validation:**

- **User Input Risk:** `feedbackText` contains raw user input and could include malicious code. Before processing or sending, the input should be sanitized and safely rendered using `textContent`.
- **Null Guards Missing:** DOM elements like `feedbackForm`, `messageDiv`, and `feedbackText` are accessed without checking if they exist. If they’re missing, the code breaks.

**User Experience and Error Handling:**

- **Poor UX with `alert()`:** Using `alert` for validation interrupts the user. Inline validation messages next to the textarea are modern and user-friendly.
- **Weak Error Messages:** The app only checks `response.ok` but doesn’t differentiate between errors like 400, 401, 403, 404. Users don’t know what went wrong.
- **Hidden Failures:** In `catch`, errors are logged to `console` but never shown to users, leaving them unaware of failures.
- **No Loading State:** Users don’t get feedback while the request is processing. A “Submitting feedback…” message should appear until the operation finishes.
- **Finally Block Missing:** A `finally` block ensures the loading state is cleared regardless of success or failure.

**Performance and Code Quality:**

- **No Throttling/Debouncing:** Multiple rapid clicks on submit send duplicate requests. Adding throttling/debouncing avoids redundant server calls.
- **No AbortController:** Without cancellation logic, multiple requests may overlap, causing race conditions.
- **Timeout Handling Missing:** If the server never responds, the app will wait forever. A manual timeout should be implemented.
- **Accessibility Issues:** The `<textarea>` is missing a label, making the form less accessible to screen readers. Adding `<label for="feedback">Feedback</label>` would fix this.
- **Disable Button Missing:** The submit button stays clickable during submission, leading to duplicate requests. It should be disabled until the request resolves.
