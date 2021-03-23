<?php
session_start();

// initializing variables
$username = "";
$celular    = "";
$errors = array(); 

// connect to the database
$db = mysqli_connect('localhost', 'root', '', 'takinamao');

// REGISTER USER
if (isset($_POST['reg_user'])) {
  // receive all input values from the form
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $celular = mysqli_real_escape_string($db, $_POST['celular']);
  $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);

  $tipo = mysqli_real_escape_string($db, '2');

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($celular)) { array_push($errors, "Celular is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }


  // first check the database to make sure 
  // a user does not already exist with the same username and/or email
  $user_check_query = "SELECT * FROM user WHERE name='$username'  LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['name'] === $username) {
      array_push($errors, "Username already exists");
    }

    
  }
  $idsup= $_SESSION['id'];
  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
  	$password = md5($password_1);//encrypt the password before saving in the database

  	$query = "INSERT INTO user (name, celular, senha, tipo, idSuperior) 
  			  VALUES('$username', '$celular', '$password','$tipo','$idsup')";
  	mysqli_query($db, $query);


    $user_check_query = "SELECT iduser FROM user WHERE name='$username'  LIMIT 1";
    $result1 = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result1);
  $idCriador =  $user['iduser'];
  $tipo =  $user['tipo'];


  	header('location: jogadores.php');
  }
}

if (isset($_POST['reg_camb'])) {
  // receive all input values from the form
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $celular = mysqli_real_escape_string($db, $_POST['celular']);
  $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);

  $tipo = mysqli_real_escape_string($db, '1');

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($celular)) { array_push($errors, "Celular is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }


  // first check the database to make sure 
  // a user does not already exist with the same username and/or email
  $user_check_query = "SELECT * FROM user WHERE name='$username'  LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['name'] === $username) {
      array_push($errors, "Username already exists");
    }

    
  }

  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
  	$password = md5($password_1);//encrypt the password before saving in the database

  	$query = "INSERT INTO user (name, celular, idSuperior, senha, tipo) 
  			  VALUES('$username', '$celular','', '$password','$tipo')";
  	mysqli_query($db, $query);


    $user_check_query = "SELECT iduser FROM user WHERE name='$username'  LIMIT 1";
    $result1 = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result1);
  $idCriador =  $user['iduser'];
  $tipo =  $user['tipo'];


  	header('location: cambistas.php');
  }
}

if (isset($_POST['reg_adm'])) {
  // receive all input values from the form
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $celular = mysqli_real_escape_string($db, $_POST['celular']);
  $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);

  $tipo = mysqli_real_escape_string($db, '0');

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($celular)) { array_push($errors, "Celular is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }


  // first check the database to make sure 
  // a user does not already exist with the same username and/or email
  $user_check_query = "SELECT * FROM user WHERE name='$username'  LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['name'] === $username) {
      array_push($errors, "Username already exists");
    }

    
  }

  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
  	$password = md5($password_1);//encrypt the password before saving in the database

  	$query = "INSERT INTO user (name, celular, idSuperior, senha, tipo) 
  			  VALUES('$username', '$celular','', '$password','$tipo')";
  	mysqli_query($db, $query);


    $user_check_query = "SELECT iduser FROM user WHERE name='$username'  LIMIT 1";
    $result1 = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result1);
  $idCriador =  $user['iduser'];
  $tipo =  $user['tipo'];


  	header('location: index.php');
  }
}


if (isset($_POST['reg_tot'])) {
  // receive all input values from the form
  $nome = mysqli_real_escape_string($db, $_POST['nome']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);



  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($nome)) { array_push($errors, "nome is required"); }
  if (empty($email)) { array_push($errors, "email is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }


  // first check the database to make sure 
  // a user does not already exist with the same username and/or email
  $user_check_query = "SELECT * FROM user WHERE nome='$nome'  LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['nome'] === $nome) {
      array_push($errors, "Username already exists");
    }

    
  }

  if (count($errors) == 0) {
  	$password = md5($password_1);//encrypt the password before saving in the database

  	$query = "INSERT INTO user (nome, email, senha) 
  			  VALUES('$nome', '$email', '$password')";
  	mysqli_query($db, $query);


    $user_check_query = "SELECT iduser FROM user WHERE name='$nome'  LIMIT 1";
    $result1 = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result1);
  $idCriador =  $user['iduser'];

  $_SESSION['id'] = $idCriador;
  $_SESSION['username'] = $nome;
    header('location: ../index.php');
  	
  }
}



if (isset($_POST['login_user'])) {
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $password = mysqli_real_escape_string($db, $_POST['password']);

  if (empty($username)) {
  	array_push($errors, "Username is required");
  }
  if (empty($password)) {
  	array_push($errors, "Password is required");
  }

  if (count($errors) == 0) {
  	$password = md5($password);
  	$query = "SELECT * FROM user WHERE email='$username' AND senha='$password'";
  	$results = mysqli_query($db, $query);
  	if (mysqli_num_rows($results) == 1) {
      $user = mysqli_fetch_assoc($results);
  $idCriador =  $user['iduser'];


	$_SESSION['id'] = $idCriador;
  	  $_SESSION['username'] = $username;
  	  $_SESSION['success'] = "You are now logged in";
  	  header('location: ../index.php');
  	}else {
  		array_push($errors, "Usuario ou senha incorreta");
  	}
  }
}




if (isset($_POST['reg_sort'])) {
  $nome = mysqli_real_escape_string($db, $_POST['nome']);
  $descricao = mysqli_real_escape_string($db, $_POST['descricao']);
  $cidade = mysqli_real_escape_string($db, $_POST['cidade']);
  $valor = mysqli_real_escape_string($db, $_POST['valor']);



  $idsup= $_SESSION['id'];


    // form validation: ensure that the form is correctly filled ...
    // by adding (array_push()) corresponding error unto $errors array
    if (empty($nome)) { array_push($errors, "Nome faltando"); }
    if (empty($descricao)) { array_push($errors, "descricao faltando"); }
    if (empty($valor)) { array_push($errors, "valor faltando"); }
    if (empty($cidade)) { array_push($errors, "cidade faltando"); }



    // Finally, register user if there are no errors in the form
    if (count($errors) == 0) {
        
   

  


    $query = "INSERT INTO vagas (nome, descricao, idCriador, cidade, valor) 
          VALUES('$nome', '$descricao','$idsup','$cidade', '$valor')";
    mysqli_query($db, $query);




    header('location: ../index.php');
    }
}





if (isset($_POST['exc_camb'])) {
  $idDelet = mysqli_real_escape_string($db, $_POST['idDelet']);
  $tipo = mysqli_real_escape_string($db, $_POST['tipo']);
  $sql = "DELETE FROM user WHERE iduser=$idDelet";
  //echo($idDelet);

  mysqli_query($db, $sql);

  header('location: ../index.php');
}

?>