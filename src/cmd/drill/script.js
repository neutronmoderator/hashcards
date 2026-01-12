// Copyright 2025 Fernando Borretti
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

document.addEventListener("DOMContentLoaded", function () {
  // Render inline math
  document.querySelectorAll(".math-inline").forEach(function (element) {
    katex.render(element.textContent, element, {
      displayMode: false,
      throwOnError: false,
      macros: MACROS,
    });
  });
  // Render display math
  document.querySelectorAll(".math-display").forEach(function (element) {
    katex.render(element.textContent, element, {
      displayMode: true,
      throwOnError: false,
      macros: MACROS,
    });
  });
  // Initialize syntax highlighting
  if (typeof hljs !== "undefined") {
    hljs.highlightAll();
  }
  const cardContent = document.querySelector(".card-content");
  if (cardContent) {
    cardContent.style.opacity = "1";
  }
});

// Toggle the edit form visibility
function toggleEdit() {
  const editForm = document.getElementById("edit-form");
  if (editForm) {
    if (editForm.hidden) {
      editForm.hidden = false;
      const textarea = document.getElementById("edit-textarea");
      if (textarea) {
        textarea.focus();
      }
    } else {
      editForm.hidden = true;
    }
  }
}

document.addEventListener("keydown", function (event) {
  // Skip during text input.
  if (event.target.tagName === "INPUT" && event.target.type === "text") {
    return;
  }

  // Skip during textarea input (except for Escape)
  if (event.target.tagName === "TEXTAREA" && event.key !== "Escape") {
    return;
  }

  // Handle Escape key to close edit form
  if (event.key === "Escape") {
    const editForm = document.getElementById("edit-form");
    if (editForm && !editForm.hidden) {
      event.preventDefault();
      toggleEdit();
      return;
    }
  }

  // Handle 'e' key to open edit form
  if (event.key === "e") {
    // Ignore modifiers.
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }
    const editToggle = document.getElementById("edit-toggle");
    if (editToggle) {
      event.preventDefault();
      toggleEdit();
      return;
    }
  }

  const keybindings = {
    " ": "reveal", // Space
    u: "undo",
    1: "forgot",
    2: "hard",
    3: "good",
    4: "easy",
  };

  if (keybindings[event.key]) {
    // Ignore modifiers.
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    const id = keybindings[event.key];
    const node = document.getElementById(id);
    if (node) {
      node.click();
    }
  }
});
