setTimeout(() => {
  alert('i am annoying')
}, 3000)

const doc = new DOMParser().parseFromString(html, 'text/html')
document.body.append(doc.body.firstElementChild)
