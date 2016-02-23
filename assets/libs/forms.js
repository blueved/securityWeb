function formhash() {

    // Create a new element input, this will be our hashed password field. 
    //var p = document.createElement("input");
    // Add the new element to our form. 
    //form.appendChild(p);
    //p.name = "p";
    //p.type = "hidden";
    var $pp = $('#content input[name=password]');
    //p.value = hex_sha512($pp.val());
    var pval = hex_sha512($pp.val());
    var emailVal = $('input[type=email]').val();
    // Make sure the plaintext password doesn't get sent. 
    $pp.val('');
    var param = { p: pval, email: emailVal };
    // Finally submit the form. 
    console.log('submitting the form');
    $.ajax({
        type: "POST",
        url: 'includes/process_login.php',
        data: param
    })
    .done(function (data) { alert(data);})
    .fail(function (status) {
        $('#requestResponse').html(data).show();
    });
}
 
function regformhash(form, uid, email, password, conf) {
     // Check each field has a value
	 /*
    if (uid.value == ''         || 
          email.value == ''     || 
          password.value == ''  || 
          conf.value == '') {
 
        alert('You must provide all the requested details. Please try again');
        return false;
    }
 
    // Check the username
 
    re = /^\w+$/; 
    if(!re.test(form.username.value)) { 
        alert("Username must contain only letters, numbers and underscores. Please try again"); 
        form.username.focus();
        return false; 
    }
 
    // Check that the password is sufficiently long (min 6 chars)
    // The check is duplicated below, but this is included to give more
    // specific guidance to the user
    if (password.value.length < 6) {
        alert('Passwords must be at least 6 characters long.  Please try again');
        form.password.focus();
        return false;
    }
 
    // At least one number, one lowercase and one uppercase letter 
    // At least six characters 
 
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
    if (!re.test(password.value)) {
        alert('Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again');
        return false;
    }
 
    // Check password and confirmation are the same
    if (password.value != conf.value) {
        alert('Your password and confirmation do not match. Please try again');
        form.password.focus();
        return false;
    }
 */
    // Create a new element input, this will be our hashed password field. 
    var p = document.createElement("input");
 
    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
 
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
    conf.value = "";
 
    // Finally submit the form. 
    //form.submit();
    //return true;
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
	var i = window.location.href.indexOf('?');
	if (i === -1){
		return null;
	}
    var vars = [], hash;
    var hashes = window.location.href.slice(i + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//-------------------------------------------