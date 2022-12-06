function emailTemplate(name, username, password) {
  return `<div><p><b> Dear ${name} </b>,</p><p>Greetings from <b> <i> Dev Tech Education! </i> </b> </p><p>Hope you are doing well,</p><p>Please find below the important details regarding your education journey</p><p>Important Details:-</p>Course Platform Username : <b> ${username} </b><br>Course Platform Password : <b> ${password} </b> <br>Course Platform Link : <a href="https://devtecheducation.netlify.app" target="_blank" >https://devtecheducation.netlify.app</a><br></p><p>You can write to us at <a href="mailto:devtecheducation@gmail.com" target="_blank">devtecheducation@gmail.com</a> for any additional information or queries</p><p>Happy Learning!</p><p>Regards,<br><b><i> Team Dev Tech Education </i></b></p></div>`;
}
export default emailTemplate;

if (res.success) {
  let { data } = res;
  fetch(
    `https://script.google.com/macros/s/AKfycbzXTeE18f404PCyVtuK4Sw5-8dfDTIyFfbDdKEKjRP22KnqdG1DnDX1bWIGwL27HhZcaA/exec?Name=${data.name}&Email=${data.email}&Number=${data.number}&Template=<div><p><b> Dear ${data.name} </b>,</p><p>Greetings from <b> <i> Dev Tech Education! </i> </b> </p><p>Hope you are doing well,</p><p>Please find below the important details regarding your education journey</p><p>Important Details:-</p>Course Platform Username : <b> ${data.username} </b><br>Course Platform Password : <b> ${data.password} </b> <br>Course Platform Link : <a href="https://devtecheducation.netlify.app" target="_blank" >https://devtecheducation.netlify.app</a><br></p><p>You can write to us at <a href="mailto:devtecheducation@gmail.com" target="_blank">devtecheducation@gmail.com</a> for any additional information or queries</p><p>Happy Learning!</p><p>Regards,<br><b><i> Team Dev Tech Education </i></b></p></div>&Subject=Dev Tech Education Online Course Platform Login Credentials`
  );
}
