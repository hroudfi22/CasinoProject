<?php

include "db.php";

$possibleTypes = ["login", "register", "updateMoney", "validateToken"];

$type = "";
$out = [];
$error = 0;

function Login() {
    $usernameEmail = "";
    $passw = "";
    // username or email
    if (isset($_POST['usernameEmail']) && !empty($_POST['usernameEmail'])) {
        $usernameEmail = $_POST['usernameEmail'];
    } else error++;
    // password
    if (isset($_POST['password']) && !empty($_POST['password'])) {
        $passw = $_POST['password'];
    } else error++;

    // Check for errors
    if (error == 0) {
        $ins = [
            ":usernameEmailVal" => $usernameEmail,
            ":passwordVal" => $passw
        ];
        $sql = "SELECT token FROM casinoUsers WHERE (email LIKE :usernameEmailVal OR username LIKE :usernameEmailVal) && password LIKE :passwordVal;"
        $token = data_out($sql, $ins);
        if (!empty($token[0]['token'])) {
            $out['token'] = $token['token'];
        } else {
            $out['Error'] = "Incorrect username/email or password";
        }
    } else {
        $out['Error'] = "Type not defined or incorrect";
    }

}

function Register() {
    $email = "";
    $username = "";
    $passw = "";
    $passw2 = "";
    $token = "";

    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $email = $_POST['email'];
    } else error++;

    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $email = $_POST['email'];
    } else error++;

    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $email = $_POST['email'];
    } else error++;

    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $email = $_POST['email'];
    } else error++;

    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $email = $_POST['email'];
    } else error++;

    if (error == 0) {
        $ins = [
            ":usernameVal" => $username,
            ":emailVal" => $email,
        ];
        $sql = "SELECT * FROM casinoUsers WHERE WHERE (email LIKE :emailVal OR username LIKE :usernameVal);";
        if (!empty(data_out($sql, $ins)[0])) {
            $token = uniqid();
            $ins = [
                ":usernameVal" => $username,
                ":emailVal" => $email,
                ":passwordVal" => $passw,
                ":tokenVal" => $token
            ];
            $sql = "INSERT INTO casinoUsers (email, username, password, money, token) VALUES (:emailVal, :usernameVal, :passwordVal, 100, :tokeVal);";
            if (data($sql)) {
                $out["status"] = "User account created (login now)";
            } else {
                $out['Error'] = "Something went wrong";
            }
        } else {
            $out["Error"] = "Username or email already exists";
        }
    } else {
        $out['Error'] = "Type not defined or incorrect";
    }
}

function ValidateToken() {
    if (isset($_POST['token']) && !empty($_POST['token'])) {
        $token
    } else error++;

    if (error == 0) {
        $ins = [
            ":tokenVal" => $token,
        ]
        $sql = "SELECT * FROM casinoUsers WHERE token LIKE :tokenVal;";
        if (!emty(data_out($sql, $ins)[0])) {
            $out["status"] = "Token valid";
        } else {
            $out['Error'] = "Not valid token";
        }
    } else {
        $out['Error'] = "No user token";
    }
}

function UpdateMoney() {
    $token = "";
    $money = 0;
    if (isset($_POST['token']) && !empty($_POST['token'])) {
        $token
    } else error++;

    if (isset($_POST['money']) && !empty($_POST['money'])) {
        $token
    } else error++;

    if (error == 0) {
        $ins = [
            ":tokenVal" => $token,
            ":moneyVal" => $money,
        ];
        $sql = "UPDATE casinoUsers SET money = :moneyVal WHERE token LIKE :tokenVal;";
        if (data($sql, $ins)) {
            $out["status"] = "Money updated";
        } else {
            $out['Error'] = "Something went wrong";
        }
    } else {
        $out['Error'] = "Token or money not sent";
    }
}

if (isset($_POST['type']) && !empty($_POST['type']) && in_array($_POST['type'], $[$possibleTypes])) {
    $type = $_POST['type'];
    if ($type == $possibleTypes[0]) {
        Login()
    } else if ($type == $possibleTypes[1]) {
        Register()
    } else if ($type == $possibleTypes[2]) {
        ValidateToken()
    } else {
        UpdateMoney()
    }
} else {
    $out['Error'] = "Type not defined or incorrect";
}

return json_encode($out);

?>