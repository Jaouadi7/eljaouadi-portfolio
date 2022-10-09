
<?php

if ($_SERVER['REQUEST_METHOD'] === "POST") {


    // FILTERING INPUTS
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_NUMBER_INT);
    $subjectForm = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $messege = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    $lang = filter_var($_POST['lang'], FILTER_SANITIZE_STRING);


    if ( empty( $_POST['empty']  )  ) {

        if (empty($name) || empty($email) || empty($subjectForm) || empty($messege)) {
            if ( $lang === 'ar' ) {
                $error =  'المرجو إدخال كل الحقول الإجبارية';
            } else {
                $error = 'Please fill up all the required fields';
            }
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            if ( $lang === 'ar' ) {
                $error =  'المرجو ادخال بريد إلكتروني صحيح';
            } else {
                $error =  'Please enter a valid email';
            }
        } else {
            // YOU EMAIL HERE
            $to = 'johndoe@email.com'; 
            $subject = 'You have a new email from ' . $name;
            $body =
                "Name : " . $name .  "\r\n" .
                'Email : ' . $email .   "\r\n" .
                'Phone : ' . $phone .   "\r\n" .
                'Message : ' . $messege;

            $headers = 'MIME-Version : 1.0' . "\r\n";
            $headers .= 'Content-Type:text/html;charset=UTF-8' . "\r\n";
            $headers .= 'From : ' . $name . ' [ ' . $email . ' ]' . "\r\n";

            if (mail($to, $subject, $body, $headers)) {
                if ( $lang === 'ar' ) {
                    $success = 'شكرا على تواصلك معي, تم إرسال رسالتك بنجاح سأتواصل معك في أقرب فرصة ممكنة';
                } else {
                    $success = 'Thank you for contacting me, your message was sent successfully I will contact you as soon as possible.';
                }
            } else {
                if ( $lang === 'ar' ) {
                    $error = "يبدو أن هناك خطأ ما حصل المرجو إعادة إرسال رسالتك أو المحاولة لاحقا";
                } else {
                    $error = "Oops! An error occured and your message could not be sent. please try again ";
                }
            }
        }

    }
}


if (!empty($error)) {
?>
    <div class="notification is-danger">
        <?php echo $error; ?>
    </div>
<?php
}

if (!empty($success)) {
?>
    <div class="notification is-success">
        <button class="delete"></button>
        <?php echo $success; ?>
    </div>
<?php

}
