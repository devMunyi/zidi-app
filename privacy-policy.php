<?php
session_start();
include_once("php_functions/functions.php");
include_once("configs/conn.inc");
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <?php
    include_once 'styles.php';
    ?>
</head>

<body class="font-opensans">
    <!-- Page Loader -->
    <?php
    include_once 'header.php';
    ?>
    <div class="page-loader-wrapper">
        <div class="loader">
        </div>
    </div>

    <!--Header section -->
    <?php
    include_once 'index-header.php';
    ?>

    <!-- start main body part-->
    <div class="container pt-4" id="privacy-policy-page">
        <div class="row">
            <div class="col-sm-12">
                <h1>Privacy Policy</h1>
                <br>
                <h4>PURPOSE OF POLICY</h4>
                <p><a href="https://zidiapp.com">Zidiapp.com</a> (us, we, Non-Profit Organization) is committed to respecting the privacy rights of visitors and other users of this site. We created this Privacy Policy (this Policy) to give you confidence as you visit and use the Site, and to demonstrate our commitment to fair information practices. This Policy is only applicable to the Site, and not to any other websites that you may be able to access from the Site, each of which may have data collection and use practices and policies that differ materially from this Policy.</p>
                <br>
                <h4>NOTICE CONCERNING CHILDREN</h4>
                <p>PLEASE NOTE: We are a general audience site, and do not direct any of our content specifically at children under 13 years of age pursuant to the Children’s Online Privacy Protection Act of 1998.</p>
                <br>
                <h4>INFORMATION COLLECTION PRACTICES</h4>

                <br>
                <h4>WHAT BASIC INFORMATION DOES THE WE COLLECT?</h4>
                <p>In operating the Site, we collect personal information from you in a couple different situations. The first is if you should contact us via the contact page. In doing so, you will provide us with your name and email address. The second is if you leave a comment to a blog post during which you may be asked for a name and other information. You are not required to provide us with information via these two methods to use and enjoy the Site.</p>

                <br>
                <h4>WHAT ADDITIONAL INFORMATION DO WE COLLECT?</h4>
                <p>(a) AUTOMATIC COLLECTION. Our servers automatically recognize visitors’ domain names and IP addresses (the number assigned to computers on the Internet). No personal information about you is revealed in this process. The Site may also gather anonymous traffic data that does not personally identify you, but that may be helpful for marketing purposes or for improving the services we offer.</p>
                <p>(b) COOKIES. From time to time, we may use the standard cookies feature of major browser applications that allows us to store a small piece of data on your computer about your visit to our Site. Cookies help us learn which areas of our Site are useful and which areas need improvement through programs including, but not limited to, Google Analytics. We may also use cookies from third-party social sites and programs including, but not limited to, Facebook, Google Plus and Twitter. You can choose to disable cookies through your browser or independent programs available online. However, if you choose to disable this function, your experience at our Site may be diminished as some features may not work as they were intended.</p>
                <p>(c) SPONSORS AND ADVERTISERS. We may decide to accept sponsorship and advertisements on the Site. Should this occur, you should assume said sponsors and advertisers will be given access to the impressions and click data on their marketing pieces. Your personally identifiable information will never be revealed to them by us.</p>


                <br>
                <h4>USE AND SHARING OF INFORMATION</h4>
                <h4>WHAT DOES WE DO WITH COLLECTED INFORMATION?</h4>
                <p>(a) PERSONAL INFORMATION. We do not disclose the personally identifiable information to any third parties other than those that we use to facilitate the functioning of the site such as a hosting we and email program for mailings.</p>
                <p>(b) ANONYMOUS INFORMATION. We use anonymous information to analyze our Site traffic. In addition, we may use anonymous IP addresses to help diagnose problems with our server, to administer our site, or to display the content according to your preferences. Traffic and transaction information may also be shared with business partners and advertisers on an aggregate and anonymous basis.</p>
                <p>(c) USE OF COOKIES. Promotions or advertisements displayed on our site may contain cookies. We do not have access to or control over information collected by outside advertisers on our site.</p>
                <p>(d) DISCLOSURE OF PERSONAL INFORMATION. We may disclose any information we have for you if required to do so by law or in the good-faith belief that such action is necessary to (1) conform to the edicts of the law or comply with legal process served on us, (2) protect and defend our rights or property or the users of the Site, or (3) act under exigent circumstances to protect the safety of the public or users of the Site.</p>
                <p>(e) SALE OF INFORMATION. In order to accommodate changes in our business, we may sell or buy portions of the Site, including the information collected through this Site. If substantially all of its assets are acquired by a third party, user information will be one of the assets transferred to the acquirer.</p>

                <br>
                <h4>SECURITY</h4>
                <p>The Site has security measures in place to prevent the loss, misuse, and alteration of the information that we obtain from you, but we make no assurances about our ability to prevent any such loss to you or to any third party arising out of any such loss, misuse, or alteration.</p>
                <br>
                <h4>WEBSITE AREAS BEYOND OUR CONTROL</h4>
                <h4>THIRD PARTY WEBSITES</h4>
                <p>From time-to-time, the Site may contain links to other websites. If you choose to visit those websites, it is important to understand our privacy practices and terms of use do not extend to those sites. It is your responsibility to review the privacy policies at those websites to confirm that you understand and agree with their practices.</p>

                <br>
                <h4>CONTACT INFORMATION AND POLICY UPDATES</h4>
                <h4>CONTACTING US</h4>
                <p>If you have any questions about this Policy or our practices related to this Site, please feel contact us on <b>zidiappteam@gmail.com</b></p>
                <br>
                <h4>UPDATES AND CHANGES</h4>
                <p>We reserve the right, at any time, to add to, change, update, or modify this Policy to reflect changes in our Privacy Policy. We shall post any such changes on the Site in a conspicuous area. You may then choose whether you wish to accept said policy changes or discontinue using the Site. Any such change, update, or modification will be effective 30 days after posting on the Site. It is your responsibility to review this Policy from time to time to ensure that you continue to agree with all of its terms.</p>
                <p>If you have signed up for email communications from us, we will notify you of the privacy policy changes by email as well.</p>
            </div>
        </div>
    </div>

    <?php
    include_once 'footer.php';
    ?>

    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $(document).ready(function() {
            updateHeader("unsecured"); //check for logged in user so as to update the header accordingly
            //authCheck('register-page', 'register') //check for avilable session, if so redirect to home page
            footer_date(); //load footer
        });
    </script>
</body>

</html>