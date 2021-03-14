function findElement(selector, errorContext) {
  if (!selector) return null;

  const errorPrefix = errorContext ? errorContext + ': ' : '';

  if (!selector) throw new Error(errorPrefix + 'missing selector');
  if (selector.length === 0) throw new Error(errorPrefix + 'empty selector');

  const result = document.querySelector(selector);

  if (!result) throw new Error(errorPrefix + 'unable to find element: ' + selector);

  return result;
}

function setFlashFromHeaders(headers) {
  if (!headers.get('X-Partial-Replacer-Remote')) return;

  const flashMessages = document.getElementById('flash_messages');

  if (!flashMessages) throw new Error('unable to find flash messages');

  flashMessages.innerHTML = null;

  function addToFlash(text, className) {
    if (!text) return;

    const div = document.createElement('div');
    div.classList.add(className);
    div.appendChild(document.createTextNode(text));
    flashMessages.appendChild(div);
  }

  addToFlash(headers.get('X-Partial-Replacer-Flash-Success'), 'success');
  addToFlash(headers.get('X-Partial-Replacer-Flash-Notice'), 'notice');
  addToFlash(headers.get('X-Partial-Replacer-Flash-Warning'), 'warning');
  addToFlash(headers.get('X-Partial-Replacer-Flash-Error'), 'error');
}

function updateStuff(baseElement) {
  baseElement.querySelectorAll('a.partial-replacer-remote').forEach(function(element) {
    const target = findElement(element.dataset['partialReplacerTarget'], 'a[data-partial-replacer-target]');

    element.addEventListener('click', async function(event) {
      event.preventDefault();

      const response = await fetch(element.href, { headers: { 'X-Partial-Replacer-Remote': 'true' }});

      if (!response.ok) {
        alert('Error: ' + response.statusText);
        return;
      } else if (target) {
        target.innerHTML = await response.text();
        updateStuff(target);
      }

      setFlashFromHeaders(response.headers);
    });
  });

  baseElement.querySelectorAll('a.partial-replacer-clear').forEach(function(element) {
    const clearTarget = findElement(element.dataset['partialReplacerClear'], 'a[data-partial-replacer-clear]');
    if (clearTarget) {
      element.addEventListener('click', async function(event) {
        event.preventDefault();
        clearTarget.innerHTML = null;
      });
    }
  });

  baseElement.querySelectorAll('form.partial-replacer-remote').forEach(function(element) {
    const invalidTarget = findElement(element.dataset['partialReplacerInvalid'], 'form[data-partial-replacer-invalid]');
    const successTarget = findElement(element.dataset['partialReplacerSuccess'], 'form[data-partial-replacer-success]');

    element.addEventListener('submit', async function(event) {
      event.preventDefault();

      const formData = new FormData(element);
      const response = await fetch(element.action, { method: element.method, body: formData, headers: { 'X-Partial-Replacer-Remote': 'true' }});

      if (invalidTarget && response.status === 422) {
        invalidTarget.innerHTML = await(response.text());
        updateStuff(invalidTarget);
      } else if (!response.ok) {
        alert('Error: ' + response.statusText);
      } else if (successTarget) {
        successTarget.innerHTML = await response.text();
        updateStuff(successTarget);
      }

      setFlashFromHeaders(response.headers);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateStuff(document);
});
