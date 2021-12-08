$("#signup").submit((event) => {
    event.preventDefault()
  let form = document.getElementById("signup");
  $.ajax({
    url:form.action,
    type: form.method,
    data: $(form).serialize(),
    error: (err) => {
      alert(err.responseJSON.message)
    },
    success: (response) => {
     console.log(response)
     localStorage.setItem('cookie',response.token)
     console.log(localStorage.cookie)
    },
  });
});
