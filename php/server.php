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
    header('location: ../index.html');
  	
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
  	  header('location: ../index.html');
  	}else {
  		array_push($errors, "Usuario ou senha incorreta");
  	}
  }
}




if (isset($_POST['reg_sort'])) {
  $n1 = mysqli_real_escape_string($db, $_POST['n1']);
  $n2 = mysqli_real_escape_string($db, $_POST['n2']);
  $n3 = mysqli_real_escape_string($db, $_POST['n3']);
  $n4 = mysqli_real_escape_string($db, $_POST['n4']);
  $n5 = mysqli_real_escape_string($db, $_POST['n5']);
  $nome = mysqli_real_escape_string($db, $_POST['nome']);






    // form validation: ensure that the form is correctly filled ...
    // by adding (array_push()) corresponding error unto $errors array
    if (empty($n1)) { array_push($errors, "Primeiro numero faltando"); }
    if (empty($n2)) { array_push($errors, "Segundo numero faltando"); }
    if (empty($n3)) { array_push($errors, "Terceiro numero faltando"); }
    if (empty($n4)) { array_push($errors, "Quarto numero faltando"); }
    if (empty($n5)) { array_push($errors, "Quinto numero faltando"); }
    if (empty($nome)) { array_push($errors, "Nome faltando"); }



    if (strlen($n1)==1) { $n1 = "0$n1"; }
    if (strlen($n2)==1) { $n2 = "0$n2"; }
    if (strlen($n3)==1) { $n3 = "0$n3"; }
    if (strlen($n4)==1) { $n4 = "0$n4"; }
    if (strlen($n5)==1) { $n5 = "0$n5"; }


    // Finally, register user if there are no errors in the form
    if (count($errors) == 0) {
        
    $user_check_query = 'SELECT iduser FROM user WHERE name="'. $_SESSION['username'].'"  LIMIT 1';

    $result1 = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result1);
    $idCriador =  $user['iduser'];


  
    $data = date("d/m/Y");
    $array = array($n1, $n2, $n3, $n4, $n5);
    sort($array);
    $numeros = "$array[0], $array[1], $array[2], $array[3], $array[4]";

    $query = "INSERT INTO sorteio (data, numeros, nome, idCriador) 
          VALUES('$data', '$numeros','$nome', '$idCriador')";
    mysqli_query($db, $query);



    $user_check_query = 'SELECT idsorteio FROM sorteio WHERE nome="'. $nome.'"  ORDER BY idsorteio DESC
    LIMIT 1';

    $result1 = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result1);
    $idsorteio =  $user['idsorteio'];


    $sort_check_query = 'SELECT * FROM apostas WHERE idSorteio="0" ';
    $result2 = mysqli_query($db,$sort_check_query);
    while($row = $result2->fetch_assoc()) {
      
      

    $sql = "UPDATE apostas SET idSorteio={$idsorteio} WHERE idapostas={$row['idapostas']}";

    mysqli_query($db, $sql);


      /*$result1 = mysqli_query($db, $user_check_query);
      $user = mysqli_fetch_assoc($result1);
      $idCriador =  $user['name'];*/
    }

    header('location: novosorteio.php?idSort="'.$idsorteio.'"');
    }
}



if (isset($_POST['reg_apost'])) {
  $n1 = mysqli_real_escape_string($db, $_POST['n1']);
  $n2 = mysqli_real_escape_string($db, $_POST['n2']);
  $n3 = mysqli_real_escape_string($db, $_POST['n3']);
  $n4 = mysqli_real_escape_string($db, $_POST['n4']);
  $n5 = mysqli_real_escape_string($db, $_POST['n5']);
  $n6 = mysqli_real_escape_string($db, $_POST['n6']);
  $n7 = mysqli_real_escape_string($db, $_POST['n7']);
  $n8 = mysqli_real_escape_string($db, $_POST['n8']);
  $n9 = mysqli_real_escape_string($db, $_POST['n9']);
  $n10 = mysqli_real_escape_string($db, $_POST['n10']);
  $idUser = mysqli_real_escape_string($db, $_POST['idUser']);






  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($n1)) { array_push($errors, "Primeiro numero faltando"); }
  if (empty($n2)) { array_push($errors, "Segundo numero faltando"); }
  if (empty($n3)) { array_push($errors, "Terceiro numero faltando"); }
  if (empty($n4)) { array_push($errors, "Quarto numero faltando"); }
  if (empty($n5)) { array_push($errors, "Quinto numero faltando"); }
  if (empty($n6)) { array_push($errors, "Sexto numero faltando"); }
  if (empty($n7)) { array_push($errors, "Setimo numero faltando"); }
  if (empty($n8)) { array_push($errors, "Oitavo numero faltando"); }
  if (empty($n9)) { array_push($errors, "Nono numero faltando"); }
  if (empty($n10)) { array_push($errors, "Decimo numero faltando"); }
  if (empty($idUser)) { array_push($errors, "Usuario faltando"); }

  if (strlen($n1)==1) { $n1 = "0$n1"; }
  if (strlen($n2)==1) { $n2 = "0$n2"; }
  if (strlen($n3)==1) { $n3 = "0$n3"; }
  if (strlen($n4)==1) { $n4 = "0$n4"; }
  if (strlen($n5)==1) { $n5 = "0$n5"; }
  if (strlen($n6)==1) { $n6 = "0$n6"; }
  if (strlen($n7)==1) { $n7 = "0$n7"; }
  if (strlen($n8)==1) { $n8 = "0$n8"; }
  if (strlen($n9)==1) { $n9 = "0$n9"; }
  if (strlen($n10)==1) { $n10 = "0$n10"; }





    // Finally, register user if there are no errors in the form
    if (count($errors) == 0) {
        
    //$idUser = $_SESSION['id'];


  

    $array = array($n1, $n2, $n3, $n4, $n5, $n6, $n7, $n8, $n9, $n10);
    sort($array);
    $numeros = "$array[0], $array[1], $array[2], $array[3], $array[4], $array[5], $array[6], $array[7], $array[8], $array[9]";
  
    $user_check_query = 'SELECT iduser FROM user WHERE name="'. $_SESSION['username'].'"  LIMIT 1';

    $result1 = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result1);
    $idCambista =  $user['iduser'];


  
    $data = date("d/m/Y");

    $query = "INSERT INTO apostas ( numeros, idUser, data, idCambista) 
          VALUES( '$numeros','$idUser','$data','$idCambista')";
    mysqli_query($db, $query);



    

    header('location: index.php');
    }
}


if (isset($_POST['exc_camb'])) {
  $idDelet = mysqli_real_escape_string($db, $_POST['idDelet']);
  $tipo = mysqli_real_escape_string($db, $_POST['tipo']);
  $sql = "DELETE FROM user WHERE iduser=$idDelet";
  //echo($idDelet);

  mysqli_query($db, $sql);

  if($tipo=="1"){header('location: cambistas.php');}
  else{header('location: jogadores.php');}
}

?>